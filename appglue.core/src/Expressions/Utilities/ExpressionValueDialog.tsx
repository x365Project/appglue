import React, {useState, useCallback, useEffect} from "react";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
    Button,
    ClickAwayListener,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    TextField,
    Tab,
    InputAdornment,
    Input,
    FormControlLabel,
    Checkbox,
    InputLabel,
    FormControl
} from "@material-ui/core";
import {ExpressionValue} from "../ExpressionValue";
import {ExpressionValueType} from "../ExpressionValueType";
import {ExpressionRegistration, RegistrationData} from "./RegisterExpression";
import {ExpressionExpectedType} from "../ExpressionExpectedType";
import {Switch} from "mdi-material-ui";
import {AutoBind} from "../../Common/AutoBind";
import styled from "styled-components";
import {BaseExpression} from "../BaseExpression";
import ReactDraggable from "react-draggable";
import {CloseSharp, SearchOutlined} from "@material-ui/icons";
import {FloatRight} from "../ExpressionElements/Logic/IfThenExpression";
import {ExpressionLineDiv, ExpressionPiece} from "../ExpressionStyles";
import {ExpressionEditContext} from "./ExpressionEditContext";
import {SearchIcon} from "../../CommonUI/Icon/SearchIcon";
import { ObserveState } from "../../CommonUI/StateManagement/ObserveState";

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
// position: relative;
// overflow: auto;
//  overflow: auto;


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
    clear: both;
`;

const ExpressionViewPanel = styled.div`
    margin-top: 50px;
    width : 100%;
    max-height : 376px;
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
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    padding-bottom: 15px;
`;

const ExpressionViewPanelLineBottom = styled.div`
  width : 100%;
  justify-content: flex-start;
  margin: auto;
  clear: both;
  padding-top: 15px;
  padding-bottom: 5px;
  
`;

const ExpressionViewPanelLineCenter = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  clear: both;
  padding: 15px;
  border: 1px solid lightgray;
  border-radius: 5px;
  flex: 1;
  overflow: auto;
  width: 100%;
`;


const VariableOrValColumn = styled.div`
    border-left: 1px solid gray;
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

const ExpressionColumnRow = styled.div`
    margin: -4px;
    display: flex;
    flex-wrap: wrap;
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


const VariableInput = styled.div`
    .MuiInput-root {
        border: 1px solid #D8E4EE;
        box-sizing: border-box;
        border-radius: 4px;
        font-family: Mulish;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #677C95;
        padding: 6px 12px;
    }

    > label {
        display: block;
        font-family: Mulish;
        font-style: normal;
        font-weight: bold;
        font-size: 9px;
        line-height: 16px;

        color: #677C95;
        margin-bottom: 4px;
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
                            <VariableInput>
                                <label>
                                    Variable Name
                                </label>
                                <Input
                                    autoFocus
                                    disableUnderline
                                    value={this.props.expressionValue.variableName}
                                    onChange={this.variableNameChange}
                                />
                            </VariableInput>
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
                                        Object.entries(ExpressionRegistration).map(([key, expression]) => (
                                            <AddExpressionButton
                                                expression={this.props.expressionValue}
                                                registration={expression}
                                                hideLabel={true}
                                                key={key}
                                                onClick={() => {
                                                    this.props.expressionValue.valueType = ExpressionValueType.SUBEXPRESSION;
                                                }}
                                            />
                                        ))
                                    }
                                </ExpressionColumnRow>
                            </ExpressionColumn>
                            <VariableOrValColumn>
                                <TextField label={'variable'} helperText={'Enter Variable Name'} variant={"standard"}
                                           onFocus={() => {
                                               this.props.expressionValue.valueType = ExpressionValueType.VARIABLE;
                                               this.props.expressionValue.editContext?.refresh();
                                           }}/>
                            </VariableOrValColumn>
                            <VariableOrValColumn>
                                <TextField label={'value'} variant={"outlined"} helperText={'Enter Value'} onFocus={() => {
                                    this.props.expressionValue.valueType = ExpressionValueType.VALUE;
                                    this.props.expressionValue.editContext?.refresh();
                                }}/>
                            </VariableOrValColumn>
                        </ExpressionColContainer>
                    </>
                );
        }
    }


    renderValueControl() {
        switch (this.props.expressionValue.expectedType) {
            case ExpressionExpectedType.BOOLEAN:
                return (
                    <Switch/>
                );
            case ExpressionExpectedType.NUMBER:
                return <VariableInput>
                    <label>Value</label>
                    <Input autoFocus value={this.props.expressionValue.value} onChange={this.valueChange} disableUnderline inputMode="decimal" />
                </VariableInput>
            case ExpressionExpectedType.STRING:
                return <VariableInput>
                    <label>Value</label>
                    <Input autoFocus value={this.props.expressionValue.value} onChange={this.valueChange} disableUnderline />
                </VariableInput>
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
                if (!this.props.expressionValue.value)
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
    private valueChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.expressionValue.value = event.target.value;
        this.forceUpdate();
    }

    private renderExpressionPanel() {
        return (
            <ExpressionViewPanel>
                <ExpressionViewPanelLine>Edit Expression:</ExpressionViewPanelLine>
                <ExpressionViewPanelLineCenter>
                    {this.props.expressionValue.subExpression?.render()}
                </ExpressionViewPanelLineCenter>
                <ExpressionViewPanelLineBottom>
                    <FloatRight><Button variant={'outlined'}>Clear Expression</Button></FloatRight>
                </ExpressionViewPanelLineBottom>
            </ExpressionViewPanel>
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

    const [selectedCategory, setSelectedCategory] = useState<string>('Logic');
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

    const expressionsByCategory = Object.values(ExpressionRegistration).reduce((obj : {[key: string]: RegistrationData[]}, current) => {
        if (!obj[current.category]) {
            obj[current.category] = [];
        }
        obj[current.category].push(current);
        return obj
    }, {});

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
                            {
                                Object.keys(expressionsByCategory).map((category) => {
                                    return <Tab value={category} key={category} label={category} />
                                })
                            }
                        </TabList>
                    </ToolboxTabs>

                </ToolboxPanelSideBar>
                <ToolboxPanelContent>
                    {
                        Object.entries(expressionsByCategory).map(([category, c]) => {
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
            <>
                Insert Expression - step 1, select expression
                {
                    <ToolboxPanel
                        large={false}
                        expressionValue={props.expressionValue}
                        onExpressionSelected={handleButtonClick}
                    />
                }
            </>
        );
    } else {

        return (
            <div>
                <div>
                    Insert Expression - step 2, pick slot
                </div>

                <div>
                    {selectedExpression!.render()}
                </div>

            </div>
        );
    }
}

const AddExpressionButton = function (props: {registration: RegistrationData, expression: ExpressionValue, onClick : (registration: RegistrationData) => void, hideLabel: boolean}) {

    return (
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