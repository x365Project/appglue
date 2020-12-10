import React from 'react';
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { XFormConfiguration } from '../XFormConfiguration';
import { getFormConfig } from "../Testing/FormTestData";
import { FormContext } from './FormContext';
import { XUserFormTester } from './XUserFormTester';
import { FormMode, FormDesignConstants } from '../FormDesignConstants';

describe("XUserFormTester", () => {


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
    });


    afterEach(() => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
    });

    it("Check outputting json.", () => {
        let ui: FormContext;

        let form: XFormConfiguration = getFormConfig();
        ui = new FormContext(form);
        ui.mode = FormMode.Runtime;
    
        ui.form.setFormContext(ui);

        const { getByText, getByTestId } = render(<XUserFormTester editContext={ui} />);

        expect(errorList).toHaveLength(0);

        expect(getByText(/SAVE AS SAMPLE/i)).toBeInTheDocument();

        const resultjsontext = getByTestId('runtime-json-textarea') as HTMLTextAreaElement;
        expect(resultjsontext).toBeInTheDocument();

        const firstName = getByTestId('firstName').querySelector('input') as HTMLInputElement;
        expect(firstName).toBeInTheDocument();
        fireEvent.change(firstName, { target: { value: 'Sama' } });
        let resultjson = JSON.parse(resultjsontext.value)
        expect(firstName.value).toEqual(resultjson.firstName)
        expect(firstName.value).toEqual('Sama')

        const lastName = getByTestId('lastName').querySelector('input') as HTMLInputElement;
        expect(lastName).toBeInTheDocument();
        fireEvent.change(lastName, { target: { value: 'Sama' } });
        resultjson = JSON.parse(resultjsontext.value)
        expect(lastName.value).toEqual(resultjson.lastName)
        expect(lastName.value).toEqual('Sama')

        const originIsAlive = resultjson.isAlive || false;
        const isAlive = getByTestId('isAlive').querySelector('input') as HTMLInputElement;
        fireEvent.click(isAlive);
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.isAlive).toEqual(!originIsAlive);
        expect(resultjson.isAlive).toEqual(isAlive.checked);
        expect(isAlive).toBeInTheDocument();

        const age = getByTestId('age').querySelector('input') as HTMLInputElement;
        fireEvent.change(age, { target: { value: 20 } });
        resultjson = JSON.parse(resultjsontext.value);
        expect(age.value).toEqual("20");
        expect(resultjson.age).toEqual("20");
        expect(age).toBeInTheDocument();

        const originIsMale = resultjson.isMale || false;
        const isMale = getByTestId('isMale').querySelector('input') as HTMLInputElement;
        fireEvent.click(isMale);
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.isMale).toEqual(isMale.checked);
        expect(resultjson.isMale).toEqual(!originIsMale);
        expect(isMale).toBeInTheDocument();

        const personDescription = getByTestId('personDescription').querySelector('textarea') as HTMLTextAreaElement;
        fireEvent.change(personDescription, { target: { value: 'personDescription' } });
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.personDescription).toEqual(personDescription.value);
        expect(resultjson.personDescription).toEqual('personDescription');
        expect(personDescription).toBeInTheDocument();

        expect(getByTestId('tester')).toBeInTheDocument();

        const birthday = getByTestId('birthday').querySelector('input') as HTMLInputElement;
        fireEvent.change(birthday, { target: { value: '2020-11-25' } });
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.birthday).toEqual(birthday.value);
        expect(resultjson.birthday).toEqual('2020-11-25');
        expect(birthday).toBeInTheDocument();

        const favoriteTime = getByTestId('favoriteTime').querySelector('input') as HTMLInputElement;
        fireEvent.change(favoriteTime, { target: { value: '23:11' } });
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.favoriteTime).toEqual(favoriteTime.value);
        expect(resultjson.favoriteTime).toEqual('23:11');
        expect(favoriteTime).toBeInTheDocument();

        expect(getByTestId('favoriteTime')).toBeInTheDocument();
        expect(getByTestId('skillLevel')).toBeInTheDocument();
        expect(getByTestId('skills')).toBeInTheDocument();
        expect(getByTestId('otherdata_1')).toBeInTheDocument();
        expect(getByTestId('otherdata_2')).toBeInTheDocument();
        expect(getByTestId('otherdata_3')).toBeInTheDocument();
        expect(getByTestId('otherdata2_1')).toBeInTheDocument();
        expect(getByTestId('otherdata2_2')).toBeInTheDocument();
        expect(getByTestId('otherdata2_3')).toBeInTheDocument();
        expect(getByTestId('otherdata3_1')).toBeInTheDocument();
        expect(getByTestId('otherdata3_2')).toBeInTheDocument();
        expect(getByTestId('otherdata3_3')).toBeInTheDocument();
    });

    it("TabletHorizontal Format: check the sizes and scroll in Runtime with Pinned Section", () => {
        let form = getFormConfig();
        form.doNotScrollLastContainerOnForm = true;
        form.doNotScrollFirstContainerOnForm = true;

        let ui = new FormContext(form);
        ui.mode = FormMode.Runtime;
        ui.form.setFormContext(ui);
        ui.designConfig = {
            mode: FormDesignConstants.FORM_MODE_TABLET_HORIZONTAL,
            data: FormDesignConstants.FORM_DATA_MODE_NONE
        }

        const {getByTestId, queryByTestId} = render(<XUserFormTester editContext={ui} />);

        expect(queryByTestId('pin-first-container')).not.toBeInTheDocument();
        expect(queryByTestId('pin-last-container')).not.toBeInTheDocument();

        
        let formWrapper = getByTestId('form-wrapper');
        expect(formWrapper).toBeInTheDocument();

        expect(formWrapper.children[0]).toHaveStyle('width: 1024px');
        expect(formWrapper.children[0]).toHaveStyle('height: 768px');
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();
    });

    it("TabletVertical Format: check the sizes and scroll in Runtime with Pinned Section", () => {
        let form = getFormConfig();
        form.doNotScrollLastContainerOnForm = true;
        form.doNotScrollFirstContainerOnForm = true;

        let ui = new FormContext(form);
        ui.mode = FormMode.Runtime;
        ui.form.setFormContext(ui);
        ui.designConfig = {
            mode: FormDesignConstants.FORM_MODE_TABLET_VERTICAL,
            data: FormDesignConstants.FORM_DATA_MODE_NONE
        }

        const {getByTestId, queryByTestId} = render(<XUserFormTester editContext={ui} />);

        expect(queryByTestId('pin-first-container')).not.toBeInTheDocument();
        expect(queryByTestId('pin-last-container')).not.toBeInTheDocument();

        
        let formWrapper = getByTestId('form-wrapper');
        expect(formWrapper).toBeInTheDocument();

        expect(formWrapper.children[0]).toHaveStyle('width: 768px');
        expect(formWrapper.children[0]).toHaveStyle('height: 1024px');
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();
    });


    it("PhoneHorizontal Format: check the sizes and scroll in Runtime with Pinned Section", () => {
        let form = getFormConfig();
        form.doNotScrollLastContainerOnForm = true;
        form.doNotScrollFirstContainerOnForm = true;

        let ui = new FormContext(form);
        ui.mode = FormMode.Runtime;
        ui.form.setFormContext(ui);
        ui.designConfig = {
            mode: FormDesignConstants.FORM_MODE_PHONE_HORIZONTAL,
            data: FormDesignConstants.FORM_DATA_MODE_NONE
        }

        const {getByTestId, queryByTestId} = render(<XUserFormTester editContext={ui} />);

        expect(queryByTestId('pin-first-container')).not.toBeInTheDocument();
        expect(queryByTestId('pin-last-container')).not.toBeInTheDocument();

        
        let formWrapper = getByTestId('form-wrapper');
        expect(formWrapper).toBeInTheDocument();

        expect(formWrapper.children[0]).toHaveStyle('width: 667px');
        expect(formWrapper.children[0]).toHaveStyle('height: 375px');
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();
    });


    it("PhoneVertical Format: check the sizes and scroll in Runtime with Pinned Section", () => {
        let form = getFormConfig();
        form.doNotScrollLastContainerOnForm = true;
        form.doNotScrollFirstContainerOnForm = true;

        let ui = new FormContext(form);
        ui.mode = FormMode.Runtime;
        ui.form.setFormContext(ui);
        ui.designConfig = {
            mode: FormDesignConstants.FORM_MODE_PHONE_VERTICAL,
            data: FormDesignConstants.FORM_DATA_MODE_NONE
        }

        const {getByTestId, queryByTestId} = render(<XUserFormTester editContext={ui} />);

        expect(queryByTestId('pin-first-container')).not.toBeInTheDocument();
        expect(queryByTestId('pin-last-container')).not.toBeInTheDocument();

        
        let formWrapper = getByTestId('form-wrapper');
        expect(formWrapper).toBeInTheDocument();

        expect(formWrapper.children[0]).toHaveStyle('width: 375px');
        expect(formWrapper.children[0]).toHaveStyle('height: 667px');
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();
    });

});
