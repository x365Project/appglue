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
import {FlowConstants, IDialog, XFlowEditor} from "./XFlowEditor";
import {CandidateSequence} from "./Structure/CandidateSequence";
import {IFlowStepSequence} from "./Structure/IFlowStepSequence";
import { IPosition } from "./CommonUI/IPosition";

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

    purgeCandidateSequences() : void {
        // remove any that are missing
        // add any that are needed
        // make sure we have a blank one
        this.positionCandidateSequences();
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
            (c.forStepId === stepId && c.forPath == pathName)
        )

        if (filteredSequences.length > 0) return filteredSequences[0];
        return null;
    }

    getAvailableSpots(desiredX: number, desiredY: number, width: number, height: number): {from: IPosition, to: IPosition}[] {
        let sequences = this.flow.sequences.map((s) => {
            let distance = Math.min(
                Math.pow(desiredX - s.x, 2) + Math.pow(desiredY - s.y, 2), 
                Math.pow(desiredX - s.x - s.width, 2) + Math.pow(desiredY - s.y, 2),
                Math.pow(desiredX - s.x, 2) + Math.pow(desiredY - s.y - s.height, 2),
                Math.pow(desiredX - s.x - s.width, 2) + Math.pow(desiredY - s.y - s.height, 2), 
            );

            return {
                distance,
                sequence: s
            }
        });



        // let from = {
        //     x: sequence.x - width <= 0 ? sequence.x : sequence.x - width,
        //     y: sequence.y - height <= 0 ? sequence.y : sequence.y - height
        // };

        // let to = {
        //     x: sequence.x + sequence.width + width,
        //     y: sequence.y + sequence.height + height
        // }

        // let result: {from: IPosition, to: IPosition}[] = [];

        // let sequences = this.flow.sequences.filter((s) => {
        //     if (s._id === sequence._id) return false;
        //     if (s.x + s.width < from.x || s.x > to.x) return false;
        //     if (s.y + s.height < from.y || s.y > to.y) return false;
        //     return true;
        // });



        return result;
    }

    positionCandidateSequences() : void {
        // set actual X/Y for any sequences
        let canRemoveCandidates: CandidateSequence[] = [];
        for (let c of this.candidateSequences) {
            let { forPath, forStepId, desiredX, desiredY, x, y } = c;
            // let width = forPath ? 150 : 75;
            // let height = forPath ? 35 : 152;
            if (forStepId) {
                let width = 150;
                let height = 35;
            }

        }
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


    get newStackPosition(): { x: number; y: number } {
        let y = this.flow.sequences[0].y
        let x = Math.max(
            ...this.flow.sequences
                .filter((s) => {
                    return s.y < y + 150;
                })
                .map((s) => s.x + (s.isCollapsed ? 150 : 300))
        );
        return {x, y};
    }


    setSelection(selection: IFlowElement) {
        this._selectionElement = selection;
        this._lastSelectionElement = selection;
        this.refresh()
    }

    clearSelection() {
        this._selectionElement = undefined;
        this.refresh()
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

    private _canvas: {
        context: CanvasRenderingContext2D | null;
        width: number;
        height: number;
    } | null = null;

    set canvas(c: { context: CanvasRenderingContext2D | null; width: number; height: number; } | null) {
        this._canvas = c;
    }

    get canvas(): { context: CanvasRenderingContext2D | null; width: number; height: number; } | null {
        return this._canvas
    }

    get canvasContext(): CanvasRenderingContext2D | null {
        return this._canvas?.context || null;
    }

    drawLine(point: { x: number, y: number }, point1: { x: number, y: number }) {
        if (this.canvasContext) {
            this.canvasContext.beginPath();
            this.canvasContext.setLineDash([5, 15]);
            this.canvasContext.moveTo(point.x, point.y);
            this.canvasContext.lineTo(point1.x, point1.y);
            this.canvasContext.strokeStyle = FlowConstants.DEFAULT_RELATION_LINE_COLOR;
            this.canvasContext.lineWidth = FlowConstants.DEFAULT_RELATION_LINE_WIDTH;
            this.canvasContext.stroke();
        }
    }

    clearCanvas() {
        if (this._canvas) {
            this.canvasContext?.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }

    refresh() {
        this.flowEditor.forceUpdate();
    }
}