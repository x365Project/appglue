import {AutoBind} from "../Common/AutoBind";
import {IFlowElement} from "./Structure/IFlowElement";
import {FlowStepSequence} from "./Structure/FlowStepSequence";
import {FlowStepRegistration, RegistrationData} from "./Utilities/RegisterFlowStep";
import {BaseFlowStep} from "./Steps/BaseFlowStep";
import {StateManager} from "../CommonUI/StateManagement/StateManager";
import {DataUtilities} from "../Common/DataUtilities";
import {XFlowConfiguration} from "./Structure/XFlowConfiguration";
import {IContextForControl} from "../Common/IContextForControl";
import {IDraggingElementType} from "./CommonUI/IDraggingElementType";
import {IDialog, XFlowEditor} from "./XFlowEditor";
import {FlowConstants} from "./CommonUI/FlowConstants";
import {CandidateSequence, ICandidateSequence, NonPathCandidateSequence} from "./Structure/CandidateSequence";
import {IFlowStepSequence} from "./Structure/IFlowStepSequence";
import {FlowStepOutputInstructions, FlowStepOutputInstructionType} from "./Structure/FlowStepOutputInstructions";
import {IFlowStep} from "./Structure/IFlowStep";
import {Scheduler} from "../Common/Scheduler";
import {HTMLUtilities} from "../CommonUI/HTMLUtilities";
import {ReactRenderHook} from "../CommonUI/ReactRenderHook";

export class FlowEditContext {
    flowEditor: XFlowEditor;

    flowTitle?: string;
    viewAPIUrl?: string;
    isDraggingControl: boolean = false; 
    

    private candidateSequences: ICandidateSequence[] = [];

    public onFlowSave?: () => void;
    public onFlowCancel?: () => void;


    constructor(flowEditor: XFlowEditor) {
        this.flowEditor = flowEditor;

        this.getOrAddNonPathCandidateSequence();
    }

    // ------------------------
    // handling flow structure changes
    // ------------------------
    onSequenceBeingDragged(sequence: IFlowStepSequence, x: number, y: number) : void {
        this.delayPosition();

    }

    onSequenceDragEnding(sequence: IFlowStepSequence, x: number, y: number) : void {
        this.delayPosition(true);

    }

    onStepAdded(sequence: IFlowStepSequence, step: IFlowStep) : void {
        this.delayPosition();
        this.refreshSequence(sequence);
    }

    onStepRemoved(sequence: IFlowStepSequence, step: IFlowStep) : void {
        this.delayPosition();
        this.refreshSequence(sequence);

    }

    onStepMoved(fromSequence: IFlowStepSequence, toSequence: IFlowStepSequence, step: IFlowStep, index?: number) : void {
        this.delayPosition();

    }

    onStepMovedInSequence(fromSequence: IFlowStepSequence, step: IFlowStep, newIndex: number) : void {
        this.delayPosition();

    }

    onStepEdit(sequence: IFlowStepSequence, step: IFlowStep) : void {
        this.delayPosition();

    }

    onStepPathEdit(sequence: IFlowStepSequence, step: IFlowStep, path: string) : void {
        this.delayPosition();

    }

    onSequencesCombined(sequence: IFlowStepSequence, combineTo: IFlowStepSequence) : void {
        this.delayPosition();

        this.refreshSequence(sequence);
    }

    onSequenceAdded(sequence: IFlowStepSequence) : void {
        this.delayPosition(true);

        this.refreshSequence(sequence);
    }

    onSequenceRemoved(sequence: IFlowStepSequence) : void {
        this.delayPosition(true);

        this.refreshSequence(sequence);
    }

    onSequenceExpanded(sequence: FlowStepSequence) : void {
        this.delayPosition();

    }

    onSequenceCollapsed(sequence: FlowStepSequence) : void {
        this.delayPosition();
    }

    private delayPosition( alwaysRefresh: boolean = false) {
        ReactRenderHook.registerCallback('position', () => {
            if (this.positionCandidateSequences(true)) {
                this.refreshSequences();
            }

            if (alwaysRefresh)
                this.refreshSequences();
        })
    }

    // ------------------------
    // end - handling flow structure changes
    // ------------------------

    // ------------------------
    // force refresh
    // ------------------------

    refreshSequences() : void {
        StateManager.propertyChanged(this, "candidateSequences");
        StateManager.propertyChanged(this.flow, "sequences");
        // it calls refresh lines
        this.refreshLines();
    }

    refreshLines() : void {
        StateManager.propertyChanged(this, "connections");
    }

    refreshSequence(sequence: IFlowStepSequence) : void {
//        Scheduler.getScheduler('ui', 100).addToSchedule('refreshSeq', () => {
            StateManager.propertyChanged(sequence, 'steps');
//        });
    }
    // ------------------------
    // end - force refresh
    // ------------------------

    getCandidateSequences() : IFlowStepSequence[] {
        return this.candidateSequences;
    }

    findCandidateSequence(id: string): IFlowStepSequence | null {
        for (let c of this.candidateSequences) {
            if (c._id === id) return c;
        }
        return null;
    }

    getCandidateOrRealSequence(id: string) : IFlowStepSequence | undefined {
        for (let cs of this.candidateSequences) {
            if (cs._id === id)
                return cs;
        }

        for (let rs of this.flow.sequences) {
            if (rs._id === id)
                return rs;
        }

        return undefined;
    }

    getSequenceByXY(x: number, y: number): FlowStepSequence | null {
        for (let s of this.flow.sequences) {
            if (x > s.x && x < s.x + s.width && y > s.y && y < s.y + s.height)
                return s;
        }
        return null;
    }

    purgeCandidateSequences() : void {
        this.syncCandidates();
        this.positionCandidateSequences(false);
    }

    private syncCandidates() : boolean{

        let sequenceIds = this.flow.sequences.map((s: FlowStepSequence) => s._id);

        let wasChanged = false;

        // remove the candidate that has same id with sequence.
        this.candidateSequences = this.candidateSequences.filter((c: IFlowStepSequence) => {
            if (sequenceIds.indexOf(c._id) < 0) {
                let instruction = Reflect.get(c, 'instruction') as FlowStepOutputInstructions;
                if (instruction) {
                    if (instruction.connectedSequenceId !== c._id)
                    {
                        wasChanged = true;
                        return false;
                    }
                    if (!instruction.stepId)
                    {
                        wasChanged = true;
                        // path declares no step
                        return false;
                    }

                    let step = this.flow.find(instruction.stepId) as BaseFlowStep;

                    // step still exists
                    if (!step)
                    {
                        wasChanged = true;
                        return false;
                    }

                    // candidate declares no path name
                    if (!instruction.pathName || instruction.pathName === "")
                    {
                        wasChanged = true;
                        return false;
                    }

                    // is outcome the same
                    if (!step.isCurrentOutcome(instruction.pathName)) {
                        wasChanged = true;
                        return false;
                    }

                    // its not set to branch
                    if (instruction.strategy !== FlowStepOutputInstructionType.BRANCH)
                    {
                        wasChanged = true;
                        return false;
                    }

                    return true;
                }
                else
                {
                    // this is a valid one
                    return true;
                }
            }
            else
            {
                wasChanged = true;
                return false;
            }
        });

        // add missing sequences
        for (let seq of this.flow.sequences) {
            for (let step of seq.steps) {
                let paths = step.getOutcomes();
                if (paths) {
                    if (paths.length !== 0)
                        paths.shift();
                    if (paths.length > 0) {
                        for (let p of paths) {
                            let inst = step.findOutputInstruction(p.name);

                            if (inst.strategy === FlowStepOutputInstructionType.BRANCH && inst.connectedSequenceId) {
                                if (!this.getCandidateOrRealSequence(inst.connectedSequenceId)) {
                                    // its missing, we need to add
                                    let cs = new CandidateSequence(inst);
                                    cs._id = inst.connectedSequenceId;
                                    this.candidateSequences.push(cs);
                                    // mark as changed
                                    wasChanged = true;
                                }
                            }
                        }
                    }
                }
            }
        }

        this.getOrAddNonPathCandidateSequence();

        return wasChanged;
    }


    positionCandidateSequences(requirePurge:boolean = true) : boolean {

        let wasRepositioned = false;

        if (requirePurge) {
            wasRepositioned = this.syncCandidates();
        }

        // lookup position and set for all instructions
        for (let inst of this.flow.getAlternateOutputPaths()) {
            let pos = HTMLUtilities.getGeometry(inst.getElementId());

            if (pos) {

                let seq = this.flow.findSequenceByStepId(inst.stepId);

                let insty = pos.top + (seq?.y ?? 0) + 18 - (FlowConstants.PATH_CANDIDATE_HEIGHT/2);
                let instx= pos.left + (FlowConstants.DEFAULT_STACK_WIDTH - 40) + (seq?.x ?? 0) + FlowConstants.PATH_CANDIDATE_SHIFT;
              //  inst.postionHistory.push({x: instx, y: insty, from: 'poll'});


                inst.candidateStackY = insty;
                inst.candidateStackX = instx;
            }

        }

        let origional : {x: number, y: number, sequence: IFlowStepSequence}[] = [];
        let toPosition : IFlowStepSequence[] = [];

        for (let realS of this.candidateSequences) {
            // do not position ones that are unpositioned
            if (!realS.shouldRender()) {
                continue;
            }

            toPosition.push(realS);
            origional.push({x : realS.x, y: realS.y, sequence: realS});
        }

        // add real sequences to this
        for (let realS of this.flow.sequences) {
            toPosition.push(realS);
            origional.push({x : realS.x, y: realS.y, sequence: realS});

            let geo = HTMLUtilities.getGeometry(realS.getElementId());

            if (geo) {
                realS.height = geo.height;
            }

        }

        for (let candS of toPosition) {
            candS.reset();
        }

        let next : IFlowStepSequence | undefined = toPosition.length === 0 ? undefined : toPosition[0];


        while (next) {

            if (next._id === FlowConstants.DEFAULT_CANDIDATE_SEQ_ID) {
                // remove it
                toPosition.splice(0, 1);

                if (toPosition.length === 0)
                    break;

                next = toPosition[0];
                continue;
            }

            let compareTo = this.getSequencesNearPosition(next, toPosition) ;

            if (compareTo.length === 1) {
                toPosition.splice(toPosition.indexOf(compareTo[0]), 1);

                if (toPosition.length === 0)
                    break;

                next = toPosition[0];
                continue;
            }


            // build ranges
            // sort
            let ranges : PositionWorkingData[] = [];
            for (let aSequence of compareTo) {
                let height = Reflect.get(aSequence, 'height')   ;


                if (height) {
                    // add to account for top part
                    height = height + FlowConstants.TITLE_AREA_HEIGHT;
                } else {
                    height = FlowConstants.PATH_CANDIDATE_HEIGHT
                }

                height = height + 5;

                let collapsed = Reflect.get(aSequence, "isCollapsed") as boolean;

                if (collapsed)
                    height = FlowConstants.DEFAULT_COLLAPSED_STACK_HEIGHT;

                let newRange = new PositionWorkingData(aSequence.y, aSequence.y + height, aSequence);

                ranges.push(newRange);
            }

            ranges = ranges.sort((a: PositionWorkingData, b: PositionWorkingData) => {
                if (a.top > b.top) {
                    return 1;
                } else {
                    return -1;
                }
            } )

            // position real sequences
            for (let positionMe of ranges) {
                if (positionMe.sequence.sequenceType === "standard") {
                    this.positionOneStack(positionMe, ranges);
                }
            }

            // position other sequences
            for (let positionMe of ranges) {

                if (positionMe.sequence.sequenceType !== "standard") {
                    this.positionOneStack(positionMe, ranges);
                }
            }

            // remove ones we just positioned
            for(let toRemove of ranges) {
                toPosition.splice(toPosition.indexOf(toRemove.sequence), 1);
            }

            if (toPosition.length === 0)
                break;

            next = toPosition[0];
        }

        // -- non path candidate
        let nonPathCandidate = this.getOrAddNonPathCandidateSequence();
        this.positionSequenceToFarRight(nonPathCandidate);

        if (wasRepositioned) {
            return wasRepositioned;
        }

        for (let o of origional) {
            if (o.y !== o.sequence.y){
                return true;
            }
        }

        return false;
    }

    positionSequenceToFarRight(nonPathCandidate: IFlowStepSequence) {
        let farX = 0;

        for (let reals of this.flow.sequences) {
            let possibleX = reals.x + reals.width;

            if (possibleX > farX)
                farX = possibleX;
        }

        for (let cands of this.candidateSequences) {

            let possibleX = cands.x + FlowConstants.PATH_CANDIDATE_WIDTH; // replace with width of path candidates

            if (possibleX > farX)
                farX = possibleX;
        }

        nonPathCandidate.x = farX + 30;
    }

    positionOneStack(positionMe: PositionWorkingData, ranges: PositionWorkingData[]) {
        let height = positionMe.bottom - positionMe.top;
        let newPos = this.findGapBetweenSequences(positionMe, ranges);
        positionMe.sequence.y = newPos;
        positionMe.top = newPos;
        positionMe.bottom = newPos + height;
        positionMe.positioned = true;
    }

    private findGapBetweenSequences(forSeq: PositionWorkingData, stacksNear: PositionWorkingData[]) : number {
        stacksNear = stacksNear.filter((p:PositionWorkingData) => {
            return p.positioned;
        }).sort((a :PositionWorkingData, b:PositionWorkingData) => {
            if (a.top > b.top) {
                return 1;
            } else {
                return -1;
            }

        }) ;

        if (stacksNear.length === 0) {
            return forSeq.top;
        } else if (stacksNear.length === 1) {
            // can it go where it wants to go
            if (forSeq.bottom < stacksNear[0].top)
                return forSeq.top;

            if (stacksNear[0].bottom < forSeq.top )
                return forSeq.top;

            return stacksNear[0].bottom;
        } else {
            // its above the first one
            if (forSeq.bottom < stacksNear[0].top) {
                return forSeq.top;
            }



            let height = forSeq.bottom - forSeq.top;

            // iterate leaving off the last item in array
            for (var _i = 0; _i < stacksNear.length -1; _i++) {
                let fixed = stacksNear[_i];
                let fixedNext = stacksNear[_i + 1];

                // it is below the bottom of the range
                if (forSeq.top > fixedNext.top) {
                    continue;
                }

                let gapBetween = fixedNext.top - fixed.bottom;

                if (gapBetween > height) {
                    // it can go here...
                    if (fixed.bottom > forSeq.top &&
                        forSeq.bottom < fixedNext.top) {
                        // it can go where it wants
                        return forSeq.top;
                    } else {
                        return fixed.bottom;
                    }
                }
            }

        }

        // its below the last one
        if (forSeq.top > stacksNear[stacksNear.length -1].bottom){
            return forSeq.top;
        }

        // put below last
        return stacksNear[stacksNear.length -1].bottom;
    }

    private getSequencesNearPosition(toPosition : IFlowStepSequence, unpositionedSequences: IFlowStepSequence[]) : IFlowStepSequence[] {
        let leftBounds = toPosition.x - 50;
        let rightBounds = toPosition.x + FlowConstants.PATH_CANDIDATE_WIDTH;

        let nearSequences : IFlowStepSequence[] = [];

        for (let s of unpositionedSequences) {
            // this is general candidate
            if (s._id === FlowConstants.DEFAULT_CANDIDATE_SEQ_ID)
                continue;

            if (s.x > leftBounds && s.x < rightBounds) {
                nearSequences.push(s);
            }
        }

        return nearSequences;
    }

    private _dragOverSequenceId?: string;

    set dragOverSequence(sequence: FlowStepSequence | null) {
        let oldSequence : FlowStepSequence | null = null;
        if (this._dragOverSequenceId) {
            oldSequence = this.flow.find(this._dragOverSequenceId) as FlowStepSequence;
        }

        if (sequence) {
            this._dragOverSequenceId = sequence._id;
            StateManager.changed(sequence);
        } else {
            this._dragOverSequenceId = undefined;
        }

        if (oldSequence) StateManager.changed(oldSequence);
    }

    get dragOverSequenceId(): string | undefined {
        return this._dragOverSequenceId;
    }

    canCombine(combine: IFlowStepSequence, withSequence: IFlowStepSequence): boolean {
// todo: fix this

        // if (combine instanceof CandidateSequence) {
        //     let step = this.flow.find(combine.forStepId!) as BaseFlowStep;
        //
        //     // ui should not allow this
        //     if (step.sequence?._id === withSequence._id)
        //         return false;
        // }

        return true;
    }


    combineSequences(combine: IFlowStepSequence, withSequence: IFlowStepSequence) : void {
        // ui should not allow this
        if (!this.canCombine(combine, withSequence))
            return;

        if (combine instanceof CandidateSequence && combine.instruction) {
            let step = this.flow.find(combine.instruction.stepId) as BaseFlowStep;


            let inst = step!.findOutputInstruction(combine.instruction.pathName);
            inst.connectedSequenceId = withSequence._id

            StateManager.changed(inst);

            this.candidateSequences = this.candidateSequences.filter((c) => c._id !== combine._id);
            StateManager.propertyChanged(this, "candidateSequences");
        } else if (combine instanceof FlowStepSequence) {
            for (let s of combine.steps) {
                this.flow.moveToSequence(s, combine._id, withSequence._id);
            }

            for (let seq of this.flow.sequences) {
                if (seq._id === combine._id) continue;
                for (let s of seq.steps) {
                    for (let ins of s.getOutcomeInstructions()) {
                        if (ins.connectedSequenceId === combine._id && ins.strategy === FlowStepOutputInstructionType.BRANCH) {
                            ins.connectedSequenceId = withSequence._id;
                        }
                    }
                }
            }

            let idx = this.flow.sequences.indexOf(combine);
            this.deleteSequence(idx);
        }
        
        // check, second sequence MUST be a FlowStepSequence, not a CanidateSequence

        // if combine is FlowStepSequence AND has steps, copy those steps to withSquence

        // look through all steps to see if the combine ID is used, if so, change it to the withSequence.id

        // delete combine
        this.dragOverSequence = null;
    }

    @AutoBind
    private cloneFlowElement(s: IFlowElement): IFlowElement {
        let val;
        if (s instanceof FlowStepSequence) {
            val = new FlowStepSequence();
        } else {
            let type = s.name!;
            let registeredControl = Object.values(FlowStepRegistration).filter((v: RegistrationData) => {
                return Reflect.get(v.prototype, '__type') === type;
            })[0];

            val = new registeredControl!.prototype.constructor();
        }

        if (s instanceof FlowStepSequence) {
            DataUtilities.spreadDataWithoutFunction(val, DataUtilities.clone(s), ['_id', '_steps']);
            for (let step of s.steps) {
                val.addStep(this.cloneFlowElement(step));
            }
        } else if (s instanceof BaseFlowStep) {
            DataUtilities.spreadDataWithoutFunction(val, DataUtilities.clone(s), ['_id', '_nonDefaultOutputInstructions']);
            let paths = s.getOutcomes();
            if (paths) {
                for (let i of paths) {
                    val.findOutputInstruction(i.name);
                }
            }
        }

        return val;
    }

    @AutoBind
    onCopy(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        if (elem instanceof FlowStepSequence && !(elem as FlowStepSequence).canCopy) {
            this.notification = {
                message: 'You can not copy this sequence',
                onSuccess: () => {
                }
            }
        } else {
            this.clipboardElement = this.cloneFlowElement(elem) as IFlowElement;
        }

    }

    @AutoBind
    onCut(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        if (elem instanceof FlowStepSequence) {

            if (!(elem as FlowStepSequence).canCopy) {
                this.notification = {
                    message: 'You can not copy this sequence',
                    onSuccess: () => {
                    }
                }
                return;
            }

            let idx = this.flow.sequences.indexOf(elem as FlowStepSequence);
            if (idx > 0) {
                if ((elem as FlowStepSequence).steps.length > 0) {
                    this.notification = {
                        message: 'This sequence has the steps. Do you want to cut it really?',
                        onSuccess: () => {
                            this.deleteSequence(idx);
                        },
                        onCancel: () => {
                        }
                    }
                } else {
                    this.deleteSequence(idx);
                }
            } else {
                this.notification = {
                    message: 'Primary Stack can not be cut. But it\'s copied to clipboarded',
                    onSuccess: () => {
                    }
                }
            }
        } else {
            this.flow.remove(elem as BaseFlowStep);
        }
        this.clipboardElement = this.cloneFlowElement(elem) as IFlowElement;

    }

    @AutoBind
    deleteSequence(idx: number) {
        this.flow.deleteSequenceByIndex(idx);
        StateManager.propertyChanged(this.flow, 'sequences');
        this.purgeCandidateSequences();
    }

    @AutoBind
    onDelete(selectedId?: string) {
        let elem = this._lastSelectionElement;
        if (selectedId) {
            elem = this.flow.find(selectedId) as IFlowElement;
            this.contextControl = null;
        }
        if (!elem) return;

        if (elem instanceof FlowStepSequence) {
            if (!(elem as FlowStepSequence).canDelete) {
                this.notification = {
                    message: 'You can not delete this sequence',
                    onSuccess: () => {
                    }
                }
                return;
            }
            let idx = this.flow.sequences.indexOf(elem as FlowStepSequence);
            if (idx > 0) {
                if ((elem as FlowStepSequence).steps.length > 0) {
                    this.notification = {
                        message: 'This sequence has the steps. If you delete this, you will lost all data. it\'s okay?',
                        onSuccess: () => {
                            this.deleteSequence(idx);
                        },
                        onCancel: () => {
                        }
                    }
                } else {
                    this.deleteSequence(idx);
                }

            } else {
                this.notification = {
                    message: 'Primary Stack can not be deleted.',
                    onSuccess: () => {
                    }
                }
            }
        } else {
            this.flow.remove(elem as BaseFlowStep);
            this.purgeCandidateSequences();
        }

    };

    @AutoBind
    onPaste() {
        if (!this.clipboardElement || !this.selectionElement) return;

        if (this.clipboardElement instanceof FlowStepSequence && this.selectionElement instanceof FlowStepSequence) {
            let newSeq = this.cloneFlowElement(this.clipboardElement) as FlowStepSequence;
            newSeq._id = DataUtilities.generateUniqueId();

            newSeq.x += 20;
            newSeq.y += 20;

            this.flow.addSequence(newSeq);

            StateManager.propertyChanged(this.flow, 'sequences');

        } else if (!(this.clipboardElement instanceof FlowStepSequence) && !(this.selectionElement instanceof FlowStepSequence)) {
            for (let s of this.flow.sequences) {
                let idx = s.steps.indexOf(this.selectionElement as BaseFlowStep);
                if (idx >= 0) {
                    let elem = this.cloneFlowElement(this.clipboardElement) as BaseFlowStep;
                    elem._id = DataUtilities.generateUniqueId();
                    this.flow.add(elem, s._id, idx);
                    break;
                }
            }
        }

    }


    private getOrAddNonPathCandidateSequence() : ICandidateSequence {
        let candidate : ICandidateSequence | undefined = undefined;

        for (let c of this.candidateSequences) {
            if (c._id === FlowConstants.DEFAULT_CANDIDATE_SEQ_ID)
                candidate = c;
        }

        if (!candidate) {
            candidate = new NonPathCandidateSequence(0, 30);
            candidate._id = FlowConstants.DEFAULT_CANDIDATE_SEQ_ID;
            this.candidateSequences.push(candidate);
            // does initial position
            this.positionCandidateSequences(false);
        }

        return candidate;
    }

    get flow(): XFlowConfiguration {
        return this.flowEditor.flow;
    }

    private _selectionElement?: IFlowElement;
    private _lastSelectionElement?: IFlowElement;

    get selection(): string | undefined {
        return this._selectionElement?._id;
    }

    get selectionElement(): IFlowElement | undefined {
        return this._selectionElement;
    }

    get lastSelectionElement(): IFlowElement | undefined {
        return this._lastSelectionElement;
    }

    setSelection(selection: IFlowElement) {

        this._selectionElement = selection;
        StateManager.changed(selection);
        if (this._lastSelectionElement) {
            StateManager.changed(this._lastSelectionElement);
        }
        this._lastSelectionElement = selection;
        StateManager.propertyChanged(this, "selectionElement");
    }

    clearSelection() {
        this._selectionElement = undefined;
        StateManager.propertyChanged(this, "selectionElement");
    }

    private _clipboardElement?: IFlowElement;

    get clipboardElement(): IFlowElement | undefined {
        return this._clipboardElement;
    }

    set clipboardElement(elem: IFlowElement | undefined) {
        this._clipboardElement = elem;
        StateManager.propertyChanged(this, 'clipboardElement');
    }

    private _contextControl: IContextForControl | null = null;

    get contextControl(): IContextForControl | null {
        return this._contextControl;
    }

    set contextControl(control: IContextForControl | null) {
        this._contextControl = control;
        StateManager.propertyChanged(this, 'contextControl');
    }

    private _notification?: IDialog;

    set notification(n: IDialog | undefined) {
        this._notification = n;
        StateManager.propertyChanged(this, 'notification');
    }

    get notification() {
        return this._notification;
    }

    private _draggingElemType?: IDraggingElementType;

    get draggingElemType(): IDraggingElementType | undefined {
        return this._draggingElemType;
    }

    set draggingElemType(type: IDraggingElementType | undefined) {
        this._draggingElemType = type;
    }

    refresh() {
        StateManager.changed(this.flowEditor);
    }
}

class PositionWorkingData
{
    top: number;
    bottom: number;
    sequence: IFlowStepSequence;
    positioned: boolean= false;


    constructor(top: number, bottom: number, sequence: IFlowStepSequence) {
        this.top = top;
        this.bottom = bottom;
        this.sequence = sequence;
    }
}