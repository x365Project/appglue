import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import styled from "styled-components";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {ExpressionLineDiv, ExpressionPiece} from "../../ExpressionStyles";
import {IconButton} from "@material-ui/core";
import {AddBoxOutlined, DeleteOutlined, GroupOutlined, LowPriorityOutlined, ReorderOutlined} from "@material-ui/icons";
import {AutoBind} from "../../../Common/AutoBind";
import {InlineOptionSelect} from "../../../CommonUI/InlineOptionSelect";
import {ExpressionEditContext} from "../../Utilities/ExpressionEditContext";
import {IBaseExpressionElement} from "../../Utilities/IBaseExpressionElement";
import {TextIcon} from "../../../CommonUI/TextIcon";

const BracketedDiv = styled.div`
    border-left: 1px solid darkgray;
    border-right: 1px solid darkgray;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;
`;

export enum GroupingType {
    AND = 'and',
    OR = 'or'
}

@RegisterExpression('Logic', 'And Group',  <TextIcon name={'AND'}/> ,ExpressionExpectedType.BOOLEAN)
export class AndGroup
    extends BaseExpression {

    typeOfGroup : GroupingType = GroupingType.AND;
    elements: ExpressionValue[] = [];


    constructor() {
        super({},{});
        this.expressionValueType = ExpressionExpectedType.BOOLEAN;

        this.add();
    }

    add() {
        let e = new ExpressionValue();

        if (this.editContext)
            e.setEditContext(this.editContext, this);

        e.expectedType = ExpressionExpectedType.BOOLEAN;
        this.elements.push(e);
    }

    setEditContext(editContext: ExpressionEditContext, owner: IBaseExpressionElement): void {
        super.setEditContext(editContext, owner);

        for (let p of this.elements) {
            p.setEditContext(editContext, this);
        }
    }

    render() {
        return (
            <BracketedDiv>
                {this.elements.map((g: ExpressionValue, i: number) => {
                    return (
                        <ExpressionLineDiv>
                            <ExpressionValueRenderer key={'g-' + i} el={g}></ExpressionValueRenderer>
                            {this.renderEndOfLine(i)}
                        </ExpressionLineDiv>
                    );
                })}
            </BracketedDiv>
        );
    }

    private renderEndOfLine(i: number) {
        let isLast = i + 1 === this.elements.length;
        let isFirst = i  === 0;
        if (isFirst && isLast) {
            return (
                <ExpressionPiece>
                    <IconButton size={'small'} onClick={this.addToFromAction}>
                        <AddBoxOutlined fontSize="small"/>
                    </IconButton>
                </ExpressionPiece>

            );
        } else if (isFirst && !isLast) {
            return (
                <ExpressionPiece>
                    <InlineOptionSelect text={this.typeOfGroup} options={[GroupingType.AND, GroupingType.OR]} onEdit={this.onGroupTypeSelect}/>
                </ExpressionPiece>
            );
        } else if (!isLast) {
            return (
                <ExpressionPiece>
                    <InlineOptionSelect text={this.typeOfGroup} options={[GroupingType.AND, GroupingType.OR]} onEdit={this.onGroupTypeSelect}/>
                    <IconButton size={'small'} aria-label="delete" >
                        <DeleteOutlined fontSize="small" />
                    </IconButton>
                </ExpressionPiece>
            );
        } else if (isLast) {
            return (
                <ExpressionPiece>
                    <IconButton size={'small'} onClick={this.addToFromAction}>
                        <AddBoxOutlined fontSize="small"/>
                    </IconButton>
                    <IconButton size={'small'} aria-label="delete" >
                        <DeleteOutlined fontSize="small" />
                    </IconButton>
                </ExpressionPiece>
            );
        }
    }

    @AutoBind
    private addToFromAction() {
        this.add();
        this.editContext?.refresh();
    }

    @AutoBind
    private onGroupTypeSelect(newGroup: string) {
        this.typeOfGroup = newGroup as GroupingType;
        this.editContext?.refresh();
    }
}

@RegisterExpression('Logic', 'Or Group', <TextIcon name={'OR'}/>, ExpressionExpectedType.BOOLEAN)
export class OrGroup extends AndGroup {

    constructor() {
        super();
        this.typeOfGroup = GroupingType.OR;
    }
}