import React from "react";
import {ExpressionValue} from "./ExpressionValue";
import {ExpressionValueType} from "./ExpressionValueType";
import styled from "styled-components";
import {AutoBind} from "../Common/AutoBind";
import {ExpressionValueDialog} from "./Utilities/ExpressionValueDialog";


const SelectedElement = styled.span`
  float: left;
  display: flex;
  align-items: center;
  border: 1px solid #15466B;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: #DCEAF5;
  padding-top: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  margin-right: 5px;
  margin-left: 5px;
`;

const SelectedExpression = styled.span`
  display: flex;
  align-items: center;
  border: 1px solid #15466B;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: #DCEAF5;
  padding-top: 8px;
  padding-right: 0px;
  padding-bottom: 8px;
  padding-left: 0px;
  margin-right: 0px;
  margin-left: 0px;
  position: relative;
  overflow: visible;
`;

const SelectedExpressionWrapperDiv = styled.div`
    position: relative;
    overflow: visible;
`;

const ValueElement = styled.div`
  float: left;
  display: flex;
  align-items: center;
  border: 2px solid white;
  border-radius: 5px;
  background-color: #e9e9ed;
  padding-top: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  display: inline;
  margin-right: 5px;
  margin-left: 5px;
   &:hover {
      border: 2px solid #1873B9;
      border-radius: 5px;
      background-color: white;
  }
`;

const VariableElement = styled.div`
  float: left;
  display: flex;
  align-items: center;
  border-bottom: 3px dashed darkgray;
  padding-top: 3px;
  padding-right: 3px;
  padding-bottom: 1px;
  padding-left: 3px;
  display: inline;
  margin-right: 5px;
  margin-left: 5px;
   &:hover {
      border-bottom: 2px solid #1873B9;
  }
`;

const InnerValueDiv = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  display: flex;
`;


const MissingElement = styled.span`
  float: left;
  display: flex;
  align-items: center;
  border: 1px solid #E6E9ED;
  box-sizing: border-box;
  border-radius: 3px;  
  padding-top: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  margin-right: 5px;
  margin-left: 5px;
  &:hover {
      border: 1px solid #1873B9;
      border-radius: 5px;
      background-color: white;
  }
`;

const MissingTextDiv = styled.div`
    color: red;
    padding-left: 20px;
    padding-right: 20px;
`;


export class ExpressionValueRenderer extends React.Component<{ el: ExpressionValue }> {



    @AutoBind
    handleClick() {
        this.props.el.editContext?.setSelection(this.props.el._id);
    }


    render() {
        let el = this.props.el;

        let selected = false;

        if (this.props.el.editContext?.getSelection()) {
            selected = this.props.el.editContext?.getSelection() === this.props.el._id;
        }

        if (!selected) {
            if (this.props.el.valueType === ExpressionValueType.VARIABLE) {
                return <VariableElement
                    onClick={this.handleClick}
                >
                    <i>
                        {el.variableName ?? this.renderMissingElement()}
                    </i>
                </VariableElement>
            } else if (el.valueType === ExpressionValueType.VALUE) {
                return <ValueElement
                    onClick={this.handleClick}
                >
                    {!el.value ? this.renderMissingElement() : <InnerValueDiv>{el.value}</InnerValueDiv>}
                </ValueElement>
            } else if (this.props.el.valueType === ExpressionValueType.SUBEXPRESSION) {
                return <>{this.props.el.subExpression?.render()}</>
            } else {
                // FOR: this.props.el.valueType === ExpressionValueType.UNSET
                return <MissingElement
                    onClick={this.handleClick}>
                    <>{this.renderMissingElement()}</>
                </MissingElement>
            }

        } else {
            if (this.props.el.valueType === ExpressionValueType.VARIABLE) {
                return ( <SelectedExpressionWrapperDiv>
                    <SelectedElement
                        onClick={this.handleClick}
                    >
                        {el.variableName ?? this.renderMissingElement()}
                    </SelectedElement>
                    <ExpressionValueDialog expressionValue={this.props.el}/>
                </SelectedExpressionWrapperDiv>
                );
            } else if (el.valueType === ExpressionValueType.VALUE) {
                return ( <SelectedExpressionWrapperDiv>
                    <SelectedElement
                        onClick={this.handleClick}
                    >
                        {el.value ?? this.renderMissingElement()}
                    </SelectedElement>
                    <ExpressionValueDialog expressionValue={this.props.el}/>
                </SelectedExpressionWrapperDiv>
                );
            } else if (this.props.el.valueType === ExpressionValueType.SUBEXPRESSION) {
                return (
                    <SelectedExpression>
                        {this.props.el.subExpression?.render() ?? this.renderMissingElement()}
                        <ExpressionValueDialog expressionValue={this.props.el}/>
                    </SelectedExpression>
                );
            } else {
                // FOR: this.props.el.valueType === ExpressionValueType.UNSET
                return(
                    <SelectedExpressionWrapperDiv>
                        <SelectedElement
                            onClick={this.handleClick}>
                            <>{this.renderMissingElement()}</>
                        </SelectedElement>
                        <ExpressionValueDialog expressionValue={this.props.el}/>
                    </SelectedExpressionWrapperDiv>
                );
            }

        }


    }

    renderMissingElement() {
        let text = this.props.el.editContext?.emptyExpressionText ?? 'Click To Edit';
        switch (this.props.el.valueType) {
            case ExpressionValueType.SUBEXPRESSION:
                text = 'Pick Expression'
                break;
            case ExpressionValueType.VARIABLE:
                text = 'Enter Variable'
                break;
            case ExpressionValueType.VARIABLE:
                text = 'Enter Value'
                break;
        }

        return (
            <MissingTextDiv>{text}</MissingTextDiv>
        );
    }
}

