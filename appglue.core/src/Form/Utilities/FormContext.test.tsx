import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { XFormAndLayoutDesignPanel } from "./XFormAndLayoutDesignPanel"
import { XFormConfiguration } from '../XFormConfiguration';
import { getFormConfig } from "../Testing/FormTestData";
import { FormContext } from './FormContext';
import { FormMode } from '../FormDesignConstants';
import { XStackContainer } from '../Containers/XStackContainer';
import { XTextField } from '../Controls/XTextField';
import { XBaseControl } from '../Controls/XBaseControl';
import { ValidationIssue, ValidationLevel } from '../../Common/IDesignValidationProvider';
import { XHStackContainer } from '../Containers/XHStackContainer';
import { XColumnContainer } from '../Containers/XColumnContainer';

describe("FormContext", () => {


    let errorList: any[] = [];

    const renderError = (output: string) => {
        errorList.push(output);
    };

    const renderWarn = (output: any) => {
        errorList.push(output);
    }

    const renderLog = (_output: any) => {
        return;
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

    it("Copy/Cut/Paste Actions", () => {
        let ui: FormContext;

        let form: XFormConfiguration = getFormConfig();
        let controls = form.getContainers()[0].getControls();

        ui = new FormContext(form);
        ui.form.setFormContext(ui);
        let firstId = form.getContainers()[0].getControls()[0].id;
        ui.selectControl(firstId);
        expect(controls).toHaveLength(1);
        ui.onCopy();
        ui.onPaste();

        controls = form.getContainers()[0].getControls();
        expect(controls).toHaveLength(2);

        let secondId = controls[1].id;

        expect(firstId).not.toEqual(secondId);

        ui.onCut(secondId);
        expect(controls).toHaveLength(1);

        ui.onPaste();
        expect(controls).toHaveLength(2);
    });

});
