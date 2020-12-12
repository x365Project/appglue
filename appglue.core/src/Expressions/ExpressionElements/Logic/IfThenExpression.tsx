import React from "react";
import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import {IBaseExpressionElement} from "../../Utilities/IBaseExpressionElement";
import {ExpressionEditContext} from "../../Utilities/ExpressionEditContext";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import styled from "styled-components";
import {IconButton} from "@material-ui/core";
import {AutoBind} from "../../../Common/AutoBind";
import {InlineTextEdit} from "../../../CommonUI/InlineTextEdit";
import {
    AddBoxOutlined,
    CheckBoxOutlined, CodeOutlined,
    DeleteOutlined,
    DynamicFeedOutlined,
    LowPriorityOutlined
} from "@material-ui/icons";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {ExpressionLineDiv} from "../../ExpressionStyles";
import {AndGroup} from "./Grouping";
import {TextIcon} from "../../../CommonUI/TextIcon";
import {DataUtilities} from "../../../Common/DataUtilities";

const AllIfDiv = styled.div`
    font-size:      18px;
    width:     100%;
`;

export const IfSection = styled.div`
  float: left;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  clear: left;
  width: 100%;
  border-left: 1px solid darkgray;
  border-right: 1px solid darkgray;
  border-radius: 10px;
  padding-left: 8px;
`;

export const IfIndentedSection = styled.div`
  float: left;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  clear: left;
  width: 100%;
  border-left: 1px solid darkgray;
  border-right: 1px solid darkgray;
  border-radius: 10px;
  padding-left: 13px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const ActionButtons = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  padding-right: 15px;
`;

export const FloatRight = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export enum IfThenStyle {
    DATA_RETURN = 'data_return',
    BRANCH_DATA_RETURN = 'branch_data_return',
    LOGICAL_RETURN = 'logical_return'
}

class IfThenPair implements IBaseExpressionElement{
    readonly canSelect: boolean = false;

    ifExpression: AndGroup = new AndGroup();
    thenExpression: ExpressionValue = new ExpressionValue();
    _id: string = DataUtilities.generateUniqueId();

    editContext?: ExpressionEditContext;
    setEditContext(editContext: ExpressionEditContext, owner: IBaseExpressionElement): void {
        this.editContext = editContext;

        editContext.register(this, owner);

        if (editContext) {
            this.ifExpression.setEditContext(editContext, this);
            this.thenExpression.setEditContext(editContext, this);
        }
    }


}


@RegisterExpression('Logic', 'If/Then', <TextIcon name={'IF'}/> )
export class IfThenExpression
        extends BaseExpression{

    _ifBranches : IfThenPair[] = [];

    trueOutput : ExpressionValue = new ExpressionValue();
    defaultOutput : ExpressionValue = new ExpressionValue();

    showElseAsDefault : boolean = false;
    showSimpleReturn: boolean = true;
    private _ifThenStyle: IfThenStyle = IfThenStyle.DATA_RETURN;
    thenText : string = 'result is';
    defaultText : string = 'default result is';

    constructor()
    constructor(outputType : ExpressionExpectedType = ExpressionExpectedType.NUMBER ) {
        super({}, {});

        if (outputType)
            this.expressionValueType = outputType;

        if (this._ifBranches.length === 0) {
            this.addIfBranch();
        }

        // set name and register expression values
        this.trueOutput = ExpressionValue.createExpressionValue(this, 'trueOutput', this.expressionValueType);
        this.defaultOutput = ExpressionValue.createExpressionValue(this, 'defaultOutput', this.expressionValueType);;
    }

    addIfBranch(): IfThenPair
    addIfBranch(pair? : IfThenPair) : IfThenPair {
        if (!pair)
            pair = new IfThenPair();

        pair.thenExpression.expectedType = this.expressionValueType;

        this._ifBranches.push(pair);

        if (this.editContext) {
            pair.setEditContext(this.editContext, this);
        }

        return pair;
    }

    get ifBranches() : IfThenPair[] {
        return this._ifBranches;
    }

    setEditContext(editContext: ExpressionEditContext, owner: IBaseExpressionElement): void {
        super.setEditContext(editContext, owner);

        for (let p of this._ifBranches) {
            p.setEditContext(editContext, this);
        }
    }

    render() {

        return (
            <AllIfDiv>
                {
                this._ifBranches.map((value: IfThenPair, index: number) => {
                    if (this._ifThenStyle === IfThenStyle.BRANCH_DATA_RETURN) {
                        if (index === 0) {
                            return (
                                <IfSection key={this._id + index}>
                                    <ExpressionLineDiv>
                                        if {value.ifExpression.render()}
                                        <FloatRight>{this.renderRuleChange()}</FloatRight>
                                    </ExpressionLineDiv>
                                    <IfIndentedSection>
                                        <ExpressionLineDiv>{this.renderThen()}</ExpressionLineDiv>
                                        <ExpressionLineDiv>&nbsp;&nbsp;<ExpressionValueRenderer el={value.thenExpression !}/>
                                            {this.renderBranchActions(index)}
                                        </ExpressionLineDiv>
                                    </IfIndentedSection>
                                </IfSection>
                            );
                        } else {
                            return (
                                <IfSection key={this._id + index}>
                                    <ExpressionLineDiv>
                                        else if {value.ifExpression.render()}
                                        {this.renderBranchActions(index)}
                                    </ExpressionLineDiv>
                                    <IfIndentedSection>
                                        <ExpressionLineDiv>{this.renderThen()}</ExpressionLineDiv>
                                        <ExpressionLineDiv>&nbsp;&nbsp;<ExpressionValueRenderer el={value.thenExpression !}/>
                                        </ExpressionLineDiv>
                                    </IfIndentedSection>
                                </IfSection>
                            )
                        }
                    } else {
                        if (index === 0) {
                            return (
                                <IfSection>
                                    <ExpressionLineDiv>
                                        if {value.ifExpression.render()}
                                        {this.renderBranchActions(index, true)}
                                    </ExpressionLineDiv>
                                </IfSection>
                            );
                        } else {
                            return (
                                <IfSection>
                                    <ExpressionLineDiv>
                                        else if {value.ifExpression.render()}
                                        {this.renderBranchActions(index)}
                                    </ExpressionLineDiv>
                                </IfSection>
                            )
                        }
                    }

                })
                }
                {this.renderEnd()}
            </AllIfDiv>
        )
    }

    renderThen() {
        return (
            <InlineTextEdit text={this.thenText} onEdit={(newVal : string) => {
                this.thenText = newVal;
                this.editContext?.refresh();
            }} />
        );
    }

    renderBranchActions(index : number, renderRuleChange: boolean = false) {
        let isLast = index + 1 === this._ifBranches.length;
        if (isLast) {
            if (index === 0) {
                if (renderRuleChange) {
                    return (
                        <FloatRight>
                            <IconButton size={'small'} onClick={this.addIfBranchFromAction}>
                                <AddBoxOutlined fontSize="small"/>
                            </IconButton>
                            &nbsp;
                            {this.renderRuleChange()}
                        </FloatRight>
                    );

                } else {
                    return (
                        <ActionButtons>
                            <IconButton size={'small'} onClick={this.addIfBranchFromAction}>
                                <AddBoxOutlined fontSize="small"/>
                            </IconButton>
                        </ActionButtons>
                    );
                }

            } else {
                return (
                    <ActionButtons>
                        <IconButton size={'small'} aria-label="delete" >
                            <DeleteOutlined fontSize="small" />
                        </IconButton>
                        <IconButton size={'small'} onClick={this.addIfBranchFromAction}>
                            <AddBoxOutlined fontSize="small"/>
                        </IconButton>
                    </ActionButtons>
                );
            }

        } else if (index !== 0) {
            return (
                <ActionButtons>
                    <IconButton size={'small'} aria-label="delete" >
                        <DeleteOutlined fontSize="small"  />
                    </IconButton>
                </ActionButtons>);
        } else if (renderRuleChange) {
            return (
                <FloatRight>
                    {this.renderRuleChange()}
                </FloatRight>
            );

        }
    }


    renderEnd() : JSX.Element
    {
        {
            if (this._ifThenStyle === IfThenStyle.LOGICAL_RETURN && this.showSimpleReturn) {
                return (
                    <IfSection>
                        <ExpressionLineDiv>{this.renderThen()}</ExpressionLineDiv>
                        <IfIndentedSection>
                        <ExpressionLineDiv>&nbsp;&nbsp;return true</ExpressionLineDiv>
                        <ExpressionLineDiv>else</ExpressionLineDiv>
                        <ExpressionLineDiv>&nbsp;&nbsp;return false</ExpressionLineDiv>
                    </IfIndentedSection>
                    </IfSection>
                );
            }

            if (this._ifThenStyle === IfThenStyle.BRANCH_DATA_RETURN) {
                if (this.showElseAsDefault) {
                    return (
                        <IfSection>
                            <ExpressionLineDiv/>
                            <ExpressionLineDiv>{this.defaultText} = <ExpressionValueRenderer el={this.defaultOutput}/></ExpressionLineDiv>
                       </IfSection>
                    );

                } else {
                    return (
                        <IfSection>
                            <ExpressionLineDiv>else</ExpressionLineDiv>
                            <IfIndentedSection>
                                <ExpressionLineDiv>{this.renderThen()}</ExpressionLineDiv>
                                <ExpressionLineDiv>&nbsp;&nbsp;<ExpressionValueRenderer el={this.defaultOutput}/></ExpressionLineDiv>
                            </IfIndentedSection>
                        </IfSection>
                    );
                }
            }

            if (this._ifThenStyle === IfThenStyle.DATA_RETURN) {
                return (
                    <IfSection>
                        <IfIndentedSection>
                            <ExpressionLineDiv>{this.renderThen()}</ExpressionLineDiv>
                            <ExpressionLineDiv>&nbsp;&nbsp;<ExpressionValueRenderer el={this.trueOutput}/></ExpressionLineDiv>
                            <ExpressionLineDiv>else</ExpressionLineDiv>
                            <ExpressionLineDiv>&nbsp;&nbsp;<ExpressionValueRenderer el={this.defaultOutput}/></ExpressionLineDiv>
                        </IfIndentedSection>
                    </IfSection>
                );
            }
        }

        return (
            <ExpressionLineDiv/>
        );

    }

    @AutoBind
    private addIfBranchFromAction() {
        this.addIfBranch();
        this.editContext?.refresh();
    }

    private renderRuleChange() {
        if (this.expressionValueType !== ExpressionExpectedType.BOOLEAN) {
            return (
                    <ToggleButtonGroup
                        value={this._ifThenStyle}
                        exclusive
                        onChange={this.changeStyle}
                        aria-label="rule style"
                        size="small"
                    >
                        <ToggleButton size={'small'} value={IfThenStyle.DATA_RETURN} aria-label="left aligned">
                            <LowPriorityOutlined fontSize={'small'}/>
                        </ToggleButton>
                        <ToggleButton size={'small'} value={IfThenStyle.BRANCH_DATA_RETURN} aria-label="centered">
                            <DynamicFeedOutlined fontSize={'small'} />
                        </ToggleButton>
                    </ToggleButtonGroup>
            );
        } else {
            return (
                    <ToggleButtonGroup
                        value={this._ifThenStyle}
                        exclusive
                        onChange={this.changeStyle}
                        aria-label="rule style"
                        size="small"
                    >
                        <ToggleButton  value={IfThenStyle.DATA_RETURN} aria-label="left aligned">
                            <LowPriorityOutlined fontSize={'small'}/>
                        </ToggleButton>
                        <ToggleButton value={IfThenStyle.BRANCH_DATA_RETURN} aria-label="centered">
                            <DynamicFeedOutlined fontSize={'small'}/>
                        </ToggleButton>
                        <ToggleButton value={IfThenStyle.LOGICAL_RETURN} aria-label="centered">
                            <CheckBoxOutlined fontSize={'small'} />
                        </ToggleButton>
                    </ToggleButtonGroup>
            );
        }
        return undefined;
    }

    @AutoBind
    private changeStyle(event: any, value: IfThenStyle) {
        this.ifThenStyle = value;
        this.editContext?.refresh();
    }


    get ifThenStyle(): IfThenStyle {
        return this._ifThenStyle;
    }

    set ifThenStyle(value: IfThenStyle) {
        if (value === IfThenStyle.LOGICAL_RETURN)
            this.expressionValueType = ExpressionExpectedType.BOOLEAN
        this._ifThenStyle = value;
    }

}