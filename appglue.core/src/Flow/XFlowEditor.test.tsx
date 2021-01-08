import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import {FlowEditorParameters, XFlowEditor} from "./XFlowEditor";
import { getFlowWithSteps } from './Testing/TestDataSetup';
import { FlowStepSequence } from './Structure/FlowStepSequence';
import { FlowStepOutput } from './Structure/FlowStepOutput';

class FlowEditorParams implements FlowEditorParameters {
    flow = getFlowWithSteps();
    flowTitle?: string;
	viewAPIUrl?: string;
	onFlowSave?: () => void;
	onFlowCancel?: () => void;
}

describe("XFlowEditor", () => {

    let errorList: any[] = [];

    const renderError = (output: string) => {
        errorList.push(output);
    };

    const renderWarn = (output: any) => {
        errorList.push(output);
    }

    const originalError = console.error
    const originalWarn = console.error
    const originalLog = console.log

    beforeEach(() => {
        console.error = renderError
        console.warn = renderWarn
        // console.log = renderLog
    })


    afterEach(() => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
    })

    it("Check if topbar renders correctly.", () => {

        let isCancelClicked = false;
        let isSaveClicked = false;

        let allControls = new FlowEditorParams();
        allControls.flowTitle = 'Flow Title';
        allControls.viewAPIUrl = 'http://localhost:6006';
        allControls.onFlowCancel = () => {
            isCancelClicked = true;
        }
        allControls.onFlowSave = () => {
            isSaveClicked = true;
        }
    
        const {queryByText, queryByTestId} = render(<XFlowEditor {...allControls} />);
        let flowTitleElem = queryByTestId('topbar-flow-name')!.querySelector('input') as HTMLInputElement;
        let newFlowTitle = 'Updated Flow Title';
        expect(flowTitleElem).toBeInTheDocument();
        expect(flowTitleElem).toHaveValue(allControls.flowTitle);
        fireEvent.change(flowTitleElem, {target: {value: newFlowTitle}});
        expect(flowTitleElem).toHaveValue(newFlowTitle);

        let viewAPIBtn = queryByText(/view api/i)!.closest('a') as HTMLAnchorElement;
        expect(viewAPIBtn).toBeInTheDocument();
        expect(viewAPIBtn).toHaveAttribute('href', allControls.viewAPIUrl);

        let saveButton = queryByText(/save/i)!.closest('button') as HTMLButtonElement;
        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton);
        expect(isSaveClicked).toEqual(true);

        let cancelBtn = queryByTestId('btn-topbar-flow-cancel') as HTMLButtonElement;
        expect(cancelBtn).toBeInTheDocument();
        fireEvent.click(cancelBtn);
        expect(isCancelClicked).toEqual(true);

        let copyBtn = queryByTestId('btn-topbar-copy');
        expect(copyBtn).toBeInTheDocument();

        let deleteBtn = queryByTestId('btn-topbar-delete');
        expect(deleteBtn).toBeInTheDocument();

        let cutBtn = queryByTestId('btn-topbar-cut');
        expect(cutBtn).toBeInTheDocument();

        let pasteBtn = queryByTestId('btn-topbar-paste');
        expect(pasteBtn).toBeInTheDocument();


        expect(errorList).toHaveLength(0);
    });

    it("Check if FlowSequenceStack title works correctly", () => {

        let flowEditor = new FlowEditorParams();

        const {container} = render(<XFlowEditor {...flowEditor} />);
        let stackLabel = container.querySelector('.InlineEdit-label');
        expect(stackLabel).toBeInTheDocument();
        fireEvent.click(stackLabel!);

        let stackInput = container.querySelector('.InlineEdit-input input');
        expect(stackInput).toBeInTheDocument();

        fireEvent.change(stackInput!, {target: {value: 'new title'}});
        fireEvent.blur(stackInput!)
        
        expect(stackInput!).not.toBeInTheDocument();
        stackLabel = container.querySelector('.InlineEdit-label');
        expect(stackLabel).toHaveTextContent('new title');
    });

    it("Check stack copy/cut/paste/delete functions", () => {
        let flowEditor = new FlowEditorParams();

        const {container, queryByTestId} = render(<XFlowEditor {...flowEditor} />);
        let cutBtn = queryByTestId('btn-topbar-cut');
        expect(cutBtn).toBeInTheDocument();
        expect(cutBtn).toHaveAttribute('disabled');

        let pasteBtn = queryByTestId('btn-topbar-paste');
        expect(pasteBtn).toBeInTheDocument();
        expect(pasteBtn).toHaveAttribute('disabled');

        let deleteBtn = queryByTestId('btn-topbar-delete');
        expect(deleteBtn).toBeInTheDocument();
        expect(deleteBtn).toHaveAttribute('disabled');

        let copyBtn = queryByTestId('btn-topbar-copy');
        expect(copyBtn).toBeInTheDocument();
        expect(copyBtn).toHaveAttribute('disabled');

        let sequence = container.querySelector('.stack');

        expect(sequence).toBeInTheDocument();

        // select
        fireEvent.click(sequence!);
        cutBtn = queryByTestId('btn-topbar-cut');
        expect(cutBtn).not.toHaveAttribute('disabled');

        pasteBtn = queryByTestId('btn-topbar-paste');
        expect(pasteBtn).toHaveAttribute('disabled');

        deleteBtn = queryByTestId('btn-topbar-delete');
        expect(deleteBtn).not.toHaveAttribute('disabled');

        copyBtn = queryByTestId('btn-topbar-copy');
        expect(copyBtn).not.toHaveAttribute('disabled');

        let collapseBtn = queryByTestId('btn-stack-collapse');
        expect(collapseBtn).toBeInTheDocument();

        fireEvent.click(copyBtn!);

        pasteBtn = queryByTestId('btn-topbar-paste');
        expect(pasteBtn).not.toHaveAttribute('disabled');

        fireEvent.click(pasteBtn!);

        let sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(2);

        expect(flowEditor.flow.sequences).toHaveLength(2);

        let otherPaths: FlowStepOutput[] = [];
        for (let sequence of flowEditor.flow.sequences) {
            let multiOutputTestStep = sequence.steps[1];
            otherPaths = otherPaths.concat(multiOutputTestStep.getOutcomes() || []);
        }
        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);

        fireEvent.click(sequences[1]);
        cutBtn = queryByTestId('btn-topbar-cut');

        fireEvent.click(cutBtn!);


        
        let btnDialogSuccess = queryByTestId('btn-dialog-success');
        expect(btnDialogSuccess).toBeInTheDocument();

        fireEvent.click(btnDialogSuccess!);
        expect(flowEditor.flow.sequences).toHaveLength(1);

        otherPaths  = [];
        for (let sequence of flowEditor.flow.sequences) {
            let multiOutputTestStep = sequence.steps[1];
            otherPaths = otherPaths.concat(multiOutputTestStep.getOutcomes() || []);
        }
        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);

        sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(1);

        fireEvent.click(pasteBtn!);

        expect(flowEditor.flow.sequences).toHaveLength(2);

        otherPaths  = [];
        for (let sequence of flowEditor.flow.sequences) {
            let multiOutputTestStep = sequence.steps[1];
            otherPaths = otherPaths.concat(multiOutputTestStep.getOutcomes() || []);
        }

        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);
        sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(2);

        expect(flowEditor.flow.sequences).toHaveLength(2);

        otherPaths  = [];
        for (let sequence of flowEditor.flow.sequences) {
            let multiOutputTestStep = sequence.steps[1];
            otherPaths = otherPaths.concat(multiOutputTestStep.getOutcomes() || []);
        }
        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);

        fireEvent.click(sequences[1]);

        fireEvent.click(deleteBtn!);
        btnDialogSuccess = queryByTestId('btn-dialog-success');
        expect(btnDialogSuccess).toBeInTheDocument();
        fireEvent.click(btnDialogSuccess!);

        sequences = container.querySelectorAll('.stack');
        otherPaths  = [];
        for (let sequence of flowEditor.flow.sequences) {
            let multiOutputTestStep = sequence.steps[1];
            otherPaths = otherPaths.concat(multiOutputTestStep.getOutcomes() || []);
        }

        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);
        expect(sequences).toHaveLength(1);
    });

    it("Check stack locked copy/cut/paste/delete functions", () => {
        let flowEditor = new FlowEditorParams();
        let newSeq = new FlowStepSequence();
        newSeq.canCopy = false;
        newSeq.canDelete = false;
        flowEditor.flow.addSequence(newSeq);
        newSeq.x = 100;
        newSeq.y = 20;

        const {container, queryByTestId} = render(<XFlowEditor {...flowEditor} />);
        let cutBtn = queryByTestId('btn-topbar-cut');
        expect(cutBtn).toBeInTheDocument();
        expect(cutBtn).toHaveAttribute('disabled');

        let pasteBtn = queryByTestId('btn-topbar-paste');
        expect(pasteBtn).toBeInTheDocument();
        expect(pasteBtn).toHaveAttribute('disabled');

        let deleteBtn = queryByTestId('btn-topbar-delete');
        expect(deleteBtn).toBeInTheDocument();
        expect(deleteBtn).toHaveAttribute('disabled');

        let copyBtn = queryByTestId('btn-topbar-copy');
        expect(copyBtn).toBeInTheDocument();
        expect(copyBtn).toHaveAttribute('disabled');

        let sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(2);

        fireEvent.click(sequences[1]);

        copyBtn = queryByTestId('btn-topbar-copy');
        expect(copyBtn).toBeInTheDocument();
        expect(copyBtn).not.toHaveAttribute('disabled');
        fireEvent.click(copyBtn!);

        let btnDialogSuccess = queryByTestId('btn-dialog-success');
        expect(btnDialogSuccess).toBeInTheDocument();
        fireEvent.click(btnDialogSuccess!);

        // check if paste button is enabled.
        pasteBtn = queryByTestId('btn-topbar-paste');
        expect(pasteBtn).toHaveAttribute('disabled');

        fireEvent.click(sequences[1]);

        deleteBtn = queryByTestId('btn-topbar-delete');
        expect(deleteBtn).toBeInTheDocument();
        expect(deleteBtn).not.toHaveAttribute('disabled');

        fireEvent.click(deleteBtn!);

        btnDialogSuccess = queryByTestId('btn-dialog-success');
        expect(btnDialogSuccess).toBeInTheDocument();
        fireEvent.click(btnDialogSuccess!);

        sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(2);
    });

    it("Check if Arrow count and candidate corrects.", () => {

        let flowEditorProps = new FlowEditorParams();

        const {container} = render(<XFlowEditor {...flowEditorProps} />);
        
        let sequence = flowEditorProps.flow.sequences[0];
        let sequenceElem = document.getElementById(sequence._id);

        expect(sequenceElem).toBeInTheDocument();
        // MultiOutputTestStep
        let multiOutputTestStep = sequence.steps[1];

        let otherPaths = multiOutputTestStep.getOutcomes() || [];

        if (otherPaths.length !== 0) {
            // removes first item
            otherPaths.shift();
        }

        expect(container.querySelectorAll('svg:not([class])')).toHaveLength(otherPaths.length);

        for (let path of otherPaths) {
            if (path.name) {
                let id = `${multiOutputTestStep._id}-${path.name}`;
                let pathElem = document.getElementById(id) as HTMLElement;
                expect(pathElem).toBeInTheDocument();
            }
        }

        // Sequence and Non Path Candidate
        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);
        expect(errorList).toHaveLength(0);
    });

    it("Check if path strategy changed.", () => {

        let flowEditorProps = new FlowEditorParams();
        let sequence = flowEditorProps.flow.sequences[0];
        sequence.isCollapsed = true;

        const {container} = render(<XFlowEditor {...flowEditorProps} />);

        let option = container.querySelectorAll('select.MuiSelect-select');

        expect(option).toHaveLength(2);

        fireEvent.change(option[0], {target: {value: 'continue'}});

        // MultiOutputTestStep
        let multiOutputTestStep = sequence.steps[1];

        let otherPaths = multiOutputTestStep.getOutcomes() || [];

        if (otherPaths.length !== 0) {
            // removes first item
            otherPaths.shift();
        }

        expect(container.querySelectorAll('svg:not([class])')).toHaveLength(otherPaths.length - 1);

        option = container.querySelectorAll('select.MuiSelect-select');

        fireEvent.change(option[0], {target: {value: 'branch'}});
        expect(container.querySelectorAll('svg:not([class])')).toHaveLength(otherPaths.length);

        expect(errorList).toHaveLength(0);

    });


    it("Check if adding / removing / changing the path works correctly.", () => {

        let flowEditorProps = new FlowEditorParams();
        let sequence = flowEditorProps.flow.sequences[0];
        const {container} = render(<XFlowEditor {...flowEditorProps} />);
        let stepHostElem = container.querySelector(`[data-rbd-draggable-id="${sequence.steps[1]._id}"] > div`) as HTMLDivElement;

        expect(stepHostElem).toBeInTheDocument();
        fireEvent.click(stepHostElem);

        // check if the edit layer is appeared.
        let editorLayerElem = container.querySelector('.config-form-content') as HTMLDivElement;
        expect(editorLayerElem).toBeInTheDocument();

        // check if the property editor text list is appeared.
        let propertyEditorElem = container.querySelector('.TextList-TextBox') as HTMLDivElement;
        expect(propertyEditorElem).toBeInTheDocument();

        let multiOutputTestStep = sequence.steps[1];

        // before adding, check,
        let otherPaths = multiOutputTestStep.getOutcomes() || [];
        expect(container.querySelectorAll('svg:not([class])')).toHaveLength(otherPaths.length - 1);
        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);


        let inputElems = container.querySelectorAll('.TextList-TextBox input');
        expect(inputElems).toHaveLength(otherPaths.length);

        fireEvent.keyDown(inputElems[otherPaths.length - 1],  { key: "Enter", code: 13, charCode: 13, keyCode: 13 });
        inputElems = container.querySelectorAll('.TextList-TextBox input');
        expect(inputElems).toHaveLength(otherPaths.length + 1);
        fireEvent.change(inputElems[inputElems.length - 1], {target: {value: 'c'}});

        // check if line and candidate is added
        expect(container.querySelectorAll('svg:not([class])')).toHaveLength(otherPaths.length);
        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 3);

        // check if number of line and candidates are same after updating the pathname 
        fireEvent.change(inputElems[inputElems.length - 2], {target: {value: 'abc'}});
        expect(container.querySelectorAll('svg:not([class])')).toHaveLength(otherPaths.length);
        expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 3);

        // // check number of line and candidates  after removing the pathname 
        // fireEvent.change(inputElems[inputElems.length - 1], {target: {value: ''}});
        // fireEvent.keyDown(inputElems[inputElems.length - 1],  { keyCode: 8 });
        // inputElems = container.querySelectorAll('.TextList-TextBox input');
        // expect(inputElems).toHaveLength(otherPaths.length);
        // expect(container.querySelectorAll('.react-draggable')).toHaveLength(otherPaths.length + 2);
        // expect(container.querySelectorAll('svg:not([class])')).toHaveLength(otherPaths.length - 1);
    });

});
