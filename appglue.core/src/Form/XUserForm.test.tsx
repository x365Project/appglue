import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { XUserForm } from './XUserForm';
import { XFormConfiguration } from './XFormConfiguration';
import { XStackContainer } from './Containers/XStackContainer';
import { XColumnContainer } from './Containers/XColumnContainer';
import { XHStackContainer } from './Containers/XHStackContainer';
import { getFormConfig } from "./Testing/FormTestData";

describe("XUserForm", () => {

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

    it("Check if no placeholder in runtime containers", () => {
        let form: XFormConfiguration = new XFormConfiguration();
        let stackContainer = new XStackContainer();
        let columnContainer = new XColumnContainer();
        let hContainer = new XHStackContainer();

        form.add(stackContainer);
        form.add(columnContainer);
        form.add(hContainer);
    
        const {queryByText} = render(<XUserForm form={form} />);

        expect(queryByText(/Drag controls from toolbox./i)).not.toBeInTheDocument();
        expect(queryByText(/Add controls in the form design tab/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);

    });

    it("Creating Form from json", () => {
        let sourceForm: XFormConfiguration = getFormConfig();
        let sourceStorage = sourceForm.getStorageData();
        let sourceStorageStr = JSON.stringify(sourceStorage, null, 2);
        let sourceStorageObj = JSON.parse(sourceStorageStr);

        // console.log('sourceStorageStr:', sourceStorageStr);

        let form: XFormConfiguration = new XFormConfiguration();
        form.setStorageData(sourceStorageObj);       

        let storage = form.getStorageData();
        let storageStr = JSON.stringify(storage, null, 2);

        // console.log('storageStr:', storageStr);

        expect(storageStr).toEqual(sourceStorageStr);
    });

});
