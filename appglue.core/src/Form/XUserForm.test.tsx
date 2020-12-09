import React from 'react';
import { render, fireEvent, queryAllByTestId } from "@testing-library/react";
import { XUserForm } from './XUserForm';
import { XFormConfiguration } from './XFormConfiguration';
import { XStackContainer } from './Containers/XStackContainer';
import { XColumnContainer, XColumnContainerColumn } from './Containers/XColumnContainer';
import { XHStackContainer, HStackAlignment, HStackVerticalAlignment } from './Containers/XHStackContainer';
import { getFormConfig } from "./Testing/FormTestData";
import { BorderStyle, TextControlStyle, TextControlSize } from './FormDesignConstants';
import { UserFormData } from './UserFormData';
import { DefaultOnOff } from './Utilities/DefaultOnOff';

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
        sourceForm.designFormWidth = 500;

        sourceForm.runtimeWidth = 600;
        sourceForm.gapBetweenContainers = 10;
        sourceForm.formMargin = 5;
        sourceForm.defaultInnerContainerMargin = 8;
        sourceForm.defaultInnerColumnMargin = 2;
        sourceForm.defaultInterControlSpacing = 8;

        // // first container
        sourceForm.doNotScrollLastContainerOnForm = true;
        sourceForm.doNotScrollFirstContainerOnForm = false;

        sourceForm.defaultShowContainerBorder = true;
        sourceForm.defaultContainerBorderRadius = 10;
        sourceForm.defaultContainerBorderWidth = 3;
        sourceForm.defaultContainerBorderColor = '#0f0';
        sourceForm.defaultContainerBorderStyle = BorderStyle.Groove;

        sourceForm.defaultLineBetweenContainerWidth = 2;
        sourceForm.showLinesBetweenContainers = true;
        sourceForm.defaultLineBetweenContainerColor = '#000';
        sourceForm.defaultLineBetweenContainerStyle = BorderStyle.Dashed;

        sourceForm.formBackgroundColor = '#ccc';
        sourceForm.defaultContainerBackgroundColor = '#eee';

        sourceForm.defaultTextStyle = TextControlStyle.OUTLINE;
        sourceForm.defaultTextSize = TextControlSize.SMALL;

        let containers = sourceForm.getContainers();

        let hstackContainer = containers[3] as XHStackContainer;
        hstackContainer.alignment = HStackAlignment.CENTER;
        hstackContainer.verticalAlignment = HStackVerticalAlignment.MIDDLE;

        let stackContainer = containers[1] as XStackContainer;
        stackContainer.interControlSpacing = 20;

        let stackContainer1 = containers[0] as XStackContainer;
        stackContainer1.containerBackgroundColor = '#0ee';

        let columnContainer = containers[2] as XColumnContainer;

        columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
        columnContainer.defaultShowColumnBorder = true;
        columnContainer.defaultColumnBorderColor = '#a00'
        columnContainer.defaultInnerColumnMargin = 10;

        columnContainer.lineBetweenColumns = true;
        columnContainer.lineWidthBetweenColumns = 1;
        columnContainer.lineColorBetweenColumns = '#00f';

        let sourceStorage = sourceForm.getStorageData();
        let sourceStorageStr = JSON.stringify(sourceStorage, null, 2);
        let sourceStorageObj = JSON.parse(sourceStorageStr);

        let form: XFormConfiguration = new XFormConfiguration();
        form.setStorageData(sourceStorageObj);

        let storage = form.getStorageData();
        let storageStr = JSON.stringify(storage, null, 2);

        expect(storageStr).toEqual(sourceStorageStr);

        expect(form.runtimeWidth).toEqual(sourceForm.runtimeWidth);
        expect(form.designFormWidth).toEqual(sourceForm.designFormWidth);

        const {getByTestId, queryAllByTestId} = render(<XUserForm form={form} />);

        const firstName = getByTestId('firstName').querySelector('input') as HTMLInputElement;
        expect(firstName).toBeInTheDocument();

        const lastName = getByTestId('lastName').querySelector('input') as HTMLInputElement;
        expect(lastName).toBeInTheDocument();

        const isAlive = getByTestId('isAlive').querySelector('input') as HTMLInputElement;
        expect(isAlive).toBeInTheDocument();

        const age = getByTestId('age').querySelector('input') as HTMLInputElement;
        expect(age).toBeInTheDocument();

        const isMale = getByTestId('isMale').querySelector('input') as HTMLInputElement;
        expect(isMale).toBeInTheDocument();

        const personDescription = getByTestId('personDescription').querySelector('textarea');
        expect(personDescription).toBeInTheDocument();

        expect(getByTestId('tester')).toBeInTheDocument();

        const birthday = getByTestId('birthday').querySelector('input') as HTMLInputElement;
        expect(birthday).toBeInTheDocument();

        const favoriteTime = getByTestId('favoriteTime').querySelector('input') as HTMLInputElement;
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

        expect(queryAllByTestId('line-between-containers')).toHaveLength(form.getContainers().length - 1);
        expect(queryAllByTestId('line-between-columns')).toHaveLength(2);
    });

    it("Check Form Actions", () => {
        let form: XFormConfiguration = getFormConfig();
        let isFormChanged = false;
        const onFormDataChange = (data: UserFormData) => {
            isFormChanged = true;
        }

        let isFormButtonClick = false;
        const onFormButtonClick = (buttonName: string, data: UserFormData) => {
            isFormButtonClick = true;
        }

        let isFormClosed = false;
        const onFormClose = (data: UserFormData) => {
            isFormClosed = false;
        }

        let isFormCancel = false;
        const onFormCancelButton = () => {
            isFormCancel = true;
        }

        const {getByText, getByTestId} = render(
            <XUserForm form={form}
                onFormButtonClick={onFormButtonClick}
                onFormClose={onFormClose}
                onFormDataChange={onFormDataChange}
                onFormCancelButton={onFormCancelButton}
            />
        );

        const cancelBtn = getByText(/Cancel/i);
        expect(cancelBtn).toBeInTheDocument();
        fireEvent.click(cancelBtn);
        expect(isFormButtonClick).toEqual(true);

        const lastNameInput = getByTestId("lastName").querySelector("input") as HTMLInputElement;
        expect(lastNameInput).toBeInTheDocument();
        fireEvent.change(lastNameInput, {target: {value: 'test'}});
        expect(isFormChanged).toEqual(true);
    });

    it("Check the line between columns", () => {
        let colContainer = new XColumnContainer();
        colContainer.lineBetweenColumns = true;

        colContainer.add(new XColumnContainerColumn());
        colContainer.add(new XColumnContainerColumn());
        colContainer.add(new XColumnContainerColumn());
        colContainer.add(new XColumnContainerColumn());

        let form:XFormConfiguration = new XFormConfiguration([colContainer, new XHStackContainer(), new XHStackContainer(), new XStackContainer(), new XColumnContainer()]);
        form.showLinesBetweenContainers = true;

        const {queryAllByTestId} = render(
            <XUserForm form={form} />
        );

        expect(queryAllByTestId('line-between-containers')).toHaveLength(4);
        expect(queryAllByTestId('line-between-columns')).toHaveLength(3);

    });

    it("Check the form title and form close button action", () => {
        let form:XFormConfiguration = getFormConfig();

        let isOnFormClose = false;
        let formData: UserFormData = new UserFormData();
        let onFormClose = (data: UserFormData) => {
            isOnFormClose = true;
            formData = data;
        }

        let formTitle = 'Test Form Title';

        const {getByTestId} = render(
            <XUserForm form={form} onFormClose={onFormClose} formTitle={formTitle} /> 
        )

        let testData: UserFormData = new UserFormData();

        testData.firsName = 'First Name';
        fireEvent.change(getByTestId('firstName').querySelector('input') as HTMLInputElement, { target: {value: testData.firstName}})

        testData.lastName = 'Last Name';
        fireEvent.change(getByTestId('lastName').querySelector('input') as HTMLInputElement, { target: {value: testData.lastName}})

        testData.birthday = '2020-11-25';
        fireEvent.change(getByTestId('birthday').querySelector('input') as HTMLInputElement, { target: {value: testData.birthday}})

        testData.personDescription = 'Person Description';
        fireEvent.change(getByTestId('personDescription').querySelector('textarea') as HTMLTextAreaElement, { target: {value: testData.personDescription}});

        let btnFormClose = getByTestId('btn-form-close');
        expect(btnFormClose).toBeInTheDocument();
        fireEvent.click(btnFormClose);
        expect(isOnFormClose).toEqual(true);

        expect(formData.firstName).toEqual(testData.firstName);
        expect(formData.lastName).toEqual(testData.lastName);
        expect(formData.birthday).toEqual(testData.birthday);
        expect(formData.personDescription).toEqual(testData.personDescription);

        let formTitleInput = getByTestId('test-form-title').querySelector('input') as HTMLInputElement;
        expect(formTitleInput).toBeInTheDocument();
        expect(formTitleInput.value).toEqual(formTitle);

    });

});
