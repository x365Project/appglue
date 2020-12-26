import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import {FlowEditorParameters, XFlowEditor} from "./XFlowEditor";
import { getFlowWithSteps } from './Testing/TestDataSetup';
import { FlowStepSequence } from './Structure/FlowStepSequence';

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

        fireEvent.click(sequences[1]);
        cutBtn = queryByTestId('btn-topbar-cut');

        fireEvent.click(cutBtn!);
        
        let btnDialogSuccess = queryByTestId('btn-dialog-success');
        expect(btnDialogSuccess).toBeInTheDocument();

        fireEvent.click(btnDialogSuccess!);

        sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(1);

        fireEvent.click(pasteBtn!);

        sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(2);

        fireEvent.click(sequences[1]);

        fireEvent.click(deleteBtn!);
        btnDialogSuccess = queryByTestId('btn-dialog-success');
        expect(btnDialogSuccess).toBeInTheDocument();
        fireEvent.click(btnDialogSuccess!);

        sequences = container.querySelectorAll('.stack');
        expect(sequences).toHaveLength(1);
    });

    it("Check stack locked copy/cut/paste/delete functions", () => {
        let flowEditor = new FlowEditorParams();
        let newSeq = new FlowStepSequence();
        newSeq.canCopy = false;
        newSeq.canDelete = false;
        flowEditor.flow.sequences.push(newSeq);
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

});
