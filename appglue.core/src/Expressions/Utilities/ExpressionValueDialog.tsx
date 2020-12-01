import React, {useState, useCallback, useEffect} from "react";
import {ExpressionValue} from "../ExpressionValue";
import {Button, ClickAwayListener, DialogActions, List, ListItem, ListItemText, TextField} from "@material-ui/core";
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

const ExpressionValueSlotEditor = styled.div`
  font-family: Mulish;
  font-size: 16px;
  position: absolute;
  border: 2px solid gray;
  border-radius: 4px;
  background: #fff;
  width: 650px;
  z-index: 101;
  top: 30px;
  left: -50px;
  max-height: none;
`;
// position: relative;
// overflow: auto;
//  overflow: auto;


const Header = styled.div`
  font-family: Mulish;
  font-size: 20px;
  display: flex;
  float: left;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  margin-bottom: 20px;
  margin-bottom: 10px;
`;

const HeaderFloatRight = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  padding-right: 15px;
`;

const NoSelectionColDiv = styled.div`
  float: left;
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
  float: left;
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
  height : 250px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  clear: both;
`;

const ExpressionViewPanelLine = styled.div`
  width : 100%;
  justify-content: flex-start;
  clear: both;
  padding-top: 20px;
  padding-bottom: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;

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
  padding-top: 15px;
  padding-bottom: 15px;
  border: 1px solid lightgray;
  border-radius: 5px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
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
    padding-left: 10px;
    padding-right: 10px;
    height : 250px;
    align-content: flex-start;
`;

const ToolboxItem = styled.div`
   display: flex;
   float : left;
   border: 1px solid gray;
   margin: 5px;
   padding: 5px;
   width: calc(25% - 10px);
`;
//   width: calc(25% - 10px);

const ToolboxItemText = styled.div`
   display: flex;
   float : left;
   margin-left: 13px;
   font-family: Mulish;
   font-size: 14px;
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
             (
                this.props.expressionValue.editContext?.getSelection() && (
                    <ClickAwayListener
                        onClickAway={this.handleClose} >
                        <ReactDraggable
                            handle=".config-form-header"
                        >

                            <ExpressionValueSlotEditor >
                                {this.renderHeader()}
                                {!this.state.inserting && this.renderPage()}
                                {this.state.inserting && <InsertExpressionPage
                                    expressionValue={this.props.expressionValue}
                                    onComplete={() => {
                                        this.setState({inserting: false});
                                    }}
                                />}
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Complete
                                    </Button>
                                </DialogActions>
                            </ExpressionValueSlotEditor>
                        </ReactDraggable>
                    </ClickAwayListener>
                )
            )
        );
    }

    renderHeader() {
        return (

            <Header className="config-form-header">
                Edit Expression Value
                <HeaderFloatRight>
                    {
                        (this.props.expressionValue.editContext?.getParentExpressionValue(this.props.expressionValue._id) && !this.state.inserting) &&
                            <Button variant={"outlined"} onClick={() => {
                                let parent = this.props.expressionValue.editContext?.getParentExpressionValue(this.props.expressionValue._id)
                                if (parent) {
                                    this.props.expressionValue.editContext?.setSelection(parent._id);
                                    this.props.expressionValue.editContext?.refresh();
                                }
                            }}>
                                Select Parent
                            </Button>
                    }
                    {
                        (!this.state.inserting && this.props.expressionValue.valueType !== ExpressionValueType.UNSET) &&
                            <Button
                                variant={"outlined"}
                                onClick={() => {
                                    this.setState({inserting: true})
                                }}
                            >
                                Insert Expression
                            </Button>
                    }
                    <CloseSharp onClick={() => {
                        this.props.expressionValue.editContext?.clearSelection();
                        this.props.expressionValue.editContext?.refresh();
                    }} />
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
                            <TextField autoFocus label={'variable name'} variant={'outlined'} value={this.props.expressionValue.variableName}
                                       onChange={this.variableNameChange}/>
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
                                <Button
                                    variant={"outlined"}
                                    startIcon={<SearchOutlined fontSize={'small'} />}
                                    onClick={() => {
                                    this.props.expressionValue.valueType = ExpressionValueType.SUBEXPRESSION;
                                    this.props.expressionValue.editContext?.refresh();
                                }}>Add Expression</Button>
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
                return <TextField autoFocus label={'value'} value={this.props.expressionValue.value} onChange={this.valueChange}
                                  variant={'outlined'} inputMode={'decimal'}/>
            case ExpressionExpectedType.STRING:
                return <TextField autoFocus label={'value'} value={this.props.expressionValue.value} onChange={this.valueChange}
                                  variant={'outlined'}/>
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


const ToolboxPanel = function (props : {
        large: boolean,
        expressionValue: ExpressionValue,
        onExpressionSelected : (registration: RegistrationData) => void}) {

    return (
        <ToolboxPage >
            {Object.values(ExpressionRegistration).map((value: RegistrationData, index: number) => {
                return <AddExpressionButton
                    expression={props.expressionValue}
                    registration={value}
                    key={"regitem" + index}
                    onClick={(registration: RegistrationData) => {
                        props.onExpressionSelected(registration);
                    }
                    }/>
            })}
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
            props.expressionValue.editContext?.setSelection(selectedExpression._id);

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

const AddExpressionButton = function (props: {registration: RegistrationData, expression: ExpressionValue, onClick : (registration: RegistrationData) => void}) {

    return (
        <ToolboxItem onClick={() => {
            props.onClick(props.registration)
        }}>
            {props.registration.icon}
            <ToolboxItemText>
                {props.registration.name}
            </ToolboxItemText>
        </ToolboxItem>
    );
}

const Buttons = styled.div`
    display: flex;
    float: left;
    width: 100%;
    padding-right: 10px;
    padding-left: 10px;
`;

const SelectedButton = styled.div`
    border-bottom: 2px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
`;

const NotSelectedButton = styled.div`
    display: flex;
      justify-content: center;
      align-items: center;
    width: 33%;
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
        props.value.editContext?.refresh();
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
        props.value.editContext?.refresh();
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