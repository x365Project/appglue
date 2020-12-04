import React, {useState, useCallback, useReducer} from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { XFormConfiguration } from "../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import {XUserForm} from "../XUserForm";
import {XColumnContainer, XColumnContainerColumn} from "../Containers/XColumnContainer";
import {XHStackContainer, HStackVerticalAlignment, HStackAlignment} from "../Containers/XHStackContainer";
import {XTextField} from "../Controls/XTextField";
import {XButton} from "../Controls/XButton";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";
import { XStackContainer } from "../Containers/XStackContainer";
import { XTextArea } from "../Controls/XTextArea";
import { XSelectbox } from "../Controls/XSelectbox";
import { XCheckboxField } from "../Controls/XCheckboxField";
import { UserFormData } from "../UserFormData";
import { InputLabel } from "@material-ui/core";
import { BorderStyle, TextControlStyle, TextControlSize } from "../FormDesignConstants";


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


const StoryHostWrapper = styled("div")<{background?: string}>`
    display: flex;
    flex-direction: row;
    background: ${props => props.background || 'lightgray'}
`;


const XUserFormWrapper = styled("div")<StoryHostXUserFormStyleProps & {hasHeader?: boolean}>`
    height: ${props => props.height ? `${props.height}px` : 'auto'};
    width: ${props => props.width ? `${props.width}px` : '100%'};
    overflow: visible;
    border: ${props => props.border || 'solid 1px gray'};
    background: #fff;
    margin: ${props => props.hasHeader ? '83px 33px 33px' : '33px'};
    position: relative;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 33px;
`;

interface StoryHostXUserFormProps extends XFormDesignerProps, StoryHostXUserFormStyleProps {
    formName? : string;
    showCancel? : boolean;
    formTitle?: string;
    onFormClose?: (data: UserFormData) => void
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
        props.storyHostProps.onFormClose!(data);
        setFormData(data);
        addEventLog('Close Form event is triggered')
    }, [addEventLog, setFormData])


    if (props.storyHostProps.width) {
        props.storyHostProps.form.runtimeWidth = props.storyHostProps.width;
    }


    return (
        <StoryHostWrapper background={props.storyHostProps.background}>
            <XUserFormWrapper
                height={props.storyHostProps.height}
                width={props.storyHostProps.width}
                border={props.storyHostProps.border}
                hasHeader={!!props.storyHostProps.formTitle || !!props.storyHostProps.onFormClose}
            >
                <div style={{width: '100%', height: '100%', overflow: 'auto'}}>
                    <XUserForm
                        form={props.storyHostProps.form}
                        formTitle={props.storyHostProps.formTitle}
                        onFormDataChange={onFormDataChange}
                        onFormButtonClick={onFormButtonClick}
                        onFormCancelButton={onFormCancelButton}
                        onFormClose={props.storyHostProps.onFormClose ? onFormClose: undefined}
                    />
                </div>
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

export const AllControls = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});

form = new XFormConfiguration();
let cContainer = new XColumnContainer();
let hContainer = new XHStackContainer();
let sContainer = new XStackContainer();

form.add(cContainer);
form.add(hContainer);
form.add(sContainer);

export const NoControls = Template.bind({}, {storyHostProps: {form}});


form = new XFormConfiguration();
let columnContainer = new XColumnContainer();
let actualCol = new XColumnContainerColumn();
let actualCol2 = new XColumnContainerColumn();
let actualCol3 = new XColumnContainerColumn();
actualCol3.overrideFormBorderSettings = DefaultOnOff.On;
actualCol3.columnBorderWidth = 3;
actualCol3.columnBorderColor = '#f00';

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

form = new XFormConfiguration();
columnContainer = new XColumnContainer();
actualCol = new XColumnContainerColumn();
actualCol2 = new XColumnContainerColumn();
actualCol3 = new XColumnContainerColumn();

actualCol.targetWidth = 30;
actualCol.minSizePx = 100;
actualCol2.targetWidth = 70;
actualCol2.minSizePx = 300;
actualCol3.targetWidth = 20;
actualCol3.minSizePx = 100;

columnContainer.add(actualCol);
columnContainer.add(actualCol2);
columnContainer.add(actualCol3);

columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
columnContainer.showContainerBorder = true;
columnContainer.defaultShowColumnBorder = true;

columnContainer.lineBetweenColumns = true;
columnContainer.lineWidthBetweenColumns = 2;
columnContainer.lineColorBetweenColumns = 'gray';

form.add(columnContainer);
export const ResponsiveThinWithLineBetweenColumns = Template.bind({}, {storyHostProps: {form, width: 375, height: 667}});

form = new XFormConfiguration();
columnContainer = new XColumnContainer();

actualCol = new XColumnContainerColumn();
actualCol2 = new XColumnContainerColumn();
actualCol3 = new XColumnContainerColumn();

columnContainer.add(actualCol);
columnContainer.add(actualCol2);
columnContainer.add(actualCol3);

actualCol.targetWidth = 30;
actualCol.minSizePx = 500;
actualCol2.targetWidth = 70;
actualCol2.minSizePx = 300;
actualCol3.targetWidth = 20;
actualCol3.minSizePx = 100;

columnContainer.lineBetweenColumns = true;
columnContainer.lineWidthBetweenColumns = 2;
columnContainer.lineColorBetweenColumns = 'gray';

form.add(columnContainer);
export const LineBetweenWithOverlapColumsn = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});

form = getFormConfig();
form.doNotScrollLastContainerOnForm = true;
form.doNotScrollFirstContainerOnForm = true;

export const PinnedSections = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});

let onFormClose = (data: UserFormData) => {}

export const PinnedSectionsWithHeader = Template.bind({}, {storyHostProps: {form, width: 800, height: 800, formTitle: 'Test Title', onFormClose}});


form = new XFormConfiguration();
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

let formStorageData = form.getStorageData();
let s = JSON.stringify(formStorageData, null, 2);

let sasobj = JSON.parse(s);
let newForm = new XFormConfiguration();
newForm.setStorageData(sasobj);

export const DataChangingExternally = MissingTemplate.bind({}, {});

form = getFormConfig();

form.designFormWidth = 500;

form.runtimeWidth = 600;
form.gapBetweenContainers = 10;
form.formMargin = 5;
form.defaultInnerContainerMargin = 8;
form.defaultInnerColumnMargin = 2;
form.defaultInterControlSpacing = 8;

// // first container
form.doNotScrollLastContainerOnForm = true;
form.doNotScrollFirstContainerOnForm = false;

form.defaultShowContainerBorder = true;
form.defaultContainerBorderRadius = 10;
form.defaultContainerBorderWidth = 3;
form.defaultContainerBorderColor = '#0f0';
form.defaultContainerBorderStyle = BorderStyle.Groove;

form.defaultLineBetweenContainerWidth = 2;
form.showLinesBetweenContainers = true;
form.defaultLineBetweenContainerColor = '#000';
form.defaultLineBetweenContainerStyle = BorderStyle.Dashed;

form.formBackgroundColor = '#ccc';
form.defaultContainerBackgroundColor = '#eee';

form.defaultTextStyle = TextControlStyle.OUTLINE;
form.defaultTextSize = TextControlSize.SMALL;

let containers = form.getContainers();

hstackContainer = containers[3] as XHStackContainer;
hstackContainer.alignment = HStackAlignment.CENTER;
hstackContainer.verticalAlignment = HStackVerticalAlignment.MIDDLE;

stackContainer = containers[1] as XStackContainer;
stackContainer.interControlSpacing = 20;

let stackContainer1 = containers[0] as XStackContainer;
stackContainer1.containerBackgroundColor = '#033';

columnContainer = containers[2] as XColumnContainer;

columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
columnContainer.defaultShowColumnBorder = true;
columnContainer.defaultColumnBorderColor = '#a00'
columnContainer.defaultInnerColumnMargin = 10;

columnContainer.lineBetweenColumns = true;
columnContainer.lineWidthBetweenColumns = 1;
columnContainer.lineColorBetweenColumns = '#00f';


formStorageData = form.getStorageData();
s = JSON.stringify(formStorageData, null, 2);

sasobj = JSON.parse(s);
newForm = new XFormConfiguration();
newForm.setStorageData(sasobj);

export const ReadInFormFromJSONDefinition = Template.bind({}, {storyHostProps: {form: newForm, width: 800, height: 800}});


export const ValidationBreaks = MissingTemplate.bind({}, {});

form = getFormConfig();

export const ButtonEvents = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});

export const FormTitleAndCloseButton = Template.bind({}, {storyHostProps: {form, width: 800, height: 800, formTitle: 'Test Form', onFormClose }} );

form = new XFormConfiguration();
let stack = new XStackContainer();
form.add(stack);
let control = new XTextField();
control.valueName = 'test';
control.label = 'test label';
stack.add(control);

export const SimpleFormOneTextBox = Template.bind({}, {storyHostProps: {form, width: 800, height: 800}});
