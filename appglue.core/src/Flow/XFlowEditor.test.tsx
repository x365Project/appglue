import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import {FlowEditorParameters, XFlowEditor} from "./XFlowEditor";
import { XFlowConfiguration } from './Structure/XFlowConfiguration';

class FlowEditorParams implements FlowEditorParameters {
    flow = new XFlowConfiguration();
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
        let flowTitleElem = queryByTestId('topbar-flow-name').querySelector('input');
        let newFlowTitle = 'Updated Flow Title';
        expect(flowTitleElem).toBeInTheDocument();
        expect(flowTitleElem).toHaveValue(allControls.flowTitle);
        fireEvent.change(flowTitleElem, {target: {value: newFlowTitle}});
        expect(flowTitleElem).toHaveValue(newFlowTitle);

        let viewAPIBtn = queryByText(/view api/i).closest('a');
        expect(viewAPIBtn).toBeInTheDocument();
        expect(viewAPIBtn).toHaveAttribute('href', allControls.viewAPIUrl);

        let saveButton = queryByText(/save/i).closest('button');
        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton);
        expect(isSaveClicked).toEqual(true);

        let cancelBtn = queryByTestId('btn-topbar-flow-cancel');
        expect(cancelBtn).toBeInTheDocument();
        fireEvent.click(cancelBtn);
        expect(isCancelClicked).toEqual(true);

        expect(errorList).toHaveLength(0);
    });

});
