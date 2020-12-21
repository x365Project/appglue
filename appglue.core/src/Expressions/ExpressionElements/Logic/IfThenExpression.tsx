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
import {PlusIcon} from "../../../CommonUI/Icon/PlusIcon";
import {LeftAlignIcon} from "../../../CommonUI/Icon/LeftAlignIcon";
import {ActiveLeftAlignIcon} from "../../../CommonUI/Icon/ActiveLeftAlignIcon";
import {RightAlignIcon} from "../../../CommonUI/Icon/RightAlignIcon";
import {ActiveRightAlignIcon} from "../../../CommonUI/Icon/ActiveRightAlignIcon";
import {LogicalIcon} from "../../../CommonUI/Icon/LogicalIcon";
import {ActiveLogicalIcon} from "../../../CommonUI/Icon/ActiveLogicalIcon";

import {ToggleButton} from "@material-ui/lab";
import {ExpressionLineDiv, RuleChangeToggleButtonGroup} from "../../ExpressionStyles";
import {IfThenIcon} from "../../../CommonUI/Icon/IfThenIcon";
import {AndGroup} from "./Grouping";
import {DataUtilities} from "../../../Common/DataUtilities";
import {DeleteIcon} from "../../../CommonUI/Icon/DeleteIcon";
import {StateManager} from "../../../CommonUI/StateManagement/StateManager";
import {ObserveState} from "../../../CommonUI/StateManagement/ObserveState";

const AllIfDiv = styled.div`
    font-size:      18px;
    width:     100%;
`;

export const IfSection = styled.div`
    // float: left;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // clear: left;
    width: 100%;
    padding-left: 8px;
    position: relative;
    margin: 2px 0;

    &::before {
        content: '';
        width: 4px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border: 1px solid #93A9BF;
        border-right: none;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    &::after {
        content: '';
        width: 4px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #93A9BF;
        border-left: none;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }

`;

export const IfIndentedSection = styled.div`
    // float: left;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // clear: left;
    width: 100%;
    padding-left: 13px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 5px;
    margin-bottom: 10px;
    position: relative;

    &::before {
        content: '';
        width: 4px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border: 1px solid #93A9BF;
        border-right: none;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }

    &::after {
        content: '';
        width: 4px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #93A9BF;
        border-left: none;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    padding-right: 15px;
    align-items: center;
    
`;

export const FloatRight = styled.div`
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
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


// todo.  this is one where we can change output
@RegisterExpression('Logic', 'If/Then', <IfThenIcon />, ExpressionExpectedType.BOOLEAN, true )
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

        StateManager.changed(this);

        if (this.editContext) {
            pair.setEditContext(this.editContext, this);
        }

        return pair;
    }

    deleteIfBranch(index: number) {
        this._ifBranches.splice(index, 1);
        StateManager.changed(this);
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
            <ObserveState listenTo={this} control={() => (
                <AllIfDiv>
                    {
                        this._ifBranches.map((value: IfThenPair, index: number) => {
                            if (this._ifThenStyle === IfThenStyle.BRANCH_DATA_RETURN) {
                                if (index === 0) {
                                    return (
                                        <IfSection key={value._id}>
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
                                        <IfSection key={value._id}>
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
                                        <IfSection key={value._id}>
                                            <ExpressionLineDiv>
                                                if {value.ifExpression.render()}
                                                {this.renderBranchActions(index, true)}
                                            </ExpressionLineDiv>
                                        </IfSection>
                                    );
                                } else {
                                    return (
                                        <IfSection key={value._id}>
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
            )} />
            
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
                                <PlusIcon />
                            </IconButton>
                            &nbsp;
                            {this.renderRuleChange()}
                        </FloatRight>
                    );

                } else {
                    return (
                        <ActionButtons>
                            <IconButton size={'small'} onClick={this.addIfBranchFromAction}>
                                <PlusIcon />
                            </IconButton>
                        </ActionButtons>
                    );
                }

            } else {
                return (
                    <ActionButtons>
                        <IconButton size={'small'} aria-label="delete" onClick={() => this.deleteIfBranchFromAction(index)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton size={'small'} onClick={this.addIfBranchFromAction}>
                            <PlusIcon />
                        </IconButton>
                    </ActionButtons>
                );
            }

        } else if (index !== 0) {
            return (
                <ActionButtons>
                    <IconButton size={'small'} aria-label="delete"  onClick={() => this.deleteIfBranchFromAction(index)}>
                        <DeleteIcon  />
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

        return (
            <ExpressionLineDiv/>
        );

    }

    @AutoBind
    private addIfBranchFromAction() {
        this.addIfBranch();
    }

    @AutoBind
    private deleteIfBranchFromAction(index: number) {
        this.deleteIfBranch(index);
    }

    private renderRuleChange() {
        if (this.expressionValueType !== ExpressionExpectedType.BOOLEAN) {
            return (
                    <RuleChangeToggleButtonGroup
                        value={this._ifThenStyle}
                        exclusive
                        onChange={this.changeStyle}
                        aria-label="rule style"
                        size="small"
                    >
                        <ToggleButton  value={IfThenStyle.DATA_RETURN} aria-label="Data Return">
                            {
                                this._ifThenStyle !== IfThenStyle.DATA_RETURN ? <LeftAlignIcon alt="Data Return" /> : <ActiveLeftAlignIcon alt="Data Return" />
                            }
                        </ToggleButton>
                        <ToggleButton value={IfThenStyle.BRANCH_DATA_RETURN} aria-label="Branch Data Return">
                            {
                                this._ifThenStyle !== IfThenStyle.BRANCH_DATA_RETURN ? <RightAlignIcon alt="Branch Data Return" /> : <ActiveRightAlignIcon alt="Branch Data Return" />
                            }
                        </ToggleButton>
                    </RuleChangeToggleButtonGroup>
            );
        } else {
            return (
                    <RuleChangeToggleButtonGroup
                        value={this._ifThenStyle}
                        exclusive
                        onChange={this.changeStyle}
                        aria-label="rule style"
                        size="small"
                    >
                        <ToggleButton  value={IfThenStyle.DATA_RETURN} aria-label="Data Return">
                            {
                                this._ifThenStyle !== IfThenStyle.DATA_RETURN ? <LeftAlignIcon alt="Data Return" /> : <ActiveLeftAlignIcon alt="Data Return" />
                            }
                        </ToggleButton>
                        <ToggleButton value={IfThenStyle.BRANCH_DATA_RETURN} aria-label="Branch Data Return">
                            {
                                this._ifThenStyle !== IfThenStyle.BRANCH_DATA_RETURN ? <RightAlignIcon alt="Branch Data Return" /> : <ActiveRightAlignIcon alt="Branch Data Return" />
                            }
                        </ToggleButton>
                        <ToggleButton value={IfThenStyle.LOGICAL_RETURN} aria-label="Logical Return">
                            {
                                this._ifThenStyle !== IfThenStyle.LOGICAL_RETURN ? <LogicalIcon alt="Logical Return" /> : <ActiveLogicalIcon alt="Logical Return" />
                            }
                        </ToggleButton>
                    </RuleChangeToggleButtonGroup>
            );
        }
        return undefined;
    }

    @AutoBind
    private changeStyle(event: any, value: IfThenStyle) {
        this.ifThenStyle = value;
        StateManager.changed(this);
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