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
import { IPosition } from "./CommonUI/IPosition";
import { IRelationLine } from "./CommonUI/IRelationLine";
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

    findCandiateSequence(id: string): CandidateSequence | null {
        for (let c of this.candidateSequences) {
            if (c._id === id) return c;
        }
        return null;
    }

    purgeCandidateSequences() : void {
        this.doPurgeOfSequences();
        this.positionCandidateSequences();
    }

    private doPurgeOfSequences() {
        let sequenceIds = this.flow.sequences.map((s: FlowStepSequence) => s._id);

        // remove the candidate that has same id with sequence.
        this.candidateSequences = this.candidateSequences.filter((c: CandidateSequence) => {
            if (sequenceIds.indexOf(c._id) < 0) {
                if (c.forStepId && c.forPath) {
                    let step = this.flow.find(c.forStepId) as BaseFlowStep;
                    if (!step) return false;
                    let stepOutput = step.findOutPut(c.forPath);
                    if (!stepOutput) return false;
    
                    return stepOutput.strategy === FlowStepOutputInstructionType.BRANCH;
                }
                return true;
            }
            return false;
        });

        this.addNonPathCandidateSequence();
    }

    purgeCandidateSequencesByStepId(stepId?: string) {
        if (!stepId) {
            this.purgeCandidateSequences();
        }

        this.candidateSequences = this.candidateSequences.filter((c: CandidateSequence) => c.forStepId !== stepId);
        StateManager.propertyChanged(this, 'candidateSequences');
    }

    getCandidateSequenceForPath(stepId: string, pathName: string): CandidateSequence | null {
        let filteredSequences = this.candidateSequences.filter((c: CandidateSequence) => 
            (c.forStepId === stepId && c.forPath === pathName)
        )

        if (filteredSequences.length > 0) return filteredSequences[0];
        return null;
    }

    positionCandidateSequences() : void {
        this.doPurgeOfSequences();

        let positionedSequences : IFlowStepSequence[] = [];

        for (let s of this.candidateSequences) {
            let compareTo = this.getSequencesNearPosition(s, positionedSequences) ;

            positionedSequences.push(s);

            s.x = s.desiredX;

            if (compareTo.length === 0) {
                s.y = s.desiredY;
            } else {
                let ranges : {top: number, bottom: number} [] = [];
                for (let moveAwayFrom of compareTo) {
                    let realSequence = moveAwayFrom as FlowStepSequence;

                    if (realSequence) {
                        ranges.push({
                            top : realSequence.y - 20,
                            bottom: realSequence.y + realSequence.height + 20
                        })
                    } else {
                        ranges.push({
                            top : s.y - 20,
                            bottom: s.y + 50 + 20 // replace 50 with real height
                        })
                    }
                }

                ranges.sort((a: {top: number, bottom: number}, b: {top: number, bottom: number}) => {
                    if (a.top > b.top) {
                        return 1;
                    }

                    if (a.top < b.top) {
                        return -1;
                    }

                    return 0;
                } )
                // see if we can put it above

                if (s.desiredY + 50 < ranges[0].top) // replace with constant height
                {
                    s.y = s.desiredY;
                } else {
                    // see if can fit in gap
                    let lastRange : {top: number, bottom: number} = ranges[0];
                    
                    ranges.shift();
                    let positioned = false;
                    for (let r of ranges) {
                        if ((r.top - 50 - 20 -20) < lastRange.bottom) {
                            s.y = lastRange.bottom + 20;
                            positioned = true;
                            break;
                        }
                    }

                    // put below last
                    if (ranges.length > 0 &&!positioned) {
                        s.y = ranges[ranges.length -1].bottom + 20;
                    }
                }
            }
        }

        let nonPathRange : CandidateSequence | null = null;

        let farX = 0;

        for (let reals of this.flow.sequences) {
            let possibleX = reals.x + reals.width;

            if (possibleX > farX)
                farX = possibleX;
        }

        for (let cands of this.candidateSequences) {
            if (!cands.forStepId){
                nonPathRange = cands;
                continue;
            }

            let possibleX = cands.x + 150; // replace with width of path candidates

            if (possibleX > farX)
                farX = possibleX;
        }

        if (!nonPathRange) {
            throw 'cannot find general candidate sequence'
        } else {
            nonPathRange.x = farX + 30;
            nonPathRange.y = nonPathRange.desiredY;
        }


        // set actual X/Y for any sequences
        StateManager.propertyChanged(this, "candidateSequences");
    }

    private getSequencesNearPosition(toPosition : CandidateSequence, postionedSequences: IFlowStepSequence[]) : IFlowStepSequence[] {
        let leftBounds = toPosition.x - 15;
        let rightBounds = toPosition.x + 100;

        let nearSequences : IFlowStepSequence[] = [];

        for (let s of this.flow.sequences) {
            if (s.x > leftBounds && s.x < rightBounds) {
                nearSequences.push(s);
            }
        }

        for (let s of postionedSequences) {
            if (s === toPosition)
                continue;

            // this is general candidate
            if (!toPosition.forStepId)
                continue;

            if (s.x > leftBounds && s.x < rightBounds) {
                nearSequences.push(s);
            }
        }

        return nearSequences;
    }

    combineSequences(combine: IFlowStepSequence, withSequence: IFlowStepSequence) {
        // check, second sequence MUST be a FlowStepSequence, not a CanidateSequence

        // if combine is FlowStepSequence AND has steps, copy those steps to withSquence

        // look through all steps to see if the combine ID is used, if so, change it to the withSequence.id

        // delete combine
    }

    @AutoBind
    clone(s: IFlowElement): IFlowElement {
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

        return Object.assign(val, s);
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
            this.clipboardElement = this.clone(elem) as IFlowElement;
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
        this.clipboardElement = this.clone(elem) as IFlowElement;

    }

    @AutoBind
    deleteSequence(idx: number) {
        this.flow.sequences.splice(idx, 1);
        StateManager.propertyChanged(this.flow, 'sequences');
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
        }

    };

    @AutoBind
    onPaste() {
        if (!this.clipboardElement || !this.selectionElement) return;

        if (this.clipboardElement instanceof FlowStepSequence && this.selectionElement instanceof FlowStepSequence) {
            let idx = this.flow.sequences.indexOf(this.selectionElement as FlowStepSequence);
            let newSeq = this.clone(this.clipboardElement) as FlowStepSequence;
            newSeq._id = DataUtilities.generateUniqueId();
            newSeq.steps = newSeq.steps.map((s: BaseFlowStep) => {
                let newS = this.clone(s) as BaseFlowStep;
                newS._id = DataUtilities.generateUniqueId();
                return newS;
            });

            newSeq.x += 20;
            newSeq.y += 20;

            this.flow.sequences.splice(idx + 1, 0, newSeq);

            StateManager.propertyChanged(this.flow, 'sequences');

        } else if (!(this.clipboardElement instanceof FlowStepSequence) && !(this.selectionElement instanceof FlowStepSequence)) {
            for (let s of this.flow.sequences) {
                let idx = s.steps.indexOf(this.selectionElement as BaseFlowStep);
                if (idx >= 0) {
                    let elem = this.clone(this.clipboardElement) as BaseFlowStep;
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
        if (this.candidateSequences.filter((c) => !c.forStepId).length === 0) {
            let newStackPosition = this.getNewStackPosition();
            let c = new CandidateSequence(newStackPosition.x, newStackPosition.y);
            this.addCandidateSequence(c);
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


    getNewStackPosition(): IPosition {
        let y = this.flow.sequences[0].y;
        let bottomY = y + FlowConstants.DEFAULT_STACK_HEIGHT;

        let x = Math.max(
            ...this.flow.sequences
                .filter((s) => {
                    return s.y < bottomY;
                })
                .map((s) => s.x + s.width)
        );
        return {x, y};
    }


    setSelection(selection: IFlowElement) {
        this._selectionElement = selection;
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

    private _draggingElemId?: string;

    get draggingElem(): string | undefined {
        return this._draggingElemId;
    }

    set draggingElem(elemId: string | undefined) {
        this._draggingElemId = elemId;
    }

    lines: IRelationLine[] = [];

    addLine(line: IRelationLine) {
        let isNew = true;
        for (let l in this.lines) {
            if (this.lines[l].forStepId === line.forStepId && this.lines[l].forStepPath === line.forStepPath) {
                isNew = false;
                this.lines[l] = line;
            }

        }
        
        if (isNew) {
            this.lines.push(line);
        }

        this.flowEditor.drawLines();
    }

    updateLineBySequence(sequence: FlowStepSequence) {
        for (let l in this.lines) {
            if (this.lines[l].to._id === sequence._id) {
                this.lines[l].to = sequence
            }
        }

        this.flowEditor.drawLines();
    }

    updateLineByCandidate(candidate: CandidateSequence) {
        for (let l in this.lines) {
            if (this.lines[l].to._id === candidate._id) {
                this.lines[l].to = candidate
            }
        }
        this.flowEditor.drawLines();
    }

    convertLineFromCandidateToSequence(sequence: FlowStepSequence) {
        for (let l in this.lines) {
            if (this.lines[l].to._id === sequence._id) {
                this.lines[l].to = sequence;
            }
        }
        this.flowEditor.drawLines();
    }

    refresh() {
        StateManager.changed(this.flowEditor);
    }
}