import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import styled from "styled-components";
import { XFormConfiguration } from './XFormConfiguration';
import { getFormConfig } from "./Testing/FormTestData";
import { XFormDesigner } from './XFormDesigner'
import { IAction } from '../CommonUI/IAction';
import { InfoIcon } from '../CommonUI/Icon/InfoIcon';
import { Typography } from '@material-ui/core';
import { TextIcon } from '../CommonUI/TextIcon';
import { FormMode } from './FormDesignConstants';


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


    it("Check the FormDesign/LayoutDesign actions in topbar ", () => {
        let form = getFormConfig();

        const {getByTestId} = render(<XFormDesigner form={form} />);

        expect(getByTestId('btn-topbar-delete')).toBeInTheDocument();
        expect(getByTestId('btn-topbar-cut')).toBeInTheDocument();
        expect(getByTestId('btn-topbar-copy')).toBeInTheDocument();
        expect(getByTestId('btn-topbar-paste')).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Check the background and sizes in FormDesign ", () => {
        let form = getFormConfig();

        const {getByTestId} = render(<XFormDesigner form={form} />);

        let formWrapper = getByTestId('form-wrapper');

        expect(formWrapper).toBeInTheDocument();

        const sizeDefined = getByTestId('btn-topbar-size-defined');
        expect(sizeDefined).toBeInTheDocument();

        const sizeTabletHorizontal = getByTestId('btn-topbar-size-tablet-horizontal');
        expect(sizeTabletHorizontal).toBeInTheDocument();
        fireEvent.click(sizeTabletHorizontal);
        expect(formWrapper.children[0]).toHaveStyle('width: 1024px');
        expect(formWrapper.children[0]).toHaveStyle('height: 768px');

        const sizeTabletVertical = getByTestId('btn-topbar-size-tablet-vertical');
        expect(sizeTabletVertical).toBeInTheDocument();
        fireEvent.click(sizeTabletVertical);
        expect(formWrapper.children[0]).toHaveStyle('width: 768px');
        expect(formWrapper.children[0]).toHaveStyle('height: 1024px');

        const sizePhoneHorizontal = getByTestId('btn-topbar-size-phone-horizontal');
        expect(sizePhoneHorizontal).toBeInTheDocument();
        fireEvent.click(sizePhoneHorizontal);
        expect(formWrapper.children[0]).toHaveStyle('width: 667px');
        expect(formWrapper.children[0]).toHaveStyle('height: 375px');

        const sizePhoneVertical = getByTestId('btn-topbar-size-phone-vertical');
        expect(sizePhoneVertical).toBeInTheDocument();
        fireEvent.click(sizePhoneVertical);
        expect(formWrapper.children[0]).toHaveStyle('width: 375px');
        expect(formWrapper.children[0]).toHaveStyle('height: 667px');


        const backgroundPaper = getByTestId('btn-topbar-background-paper');
        expect(backgroundPaper).toBeInTheDocument();
        expect(getByTestId('background-paper')).toBeInTheDocument();

        const backgroundGray = getByTestId('btn-topbar-background-gray');
        expect(backgroundGray).toBeInTheDocument();
        fireEvent.click(backgroundGray);
        expect(getByTestId('background-gray')).toBeInTheDocument();

        const backgrondOutline = getByTestId('btn-topbar-background-outline');
        expect(backgrondOutline).toBeInTheDocument();
        fireEvent.click(backgrondOutline);
        expect(getByTestId('background-outline')).toBeInTheDocument();


        const backgroundWhite = getByTestId('btn-topbar-background-white');
        expect(backgroundWhite).toBeInTheDocument();
        fireEvent.click(backgroundWhite);
        expect(getByTestId('background-white')).toBeInTheDocument();


        expect(errorList).toHaveLength(0);
    });

    it("Check the sizes and scroll in Test with Pinned Section ", () => {
        let form = getFormConfig();
        form.doNotScrollLastContainerOnForm = true;
        form.doNotScrollFirstContainerOnForm = true;

        const {getByTestId, queryByTestId} = render(<XFormDesigner form={form} initialMode={FormMode.Runtime} />);

        expect(queryByTestId('pin-first-container')).not.toBeInTheDocument();
        expect(queryByTestId('pin-last-container')).not.toBeInTheDocument();
        
        const sizeTabletHorizontal = getByTestId('btn-topbar-size-tablet-horizontal');
        expect(sizeTabletHorizontal).toBeInTheDocument();
        fireEvent.click(sizeTabletHorizontal);
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();

        const sizeTabletVertical = getByTestId('btn-topbar-size-tablet-vertical');
        expect(sizeTabletVertical).toBeInTheDocument();
        fireEvent.click(sizeTabletVertical);
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();

        const sizePhoneHorizontal = getByTestId('btn-topbar-size-phone-horizontal');
        expect(sizePhoneHorizontal).toBeInTheDocument();
        fireEvent.click(sizePhoneHorizontal);
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();

        const sizePhoneVertical = getByTestId('btn-topbar-size-phone-vertical');
        expect(sizePhoneVertical).toBeInTheDocument();
        fireEvent.click(sizePhoneVertical);
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();

        const sizeDefined = getByTestId('btn-topbar-size-defined');
        expect(sizeDefined).toBeInTheDocument();
        fireEvent.click(sizeDefined);
        expect(getByTestId('no-pinned-section')).toBeInTheDocument();
    });
});
