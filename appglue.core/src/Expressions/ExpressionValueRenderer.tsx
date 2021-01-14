import React from "react";
import {ExpressionValue} from "./ExpressionValue";
import {ExpressionValueType} from "./ExpressionValueType";
import styled from "styled-components";
import {AutoBind} from "../Common/AutoBind";
import {ExpressionValueDialog} from "./Utilities/ExpressionValueDialog";
import { ObserveState } from "../CommonUI/StateManagement/ObserveState";
import { ExpressionExpectedType } from "./ExpressionExpectedType";


const SelectedElement = styled.span`
    display: flex;
    align-items: center;
    border: 1px solid #15466B;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: #DCEAF5;
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

    margin-right: 0px;
    margin-left: 0px;
    position: relative;
    overflow: visible;
    flex: 1;
`;

const ExpressionValueWrapper = styled.div`
    position: relative;
    overflow: visible;
    flex: 1;
    padding-right: 8px;
    padding-left: 4px;
    display: flex;
`;

const ValueElement = styled.div`
    display: inline-flex;
    align-items: center;
    border: 2px solid white;
    border-radius: 4px;
    background-color: #D8E4EE;
    color: #4B6080;
    margin-right: 5px;
    margin-left: 5px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    transition: all .3s;

    &:hover {
        border: 2px solid #D8E4EE;
        border-radius: 5px;
        background-color: white;
    }
`;

const VariableElement = styled.div`
    display: flex;
    align-items: center;                                                                         
    padding: 3px 0;
    display: flex;
    margin-right: 4px;
    margin-left: 4px;
    height: 40px;
    cursor: pointer;

    > i {
        font-size: 14px;
        line-height: 24px;
        display: block;
        border-bottom: dotted 1px #93A9BF; 
        color: #677C95;
    }

    &:hover {
        > i {
            border-bottom: solid 2px #93A9BF; 
        }
    }
`;

const InnerValueDiv = styled.div`
    padding: 4px 8px;
    display: flex;
`;


const MissingElement = styled.span`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 3px;  
    
    margin-right: 5px;
    margin-left: 5px;
`;

const MissingTextDiv = styled("div")<{error?: boolean}>`
    color: ${props => props.error ? 'red' : '#1D6295'};
    padding: 4px 12px;
    font-family: Mulish;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.05em;
    background: #fff;
    border: 1px solid #1D6295;
    box-sizing: border-box;
    border-radius: 4px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        background: #1D6295;
        border-color: #fff;
        color: #fff;
    }
`;


const TextDiv = styled("div")<{error?: boolean}>`
    padding: 4px 8px;
    font-family: Mulish;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${props => props.error ? 'red' : '#4B6080'};
`;

export class ExpressionValueRenderer extends React.Component<{ el: ExpressionValue }> {



    @AutoBind
    handleClick() {
        this.props.el.editContext?.setSelection(this.props.el._id);
    }

    hasError() {
        let issues = this.props.el.getValidationIssues();
        return issues.length > 0;
    }


    render() {

        let selected = false;

        if (this.props.el.editContext?.getSelection()) {
            selected = this.props.el.editContext?.getSelection() === this.props.el._id;
        }

        return (
            <ObserveState listenTo={this.props.el.editContext} properties={['selected']} control={() => (
                <ExpressionValueWrapper>
                    <ObserveState
                        listenTo={this.props.el}
                        control={
                            () => (<>{
                                selected
                                    ? this.renderSelectedElements()
                                    : this.renderUnselectedElements()
                            }</>)
                        }
                        properties={['valueTypeValue']}
                    />
                    <ExpressionValueDialog expressionValue={this.props.el}/>
                </ExpressionValueWrapper>
            )} />
        )

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
            <MissingTextDiv error={this.hasError()}>{text}</MissingTextDiv>
        );
    }

    renderValue() {
        if (this.props.el.expectedType === ExpressionExpectedType.BOOLEAN) {
            return this.props.el.value ? 'True' : 'False';
        } else if (
            this.props.el.expectedType === ExpressionExpectedType.STRING_LIST
            || this.props.el.expectedType === ExpressionExpectedType.NUMBER_LIST
            || this.props.el.expectedType === ExpressionExpectedType.BOOLEAN_LIST
            || this.props.el.expectedType === ExpressionExpectedType.DATE_LIST
        ) {
            if (Array.isArray(this.props.el.value))
                return this.props.el.value.join(',');
        }
        return this.props.el.value;
    }

    renderSelectedElements () {

        if (this.props.el.valueType === ExpressionValueType.VARIABLE) {
            return (
                <SelectedElement
                    onClick={this.handleClick}
                >
                    {
                        this.props.el.variableName
                        ? <TextDiv error={this.hasError()}>{this.props.el.variableName}</TextDiv>
                        : this.renderMissingElement()
                    }
                </SelectedElement>
            );
        } else if (this.props.el.valueType === ExpressionValueType.VALUE) {
            return ( <SelectedElement
                    onClick={this.handleClick}
                >
                    {
                        (this.props.el.value !== null && this.props.el.value !== undefined )
                        ? <TextDiv error={this.hasError()}>{
                            this.renderValue()
                        }</TextDiv>
                        : this.renderMissingElement()
                    }
                </SelectedElement>
            );
        } else if (this.props.el.valueType === ExpressionValueType.SUBEXPRESSION) {
            return (
                <SelectedExpression>
                    {this.props.el.subExpression?.render() ?? this.renderMissingElement()}
                </SelectedExpression>
            );
        } else {
            // FOR: this.props.el.valueType === ExpressionValueType.UNSET
            return(
                <SelectedElement
                    onClick={this.handleClick}>
                    <>{this.renderMissingElement()}</>
                </SelectedElement>
            );
        }
    }

    renderUnselectedElements() {

        if (this.props.el.valueType === ExpressionValueType.VARIABLE) {
            return <VariableElement
                onClick={this.handleClick}
            >
                <i>
                    {this.props.el.variableName ?? this.renderMissingElement()}
                </i>
            </VariableElement>
        } else if (this.props.el.valueType === ExpressionValueType.VALUE) {
            return <ValueElement                                                                                                                                                                                                            
                onClick={this.handleClick}
            >
            {
                (this.props.el.value !== undefined && this.props.el.value !== null)
                ? <InnerValueDiv>
                    {
                        this.renderValue()
                    }
                </InnerValueDiv> 
                : this.renderMissingElement()
            }
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
    }
}

