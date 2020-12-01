import React, {useState, useCallback, useReducer} from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import {XUserForm} from "../XUserForm";
import {XColumnContainer, XColumnContainerColumn} from "../Containers/XColumnContainer";
import {XHStackContainer, HStackVerticalAlignment} from "../Containers/XHStackContainer";
import {XTextField} from "../Controls/XTextField";
import {XButton} from "../Controls/XButton";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";
import { XStackContainer } from "../Containers/XStackContainer";
import { XTextArea } from "../Controls/XTextArea";
import { XSelectbox } from "../Controls/XSelectbox";
import { XCheckboxField } from "../Controls/XCheckboxField";
import { UserFormData } from "../UserFormData";
import { InputLabel } from "@material-ui/core";


let form = getFormConfig();

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

export interface XFormDesignerProps {
    form: XFormConfiguration;
}


interface StoryHostXUserFormStyleProps {
    width?: number;
    height?: number;
    background?: string;
    border?: string;
}


// --------------------------------
// control for testing
// --------------------------------


const StoryHostWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > div {
        margin: 5px;
    }
`;


const XUserFormWrapper = styled("div")<StoryHostXUserFormStyleProps>`
    height: ${props => props.height ? `${props.height}px` : 'auto'};
    width: ${props => props.width ? `${props.width}px` : '100%'};
    background: ${props => props.background || 'lightgray'};
    overflow: auto;
    border: ${props => props.border || 'solid 1px gray'};
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface StoryHostXUserFormProps extends XFormDesignerProps, StoryHostXUserFormStyleProps {
    formName? : string;
    showCancel? : boolean;
}

const initialState: string[] = [];

enum EventLogType {
    ADD_EVENT = 'ADD_EVENT',
    REMOVE_EVENT = 'REMOVE_EVENT'
}

const eventLogsReducer = (state: string[], action: {type: EventLogType, logMessage?: string, index?: number}) => {
    switch(action.type) {
        case EventLogType.ADD_EVENT:
            return [
                ...state,
                action.logMessage || ''
            ]
        case EventLogType.REMOVE_EVENT:
            return state.splice(action.index || 0, 1);
    }
}

function StoryHostXUserForm(props: {storyHostProps : StoryHostXUserFormProps}) {
    const [formData, setFormData] = useState<UserFormData | null>(null); 
    const [eventLogs, dispatch] = useReducer(eventLogsReducer, initialState);

    const addEventLog = useCallback((logMessage: string) => {
        dispatch({
            type: EventLogType.ADD_EVENT,
            logMessage
        })
    }, [dispatch])

    const onFormDataChange = useCallback((data: UserFormData) => {
        setFormData(data);
        addEventLog('Form Data is changed');
    }, [setFormData, addEventLog]);

    const onFormButtonClick = useCallback((buttonName: string, data: UserFormData) => {
        addEventLog(`Button ${buttonName}: clicked`);
    }, [addEventLog]);

    const onFormCancelButton = useCallback(() => {
        addEventLog(`Cancel Form is triggered`)
    }, [addEventLog])

    const onFormClose = useCallback((data: UserFormData) => {
        setFormData(data);
        addEventLog('Close Form event is triggered')
    }, [addEventLog, setFormData])

    console.log('eventLogs:', eventLogs);

    return (
        <StoryHostWrapper>
            <XUserFormWrapper
                height={props.storyHostProps.height}
                width={props.storyHostProps.width}
                background={props.storyHostProps.background}
                border={props.storyHostProps.border}
            >
                <XUserForm
                    form={props.storyHostProps.form}
                    onFormDataChange={onFormDataChange}
                    onFormButtonClick={onFormButtonClick}
                    onFormCancelButton={onFormCancelButton}
                    onFormClose={onFormClose}
                />
            </XUserFormWrapper>
            <InfoWrapper>
                <div>
                    <InputLabel>Form Data</InputLabel>
                    <TextareaAutosize rowsMin={3} value={formData ? JSON.stringify(formData, null, 2) : ''} />
                </div>
                <div>
                    <InputLabel>Event Logs</InputLabel>
                    <TextareaAutosize rowsMin={3} value={eventLogs.join('\n')} />
                </div>
            </InfoWrapper>
        </StoryHostWrapper>
    );
}

const Template: Story<{storyHostProps: StoryHostXUserFormProps}> = (args) => <StoryHostXUserForm {...args} />;


// --------------------------------
// END control for testing
// --------------------------------


export default {
    title: "Form Designer/Runtime",
} as Meta;

form.formBackgroundColor = 'transparent';
export const AllControls = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});

form = new XFormConfiguration();
form.formBackgroundColor = 'transparent';
let cContainer = new XColumnContainer();
let hContainer = new XHStackContainer();
let sContainer = new XStackContainer();

form.add(cContainer);
form.add(hContainer);
form.add(sContainer);

export const NoControls = Template.bind({}, {storyHostProps: {form}});


form = new XFormConfiguration();
form.formBackgroundColor = 'transparent';
let columnContainer = new XColumnContainer();
let actualCol = new XColumnContainerColumn();
let actualCol2 = new XColumnContainerColumn();
let actualCol3 = new XColumnContainerColumn();

actualCol.targetWidth = 30;
actualCol.minSizePx = 100;
actualCol2.targetWidth = 70;
actualCol2.minSizePx = 300;
actualCol3.targetWidth = 20;
actualCol3.minSizePx = 100;

// show border so we can see
columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
columnContainer.showContainerBorder = true;
columnContainer.defaultShowColumnBorder = true;

columnContainer.add(actualCol);
columnContainer.add(actualCol2);
columnContainer.add(actualCol3);

actualCol.add(new XTextField());
actualCol.add(new XTextField());
actualCol.add(new XTextField());
actualCol2.add(new XTextField());
actualCol2.add(new XTextField());
actualCol2.add(new XTextField());

let hstackContainer = new XHStackContainer();
hstackContainer.verticalAlignment = HStackVerticalAlignment.MIDDLE;
hstackContainer.overrideFormBorderSettings = DefaultOnOff.On;
hstackContainer.showContainerBorder = true;


let button = new XButton();
button.label = 'Submit';
let button2 = new XButton();
button.label = 'Cancel';
hstackContainer.add(new XTextField());
hstackContainer.add(new XTextField());
hstackContainer.add(button);
hstackContainer.add(button2);

form.add(columnContainer);
form.add(hstackContainer);

export const ResponsiveThinForm = Template.bind({}, {storyHostProps: {form, width: 375, height: 667}});

form = getFormConfig();
form.formBackgroundColor = 'transparent';
form.doNotScrollLastContainerOnForm = true;
form.doNotScrollFirstContainerOnForm = true;

export const PinnedSections = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});


form = new XFormConfiguration();
form.doNotScrollFirstContainerOnForm = true;
form.doNotScrollLastContainerOnForm = true;


export const PinnedSectionsForEmptyForm = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});


form = new XFormConfiguration();
form.formBackgroundColor = 'transparent';
let stackContainer = new XStackContainer();
let textField = new XTextField();

textField.valueName = 'textfield';
textField.label = 'Text Field';

let textareaField = new XTextArea();
textareaField.valueName = 'textarea';
textareaField.label = 'Textarea Field';

let selectField = new XSelectbox();
selectField.valueName = 'selectbox';
selectField.items = [
    {
        label: 'Option 1',
        value: '1',
    },
    {
        label: 'Option 2',
        value: '2',
    },
];

let checkboxField = new XCheckboxField();
checkboxField.valueName = 'checkbox';

stackContainer.add(textField);
stackContainer.add(textareaField);
stackContainer.add(selectField);
stackContainer.add(checkboxField);

form.add(stackContainer);

export const DataChangingExternally = MissingTemplate.bind({}, {});


export const ValidationBreaks = MissingTemplate.bind({}, {});
export const ButtonEvents = MissingTemplate.bind({}, {});
export const CloseAction = MissingTemplate.bind({}, {});

form = new XFormConfiguration();
form.formBackgroundColor = 'transparent';
let stack = new XStackContainer();
form.add(stack);
let control = new XTextField();
control.valueName = 'test';
control.label = 'test label';
stack.add(control);

export const SimpleFormOneTextBox = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});
