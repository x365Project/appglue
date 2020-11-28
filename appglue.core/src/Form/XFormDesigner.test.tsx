import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import styled from "styled-components";
import { XFormConfiguration } from './XFormConfiguration';
import { getFormConfig } from "./Testing/FormTestData";
import { FormEditContext } from './Utilities/FormEditContext';
import { XFormDesigner } from './XFormDesigner'
import { IAction } from '../CommonUI/IAction';
import { InfoIcon } from '../CommonUI/Icon/InfoIcon';
import { Typography } from '@material-ui/core';
import { TextIcon } from '../CommonUI/TextIcon';


const Wrapper = styled("div")<{
    width?: number;
    height?: number;
    backgroundColor?: string;
}>`
  flex: 1;
  display: flex;
  flex-flow: column;
  background: ${props => props.backgroundColor || 'transparent'}
`;

class TopExtensionPanel implements IAction {

    name = 'Info';
    icon = <InfoIcon />

    renderUI() {
        return (
            <Wrapper backgroundColor="gray">
                <div>
                    <Typography>
                        Information
                    </Typography>
                </div>
            </Wrapper>
        )
    }
}

class BottomExtensionPanel implements IAction {
    name = 'Doc';
    icon = <TextIcon name="D" />

    renderUI() {
        return (
            <Wrapper backgroundColor="green">
                <div>
                    <Typography>
                        Documentation
                    </Typography>
                </div>
            </Wrapper>
        )
    }
}

describe("XFormDesigner", () => {


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

    it("Renders XFormDesigner", () => {
        let form: XFormConfiguration = getFormConfig();
    
        const { getByTestId, getByText, getAllByText } = render(<XFormDesigner form={form} />);

        const formeditdefaults = getByTestId('edit-form-defaults');

        fireEvent.click(formeditdefaults);

        expect(getByText(/Form Config/i)).toBeInTheDocument();
        expect(getByText(/Pin First Container/i)).toBeInTheDocument();
        expect(getByText(/Pin Last Container/i)).toBeInTheDocument();
        expect(getAllByText(/^Runtime Width$/g)).toHaveLength(2);

        expect(errorList).toHaveLength(0);

    });

    
    it("Renders XFormDesigner with extensions", () => {
        let form: XFormConfiguration = getFormConfig();
    
        const topExtensionPanel = new TopExtensionPanel();
        const bottomExtensionPanel = new BottomExtensionPanel();

        const { getByText } = render(
            <XFormDesigner
                form={form}
                topDesignerExtensions={[
                    topExtensionPanel
                ]}
                bottomDesignerExtensions={[
                    bottomExtensionPanel
                ]}
            />
        );

        const topExtensionPanelTab = getByText(topExtensionPanel.name);
        const bottomExtensionPanelTab = getByText(bottomExtensionPanel.name);

        expect(topExtensionPanelTab).toBeInTheDocument();
        expect(bottomExtensionPanelTab).toBeInTheDocument();

        fireEvent.click(topExtensionPanelTab);

        expect(getByText(/Information/i)).toBeInTheDocument();

        fireEvent.click(bottomExtensionPanelTab);
        expect(getByText(/Documentation/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);

    });

    it("Check the formName updates", () => {
        let form: XFormConfiguration = getFormConfig();
    
        const { getByTestId } = render(
            <XFormDesigner
                form={form}
                formName="test"
            />
        );

        const formNameInput = getByTestId('formName').querySelector('input');

        fireEvent.change(formNameInput, { target: {value: 'Test Form Name'}})
        expect(formNameInput.value).toEqual('Test Form Name')

        expect(errorList).toHaveLength(0);

    });

    it("Check onFormSave function", () => {
        let form: XFormConfiguration = new XFormConfiguration();
        let onSaveClicked = false;
    
        const { getByTestId } = render(
            <XFormDesigner
                form={form}
                formName="test"
                onFormSave={() => {
                    onSaveClicked = true;
                }}
            />
        );

        const saveButton = getByTestId("btn-form-save");

        expect(saveButton).toBeInTheDocument();

        fireEvent.click(saveButton);

        expect(onSaveClicked).toEqual(true);
        expect(errorList).toHaveLength(0);

    });

    it("Check onFormClose function", () => {
        let form: XFormConfiguration = new XFormConfiguration();
        let onCloseClicked = false;
    
        const { getByTestId } = render(
            <XFormDesigner
                form={form}
                formName="test"
                onFormClose={() => {
                    onCloseClicked = true;
                }}
            />
        );

        const closeButton = getByTestId("btn-form-close");

        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);

        expect(onCloseClicked).toEqual(true);
        expect(errorList).toHaveLength(0);

    });

});
