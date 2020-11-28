import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { XFormConfiguration } from '../XFormConfiguration';
import { getFormConfig } from "../Testing/FormTestData";
import { FormEditContext } from './FormEditContext';
import { XUserFormTester } from './XUserFormTester';

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
    })


    afterEach(() => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
    })

    it("Renders XUserFormTester", () => {
        let ui: FormEditContext;

        let form: XFormConfiguration = getFormConfig();
        ui = new FormEditContext(form);
    
        ui.form.setFormRuntimeContext(ui);

        const { getByText, getByTestId } = render(<XUserFormTester editContext={ui} />);

        expect(errorList).toHaveLength(0);

        expect(getByText(/SAVE AS SAMPLE/i)).toBeInTheDocument();

        const resultjsontext = getByTestId('runtime-json-textarea');
        expect(resultjsontext).toBeInTheDocument();



        const firstName = getByTestId('firstName').querySelector('input');
        expect(firstName).toBeInTheDocument();
        fireEvent.change(firstName, { target: { value: 'Sama' } });
        let resultjson = JSON.parse(resultjsontext.value)
        expect(firstName.value).toEqual(resultjson.firstName)
        expect(firstName.value).toEqual('Sama')

        const lastName = getByTestId('lastName').querySelector('input');
        expect(firstName).toBeInTheDocument();
        fireEvent.change(lastName, { target: { value: 'Sama' } });
        resultjson = JSON.parse(resultjsontext.value)
        expect(lastName.value).toEqual(resultjson.lastName)
        expect(lastName.value).toEqual('Sama')

        const originIsAlive = resultjson.isAlive || false;
        const isAlive = getByTestId('isAlive').querySelector('input');
        fireEvent.click(isAlive);
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.isAlive).toEqual(!originIsAlive);
        expect(isAlive).toBeInTheDocument();

        const age = getByTestId('age').querySelector('input');
        fireEvent.change(age, { target: { value: 20 } });
        resultjson = JSON.parse(resultjsontext.value);
        expect(age.value).toEqual("20");
        expect(resultjson.age).toEqual("20");
        expect(age).toBeInTheDocument();

        const originIsMale = resultjson.isMale || false;
        const isMale = getByTestId('isMale').querySelector('input');
        fireEvent.click(isMale);
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.isMale).toEqual(!originIsMale);
        expect(isMale).toBeInTheDocument();

        const personDescription = getByTestId('personDescription');
        fireEvent.change(personDescription, { target: { value: 'personDescription' } });
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.personDescription).toEqual(personDescription.value);
        expect(resultjson.personDescription).toEqual('personDescription');
        expect(personDescription).toBeInTheDocument();

        expect(getByTestId('tester')).toBeInTheDocument();

        const birthday = getByTestId('birthday').querySelector('input');
        fireEvent.change(birthday, { target: { value: '2020-11-25' } });
        resultjson = JSON.parse(resultjsontext.value);
        expect(resultjson.birthday).toEqual(birthday.value);
        expect(resultjson.birthday).toEqual('2020-11-25');
        expect(birthday).toBeInTheDocument();

        const favoriteTime = getByTestId('favoriteTime').querySelector('input');
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


});
