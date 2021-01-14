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
import {CandidateSequence} from "./Structure/CandidateSequence";
import {IFlowStepSequence} from "./Structure/IFlowStepSequence";
import { FlowStepOutputInstructionType } from "./Structure/FlowStepOutputInstructions";

export class FlowEditContext {
    flowEditor: XFlowEditor;

    flowTitle?: string;
    viewAPIUrl?: string;
    isDraggingControl: boolean = false; 
    

    private candidateSequences: CandidateSequence[] = [];

    public onFlowSave?: () => void;
    public onFlowCancel?: () => void;


    addCandidateSequence(s: CandidateSequence) : void {
        this.candidateSequences.push(s);
        this.positionCandidateSequences();
    }

    removeCandidateSequence(s: CandidateSequence) : void {
        const index = this.candidateSequences.indexOf(s);
        if (index > -1) {
            this.candidateSequences.splice(index, 1);
        }
        this.purgeCandidateSequences();
    }

    getCandidateSequences() : CandidateSequence[] {
        return this.candidateSequences;
    }

    findCandidateSequence(id: string): CandidateSequence | null {
        for (let c of this.candidateSequences) {
            if (c._id === id) return c;
        }
        return null;
    }

    purgeCandidateSequences() : void {
        this.syncCandidates();
        this.positionCandidateSequences(false);
    }

    private syncCandidates() {
        let sequenceIds = this.flow.sequences.map((s: FlowStepSequence) => s._id);

        // DO NOT REMOVE MY COMMENTS.  I DID NOT WRITE THE COMMENTS FOR FUN - THEY ARE INSTRUCIONS AND YOU
        // DID NOT FOLLOW THEM.

        // Here is what you lost by deleting my instructions.
        // -- what if a step adds or removes a path.  Are you removing these?
        // -- what if a step is deleted, do you deal with this
        // -- are you checking to make sure that if a step has a path, there is a candidate for it?


        // remove the candidate that has same id with sequence.
        this.candidateSequences = this.candidateSequences.filter((c: CandidateSequence) => {
            if (sequenceIds.indexOf(c._id) < 0) {
                if (c.forStepId && c.forPath) {
                    let step = this.flow.find(c.forStepId) as BaseFlowStep;
                    
                    if (!step) return false;

                    if (c.forPath === "") return false;

                    let paths = step.getOutcomes() || [];

                    if (paths.map((p) => p.name).indexOf(c.forPath) < 0) return false;

                    let stepOutput = step.findOutputInstruction(c.forPath);
                    if (!stepOutput) return false;
    
                    return stepOutput.strategy === FlowStepOutputInstructionType.BRANCH;
                } else if (c.forStepId) return false;
                return true;
            }
            return false;
        });

        this.addNonPathCandidateSequence();
    }

    getTargetSequence(id: string) : IFlowStepSequence | undefined {
        for (let s of this.flow.sequences) {
            if (s._id === id)
                return s;
        }

        for (let s of this.candidateSequences) {
            if (s._id === id)
                return s;
        }

        return;
    }

    getTarget(x: number, y: number): FlowStepSequence | null {
        for (let s of this.flow.sequences) {
            if (x > s.x && x < s.x + s.width && y > s.y && y < s.y + s.height)
                return s;
        }
        return null;
    }

    positionCandidateSequences(requirePurge:boolean = true) : void {

        if (requirePurge) {
            this.syncCandidates();
        }


        let toPosition : IFlowStepSequence[] = [...this.candidateSequences];


        // add real sequences to this
        for (let realS of this.flow.sequences) {
            toPosition.push(realS);
        }

        for (let candS of toPosition) {
            candS.reset();
        }


        let wasRepositioned = false;

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
            let ranges : {top: number, bottom: number, sequence: IFlowStepSequence} [] = [];
            for (let aSequence of compareTo) {
                let height = Reflect.get(aSequence, 'height') ?? FlowConstants.PATH_CANDIDATE_HEIGHT  ;

                height = height + 5;

                ranges.push({
                    top : aSequence.desiredY ,
                    bottom: aSequence.desiredY + height,
                    sequence: aSequence
                })
            }

            ranges.sort((a: {top: number, bottom: number, sequence: IFlowStepSequence}, b: {top: number, bottom: number, sequence: IFlowStepSequence}) => {
                if (a.top > b.top) {
                    return 1;
                }

                if (a.top < b.top) {
                    return -1;
                }

                return 0;
            } )

            console.log(ranges);


            let lastSeq : {top: number, bottom: number, sequence: IFlowStepSequence} | undefined = undefined;
            for (let positionMe of ranges) {
                if (lastSeq) {
                    if (positionMe.top < lastSeq.bottom) {
                        positionMe.sequence.y = lastSeq.bottom;
                        let height = positionMe.bottom - positionMe.top;
                        positionMe.bottom = lastSeq.bottom + height;
                        wasRepositioned = true;
                    }
                }

                lastSeq = positionMe;
            }

            // remove ones we just positioned
            for(let toRemove of ranges) {
                toPosition.splice(toPosition.indexOf(toRemove.sequence), 1);
            }

            if (toPosition.length === 0)
                break;

            next = toPosition[0];
        }

        if (wasRepositioned) {
            // trigger redraw of sequendes and lines
        }

        // -- non path candidate
        let nonPathCandidate : CandidateSequence | null = null;

        let farX = 0;

        for (let reals of this.flow.sequences) {
            let possibleX = reals.x + reals.width;

            if (possibleX > farX)
                farX = possibleX;
        }

        for (let cands of this.candidateSequences) {
            if (!cands.forStepId){
                nonPathCandidate = cands;
                continue;
            }

            let possibleX = cands.x + FlowConstants.PATH_CANDIDATE_WIDTH; // replace with width of path candidates

            if (possibleX > farX)
                farX = possibleX;
        }

        if (!nonPathCandidate) {
            throw 'cannot find general candidate sequence'
        } else {
            nonPathCandidate.x = farX + 30;
        }

        // set actual X/Y for any sequences
        StateManager.propertyChanged(this, "candidateSequences");
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
        if (combine instanceof CandidateSequence) {
            let step = this.flow.find(combine.forStepId!) as BaseFlowStep;

            // ui should not allow this
            if (step.sequence?._id === withSequence._id)
                return false;
        }

        return true;
    }


    combineSequences(combine: IFlowStepSequence, withSequence: IFlowStepSequence) : void {
        // ui should not allow this
        if (!this.canCombine(combine, withSequence))
            return;

        if (combine instanceof CandidateSequence) {
            let step = this.flow.find(combine.forStepId!) as BaseFlowStep;


            let inst = step!.findOutputInstruction(combine.forPath!);
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

    constructor(flowEditor: XFlowEditor) {
        this.flowEditor = flowEditor;

        this.addNonPathCandidateSequence();
    }

    addNonPathCandidateSequence() {
        if (this.candidateSequences.filter((c) => {
            return c._id === FlowConstants.DEFAULT_CANDIDATE_SEQ_ID;
        }).length === 0) {
            let c = new CandidateSequence(0, 30);
            c._id = FlowConstants.DEFAULT_CANDIDATE_SEQ_ID;
            this.candidateSequences.push(c);
            this.positionCandidateSequences();
        }
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