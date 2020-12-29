import React, {useState, useCallback, useEffect} from "react";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
    Button,
    ClickAwayListener,
    DialogActions,
    Tab,
    InputAdornment,
    Input,
    FormControlLabel,
    Checkbox,
    Tooltip,
    TextField
} from "@material-ui/core";
import {ExpressionValue} from "../ExpressionValue";
import {ExpressionValueType} from "../ExpressionValueType";
import {ExpressionRegistration, RegistrationData} from "./RegisterExpression";
import {ExpressionExpectedType} from "../ExpressionExpectedType";
import {AutoBind} from "../../Common/AutoBind";
import styled from "styled-components";
import {BaseExpression} from "../BaseExpression";
import ReactDraggable from "react-draggable";
import {FloatRight} from "../ExpressionElements/Logic/IfThenExpression";
import {ExpressionEditContext} from "./ExpressionEditContext";
import {SearchIcon} from "../../CommonUI/Icon/SearchIcon";
import {BackIcon} from "../../CommonUI/Icon/BackIcon";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";
import { StyledTextField } from "../../CommonUI/PropertyEditing/PropertyEditorStyles";
import { PropertyEditorInteger } from "../../CommonUI/PropertyEditing/PropertyEditorInteger";
import { PropertyEditorText } from "../../CommonUI/PropertyEditing/PropertyEditorText";
import { PropertyEditorBoolean } from "../../CommonUI/PropertyEditing/PropertyEditorBoolean";
import { PropertyEditorTextList } from "../../CommonUI/PropertyEditing/PropertyEditorTextList";
import { PropertyEditorNumberList } from "../../CommonUI/PropertyEditing/PropertyEditorNumberList";
import { PropertyEditorDate } from "../../CommonUI/PropertyEditing/PropertyEditorDate";
import { PropertyEditorDateList } from "../../CommonUI/PropertyEditing/PropertyEditorDateList";

const ExpressionValueSlotEditor = styled.div`
    font-family: Mulish;
    font-size: 16px;
    position: absolute;
    background: #FFFFFF;
    box-shadow: 4px 4px 4px rgba(21, 84, 115, 0.05), 8px 8px 40px rgba(147, 169, 191, 0.28);
    border-radius: 4px;
    background: #fff;
    width: 650px;
    z-index: 101;
    top: 30px;
    left: -50px;
    max-height: none;
    padding: 20px;
`;


const Header = styled.div`
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    width: 100%;
    display: flex;
    color: #33486B;
`;

const HeaderFloatRight = styled.div`
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    padding-right: 15px;
    align-items: center;
`;

const ExpressionHeaderButton = styled(Button)`
    && {
        padding: 4px 12px;
        background: #EBF4FA;
        border-radius: 4px;
        border: solid 2px #fff;

        transition: all .3s;

        &:hover {
            background: #fff;
            border: solid 2px #EBF4FA;          
        }

        .MuiButton-label {
            font-family: Mulish;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #4B6080;
        }


    }
`;

const ExpressionClearButton = styled(Button)`
    && {
        padding: 4px 12px;
        background: #EBF4FA;
        border-radius: 4px;
        border: solid 2px #fff;

        transition: all .3s;

        &:hover {
            background: #fff;
            border: solid 2px #EBF4FA;          
        }

        .MuiButton-label {
            font-family: Mulish;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #4B6080;
        }


    }
`;

const NoSelectionColDiv = styled.div`
    background-color : #D3D3D3;
    width : 30%;
    height : 250px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-right: 5px;
    margin-left: 5px;
`;

const ExpressionColContainer = styled.div`
    display: flex;
    width : 100%;
    height : 250px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    flex-wrap: wrap;
`;

const ExpressionViewPanel = styled.div`
    width : 100%;
    max-height : 376px;
    min-height: 96px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    clear: both;
    display: flex;
    flex-direction: column;
`;

const ExpressionViewPanelLine = styled.div`
    width : 100%;
    justify-content: flex-start;
    clear: both;
    padding-bottom: 15px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #4B6080;
    text-transform: none;

    .MuiButton-label {
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #4B6080;
        text-transform: none;
    }
`;

const ExpressionViewPanelLineBottom = styled.div`
    width : 100%;
    justify-content: flex-start;
    margin: auto;
    clear: both;
    padding-top: 15px;
    padding-bottom: 5px;
    .MuiButton-outlined {
        border: solid 1px #4B6080;
        .MuiButton-label {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #4B6080;
        }
    }
`;

const ExpressionViewPanelLineCenter = styled.div`
    display: flex;
    margin-left: auto;
    justify-content: center;
    align-items: center;
    clear: both;
    padding: 15px;
    border-radius: 5px;
    flex: 1;
    overflow: auto;
    width: 100%;
`;


const InsertExpressionViewPanelLineCenter = styled.div`
    display: flex;
    margin-left: auto;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    padding: 15px;
    border-radius: 5px;
    flex: 1;
    overflow: auto;
    width: 100%;
`;

const InsertExpressionViewPanel = styled.div`
    width : 100%;
    max-height : 376px;
    min-height: 96px;
    padding-top: 15px;
    padding-right: 10px;
    padding-bottom: 15px;
    padding-left: 10px;
    clear: both;
    display: flex;
    flex-direction: column;
`;

const InsertExpressionViewPanelLine = styled.div`
    width : 100%;
    justify-content: flex-start;
    clear: both;
    padding: 10px 0;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #4B6080;
    text-transform: none;
`;


const VariableOrValColumn = styled.div`
    border-left: 2px solid #EBF4FA;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    padding-left: 10px;
    padding-right: 10px;
`;

const ExpressionColumn = styled.div`
    width: 33%;
`;

const ExpressionColumnShowMoreButton = styled(Button)`
    && {
        margin-top: 8px;
        
        background: #EBF4FA;
        border-radius: 4px;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;

        text-align: center;
        letter-spacing: 0.05em;
        width: 100%;
        color: #4B6080;

        &:hover {
            background: #D8E4EE;
            color: #33486B;
        }
    }
`;

const ExpressionColumnRow = styled.div`
    margin: -4px;
    display: flex;
    flex-wrap: wrap;
    padding-right: 12px;

    > div {
        width: 25%;
    }
`;

const VariableOrValContentPanel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    height : 250px;
`;

const ToolboxPage = styled.div`
    display: flex;
    float : left;
    width: 100%;
    flex-wrap: wrap;
    padding: 16px 0;
    max-height: 376px;
    align-content: flex-start;
`;

const ToolboxItem = styled("div")<{hideLabel: boolean;}>`
    display: flex;
    float : left;
    border: 1px solid #1D6295;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    margin: ${props => props.hideLabel ? '6px' : '4px'};
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    align-items: center;
    cursor: pointer;
`;

const ToolboxItemText = styled.div`
   display: flex;
   float : left;
   margin-left: 13px;
   font-family: Mulish;
   font-size: 14px;
   color: #1D6295;
`;

const CompleteButton = styled(Button)`
    && {
        padding: 4px 12px;
        color: #fff;
        background: #1D6295;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        border: solid 2px white;

        &:hover {
            background: #fff;
            color: #1D6295;
            border: solid 2px #1D6295;
        }
    }
`;

export class ExpressionValueDialog extends React.Component<{ expressionValue: ExpressionValue }, {inserting : boolean}> {


    constructor(props: Readonly<{ expressionValue: ExpressionValue }> | { expressionValue: ExpressionValue }) {
        super(props);

        this.state = {
            inserting: false
        }
    }

    render() {
        return (
            this.props.expressionValue.editContext?.getSelection() === this.props.expressionValue._id
            ? (
                <ClickAwayListener
                    onClickAway={this.handleClose} >
                    <ReactDraggable
                        handle=".config-form-header"
                    >

                        <ExpressionValueSlotEditor>
                            <ObserveState listenTo={this.props.expressionValue} properties={['valueTypeValue']} control={() => (
                                <>
                                    {this.renderHeader()}
                                    {!this.state.inserting && this.renderPage()}
                                    {this.state.inserting && <InsertExpressionPage
                                        expressionValue={this.props.expressionValue}
                                        onComplete={() => {
                                            this.setState({inserting: false});
                                        }}
                                    />}
                                </>
                            )} />
                            
                            <DialogActions>
                                <CompleteButton onClick={this.handleClose}>
                                    Complete
                                </CompleteButton>
                            </DialogActions>
                        </ExpressionValueSlotEditor>
                    </ReactDraggable>
                </ClickAwayListener>
            )
            : <></>
        );
    }

    renderHeader() {
        return (

            <Header className="config-form-header">
                <span>
                    Edit Expression Value
                </span>
                <HeaderFloatRight>
                    {
                        (this.props.expressionValue.editContext?.getParentExpressionValue(this.props.expressionValue._id) && !this.state.inserting) &&
                            <ExpressionHeaderButton onClick={() => {
                                let parent = this.props.expressionValue.editContext?.getParentExpressionValue(this.props.expressionValue._id)
                                if (parent) {
                                    this.props.expressionValue.editContext?.setSelection(parent._id);
                                }
                            }}>
                                Select Parent
                            </ExpressionHeaderButton>
                    }
                    {
                        (!this.state.inserting && this.props.expressionValue.valueType !== ExpressionValueType.UNSET) &&
                            <ExpressionHeaderButton
                                onClick={() => {
                                    this.setState({inserting: true})
                                }}
                            >
                                Insert Expression
                            </ExpressionHeaderButton>
                    }
                </HeaderFloatRight>
            </Header>
        );
    }


    renderPage() {
        switch (this.props.expressionValue.valueType) {
            case ExpressionValueType.SUBEXPRESSION:
                return (
                    <>
                        <ModeButtons value={this.props.expressionValue}/>
                        {
                            // no expression, render the toolbox
                            !this.props.expressionValue.subExpression && (
                                <ToolboxPanel
                                    large={false}
                                    expressionValue={this.props.expressionValue}
                                    onExpressionSelected={(registration: RegistrationData) => {
                                        let exp = new registration.prototype.constructor() as BaseExpression;
                                        this.props.expressionValue.subExpression = exp;
                                        this.props.expressionValue.editContext?.refresh();
                                    }}
                                />
                            )
                        }
                        {
                            // has expression, render expression page
                            this.props.expressionValue.subExpression && (
                                this.renderExpressionPanel()
                            )
                        }
                    </>
                );
            case ExpressionValueType.VARIABLE:
                return (
                    <>
                        <ModeButtons value={this.props.expressionValue}/>
                        <VariableOrValContentPanel>
                            <TextField
                                label="Variable Name"
                                value={this.props.expressionValue.variableName || ''}
                                onChange={this.variableNameChange}
                                autoFocus
                            />
                        </VariableOrValContentPanel>
                    </>
                );
            case ExpressionValueType.VALUE:
                return (
                    <>
                        <ModeButtons value={this.props.expressionValue}/>
                        <VariableOrValContentPanel>
                            {this.renderValueControl()}
                        </VariableOrValContentPanel>
                    </>
                );
            case ExpressionValueType.UNSET:
                return (
                    <>
                        <ModeButtons value={this.props.expressionValue}/>
                        <ExpressionColContainer>
                            <ExpressionColumn>
                                <ExpressionColumnRow>
                                    {
                                        ExpressionRegistration.getCommonExpressions().splice(0, 20).map((expression, key) => (
                                            <div>
                                                <AddExpressionButton
                                                    expression={this.props.expressionValue}
                                                    hideLabel={true}
                                                    key={key}
                                                    registration={expression}
                                                    onClick={() => {
                                                        let exp = new expression.prototype.constructor() as BaseExpression;
                                                        this.props.expressionValue.subExpression = exp;
                                                    }}
                                                />
                                            </div>
                                        ))
                                    }
                                </ExpressionColumnRow>
                            </ExpressionColumn>
                            <VariableOrValColumn>
                                <TextField
                                    value={this.props.expressionValue.variableName || ''}
                                    label="Variable Name"
                                    onFocus={() => {
                                        this.props.expressionValue.valueType = ExpressionValueType.VARIABLE;
                                    }}
                                />
                            </VariableOrValColumn>
                            <VariableOrValColumn>
                                <TextField
                                    value={this.props.expressionValue.value || ''}
                                    label="Value"
                                    variant="outlined"
                                    onFocus={() => {
                                        this.props.expressionValue.valueType = ExpressionValueType.VALUE;
                                    }}
                                />
                            </VariableOrValColumn>
                            <ExpressionColumn>
                                <ExpressionColumnShowMoreButton
                                    onClick={() => {
                                        this.props.expressionValue.valueType = ExpressionValueType.SUBEXPRESSION;
                                    }}
                                >
                                    Show More
                                </ExpressionColumnShowMoreButton>
                            </ExpressionColumn>
                        </ExpressionColContainer>
                    </>
                );
        }
    }


    renderValueControl() {
        switch (this.props.expressionValue.expectedType) {
            case ExpressionExpectedType.BOOLEAN:
                return (
                    <PropertyEditorBoolean
                        editObject={this.props.expressionValue}
                        propertyName="value"
                        updateCallback={this.valueChange}
                    />
                );

            case ExpressionExpectedType.NUMBER:
                return <PropertyEditorInteger
                    label="Value"
                    editObject={this.props.expressionValue}
                    propertyName="value"
                    updateCallback={this.valueChange}
                    autoFocus
                    variant="outlined"
                />

            case ExpressionExpectedType.NUMBER_LIST:
                return <PropertyEditorNumberList
                    label="Value"
                    editObject={this.props.expressionValue}
                    propertyName="value"
                    updateCallback={this.valueChange}
                    autoFocus
                />

            case ExpressionExpectedType.STRING:
                return <PropertyEditorText
                    label="Value"
                    editObject={this.props.expressionValue}
                    propertyName="value"
                    updateCallback={this.valueChange}
                    autoFocus
                />

            case ExpressionExpectedType.STRING_LIST:
                return <PropertyEditorTextList
                    label="Value"
                    editObject={this.props.expressionValue}
                    propertyName="value"
                    updateCallback={this.valueChange}
                    autoFocus
                />

            case ExpressionExpectedType.DATE:
                return <PropertyEditorDate 
                    label="Value"
                    editObject={this.props.expressionValue}
                    propertyName="value"
                    updateCallback={this.valueChange}
                    autoFocus
                />

            case ExpressionExpectedType.DATE_LIST:
                return <PropertyEditorDateList 
                    label="Value"
                    editObject={this.props.expressionValue}
                    propertyName="value"
                    updateCallback={this.valueChange}

                />
        }
        return (
            <>todo</>
        );
    }

    @AutoBind
    private handleClose() {
        this.props.expressionValue.editContext?.clearSelection();

        switch (this.props.expressionValue.valueType) {
            case (ExpressionValueType.VARIABLE) :
                if (!this.props.expressionValue.variableName)
                    this.props.expressionValue.valueType = ExpressionValueType.UNSET;
                break;
            case (ExpressionValueType.VALUE) :
                if (this.props.expressionValue.value === null || this.props.expressionValue.value === undefined)
                    this.props.expressionValue.valueType = ExpressionValueType.UNSET;
                break;
            case (ExpressionValueType.SUBEXPRESSION) :
                if (!this.props.expressionValue.subExpression)
                    this.props.expressionValue.valueType = ExpressionValueType.UNSET;
                break;

        }

        this.props.expressionValue.editContext?.clearSelection();
        this.props.expressionValue.editContext?.refresh();
    }

    @AutoBind
    private onSelectParent() {
        this.props.expressionValue.editContext?.selectParent(this.props.expressionValue._id);
    }

    @AutoBind
    private insertExpression() {
        // pick expression, pick what slot in expression you are.

    }

    @AutoBind
    private variableNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.expressionValue.variableName = event.target.value;
        this.forceUpdate();
    }

    @AutoBind
    private valueChange() {
        this.forceUpdate();
    }

    private renderExpressionPanel() {
        let type = Reflect.get(Reflect.get(this.props.expressionValue.subExpression!, '__proto__'), '__type');
        return (
            <>
                {
                    this.props.expressionValue.subExpression
                    ? <ExpressionViewPanel>
                        <ExpressionViewPanelLine>
                            <Button
                                startIcon={<BackIcon />}
                                onClick={() => this.props.expressionValue.subExpression = undefined}
                            >{ExpressionRegistration.getExpressionByType(type)?.name}</Button>
                        </ExpressionViewPanelLine>
                        <ExpressionViewPanelLineCenter>
                            {this.props.expressionValue.subExpression?.render()}
                        </ExpressionViewPanelLineCenter>
                        <ExpressionViewPanelLineBottom>
                            <FloatRight>
                                <ExpressionClearButton
                                    onClick={() => {
                                        this.props.expressionValue.subExpression = undefined;
                                        this.props.expressionValue.valueType = ExpressionValueType.UNSET;
                                    }}
                                >
                                    Clear Expression
                                </ExpressionClearButton>
                            </FloatRight>
                        </ExpressionViewPanelLineBottom>
                    </ExpressionViewPanel>
                    : <></>
                }
            </>
            
        );
    }

}


const ToolboxPanelSideBar = styled.div`
    width: 132px;

    > * {
        margin-bottom: 4px;
    }
`;

const ToolboxPanelContent = styled.div`
    flex: 1;
`;

const ToolboxPanelSearchInput = styled(Input)`
    && {
        padding: 8px 14px;
        background: #F7FBFD;
        border: 1px solid #EBF4FA;
        border-radius: 4px;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #93A9BF;

        &::before {
            content: '';
            display: none;
        }

        .MuiInputBase-input {
            padding: 0;
        }
    }

`;

const ToolboxPanelHideLabels = styled(FormControlLabel)`
    && {
        margin-left: 0;
        margin-right: 0;
        .MuiTypography-root {
            font-family: Mulish;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 20px;
            color: #1D6295;
        }
        .MuiButtonBase-root {
            padding: 0;

        }

        .MuiSvgIcon-root {
            width: 16px;
            height: 16px;
            color: #D8E4EE;
        }
    }
`;

const ToolboxTabPanel = styled(TabPanel)`
    && {
        padding: 0;
        height: 340px;
        overflow: auto;
    }
`;

const ToolboxTabs = styled.div`
    border: 1px solid #EBF4FA;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 0 0;

    > label {
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 9px;
        line-height: 16px;
        color: #93A9BF;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding: 8px 16px;
        display: block;
    }

    .MuiTabs-indicator {
        display: none;
    }

    .MuiButtonBase-root {
        min-width: auto;
        width: 100%;
        padding: 8px 16px;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        text-transform: unset;
        
        display: flex;
        align-items: center;
        color: #677C95;
        &.Mui-selected {
            background: #D8E4EE;
            color: #4B6080;
        }

        .MuiTab-wrapper {
            display: block;
            text-align: left;
        }
    }

`;

const ExpressionRow = styled("div")<{hideLabels: boolean}>`
    margin: ${props => props.hideLabels ? '-6px 0 -6px 8px' : '-4px 0 -4px 8px'} ;
`;

const ToolboxPanel = function (props : {
        large: boolean,
        expressionValue: ExpressionValue,
        onExpressionSelected : (registration: RegistrationData) => void}) {

    const [selectedCategory, setSelectedCategory] = useState<string>('Common');
    const [search, setSearch] = useState<string>('');
    const [hideLabels, setHideLabels] = useState<boolean>(false);

    const onChangeTab = (_event: any, newValue: string) => {
        setSelectedCategory(newValue);
    }

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const onChangeHideLabels = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHideLabels(event.target.checked);
    }

    let expressionCategories = ExpressionRegistration.getCategories();

    return (
        <ToolboxPage>
            <TabContext value={selectedCategory}>
                <ToolboxPanelSideBar>
                    <ToolboxPanelSearchInput
                        value={search}
                        disableUnderline
                        onChange={onChangeSearch}
                        placeholder="Search"
                        startAdornment={(
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )}
                    />

                    <ToolboxPanelHideLabels
                        control={<Checkbox checked={hideLabels} onChange={onChangeHideLabels} name="label" color="primary" />}
                        label="Hide Labels"
                    />

                    <ToolboxTabs>
                        <label>
                            Categories
                        </label>
                        <TabList
                            orientation={'vertical'}
                            onChange={onChangeTab}
                        >
                            <Tab value={"Common"} label={"Common"} />
                            {
                                expressionCategories.map((category) => {
                                    return <Tab value={category} key={category} label={category} />
                                })
                            }
                        </TabList>
                    </ToolboxTabs>

                </ToolboxPanelSideBar>
                <ToolboxPanelContent>
                    <ToolboxTabPanel value={"Common"}>
                        <ExpressionRow hideLabels={hideLabels}>
                            {
                                ExpressionRegistration.getCommonExpressions().map((value: RegistrationData, index: number) => (
                                    <AddExpressionButton
                                        expression={props.expressionValue}
                                        registration={value}
                                        hideLabel={hideLabels}
                                        key={"regitem" + index}
                                        onClick={(registration: RegistrationData) => {
                                            props.onExpressionSelected(registration);
                                        }
                                    }/>
                                ))
                            }
                        </ExpressionRow>
                    </ToolboxTabPanel>
                    {
                        expressionCategories.map((category) => {
                            let c = ExpressionRegistration.getExpressionsByCategory(category);
                            return <ToolboxTabPanel value={category} key={category}>
                                <ExpressionRow hideLabels={hideLabels}>
                                    {
                                        c.map((value: RegistrationData, index: number) => (
                                            <AddExpressionButton
                                                expression={props.expressionValue}
                                                registration={value}
                                                hideLabel={hideLabels}
                                                key={"regitem" + index}
                                                onClick={(registration: RegistrationData) => {
                                                    props.onExpressionSelected(registration);
                                                }
                                            }/>
                                        ))
                                    }
                                </ExpressionRow>
                            </ToolboxTabPanel>
                        })
                    }
                </ToolboxPanelContent>
            </TabContext>
        </ToolboxPage>
    );
}


const InsertExpressionPage = function (props: {expressionValue: ExpressionValue, onComplete : () => void}) {
    const [selectedExpression, setSelectedExpression] = useState<BaseExpression | undefined>(undefined);
    const [step2, setStep2] = useState(false);

    const handleSelection = useCallback((selected: string) => {
        console.log('handling selection');

        console.log(selectedExpression);
        console.log(step2);

        if (selectedExpression) {
            let ev = selectedExpression.editContext?.getElement(selected) as ExpressionValue;

            if (!ev)
                throw 'could not find expression value';

            switch(props.expressionValue.valueType) {
                case ExpressionValueType.SUBEXPRESSION:
                    ev.subExpression = props.expressionValue.subExpression;
                    break;
                case ExpressionValueType.VALUE:
                    ev.value = props.expressionValue.value;
                    break;
                case ExpressionValueType.VARIABLE:
                    ev.variableName = props.expressionValue.variableName;
                    break;
            }

            props.expressionValue.subExpression = selectedExpression;
            props.expressionValue.editContext?.setSelection(props.expressionValue._id);

            props.onComplete();
        }

    }, [step2, selectedExpression, props])

    function handleButtonClick(registration: RegistrationData) {
        let exp = new registration.prototype.constructor() as BaseExpression;

        let context = new ExpressionEditContext();
        context.emptyExpressionText = 'Select';
        exp.setEditContextWithoutRegister(context) ;
        setSelectedExpression(exp);
        setStep2(true);
    }

    useEffect(() => {
        if (selectedExpression && selectedExpression.editContext) {
            selectedExpression.editContext.onSelection = handleSelection;
        }
    }, [selectedExpression, handleSelection])


    if (!step2) {
        return (
            <InsertExpressionViewPanel>
                <InsertExpressionViewPanelLine>Insert Expression - step 1, select expression</InsertExpressionViewPanelLine>
                {
                    <ToolboxPanel
                        large={false}
                        expressionValue={props.expressionValue}
                        onExpressionSelected={handleButtonClick}
                    />
                }
            </InsertExpressionViewPanel>
        );
    } else {

        return (
            <InsertExpressionViewPanel>
                <InsertExpressionViewPanelLine>
                    Insert Expression - step 2, pick slot
                </InsertExpressionViewPanelLine>
                <InsertExpressionViewPanelLineCenter>
                    {selectedExpression!.render()}
                </InsertExpressionViewPanelLineCenter>
            </InsertExpressionViewPanel>
        );
    }
}

const AddExpressionButton = function (props: {registration: RegistrationData, expression: ExpressionValue, onClick : (registration: RegistrationData) => void, hideLabel: boolean}) {

    return (
        <Tooltip title={props.registration.name}>
            <ToolboxItem hideLabel={props.hideLabel} onClick={() => {
                props.onClick(props.registration)
            }}>
                {props.registration.icon}
                {
                    !props.hideLabel && <ToolboxItemText>
                        {props.registration.name}
                    </ToolboxItemText>
                }
            </ToolboxItem>
        </Tooltip>
    );
}

const Buttons = styled.div`
    display: flex;
    width: 100%;
    padding-right: 10px;
    padding-left: 10px;
`;

const SelectedButton = styled.div`
    border-bottom: 2px solid #1D6295;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;

    .MuiButtonBase-root {
        width: 100%;
        padding: 12px 0;
        color: #1D6295;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
    }
`;

const NotSelectedButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    color: #677C95;
    border-bottom: 2px solid #EBF4FA;

    .MuiButtonBase-root {
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        padding: 12px 0;
        color: #677C95;
        width: 100%;
    }
`;


const ModeButtons = function (props: {value: ExpressionValue}) {
    return (
        <Buttons>
            <ExpressionButton value={props.value}/>
            <VariableButton value={props.value}/>
            <ValueButton value={props.value}/>
        </Buttons>
    );
}


const ExpressionButton = function (props: {value: ExpressionValue}) {
    function handleClick() {
        props.value.valueType = ExpressionValueType.SUBEXPRESSION;
        // props.value.editContext?.refresh();
    }

    if (props.value.valueType === ExpressionValueType.SUBEXPRESSION) {
        return (
            <SelectedButton>
                <Button>Pick Expression</Button>
            </SelectedButton>
        );
    }
    else {
        return (
            <NotSelectedButton>
                <Button onClick={handleClick}>Pick Expression</Button>
            </NotSelectedButton>
        );
    }
}

const VariableButton = function (props: {value: ExpressionValue}) {
    function handleClick() {
        props.value.valueType = ExpressionValueType.VARIABLE;
        // props.value.editContext?.refresh();
    }

    if (props.value.valueType === ExpressionValueType.VARIABLE) {
        return (
            <SelectedButton>
                <Button >Pick/Define Variable</Button>
            </SelectedButton>
        );
    }
    else {
        return (
            <NotSelectedButton>
                <Button onClick={handleClick}>Pick/Define Variable</Button>
            </NotSelectedButton>
        );
    }
}

const ValueButton = function (props: {value: ExpressionValue}) {
    function handleClick() {
        props.value.valueType = ExpressionValueType.VALUE;
        props.value.editContext?.refresh();
    }

    if (props.value.valueType === ExpressionValueType.VALUE) {
        return (
            <SelectedButton>
                <Button>Enter Value</Button>
            </SelectedButton>
        );
    }
    else {
        return (
            <NotSelectedButton>
                <Button onClick={handleClick}>Enter Value</Button>
            </NotSelectedButton>
        );
    }
}