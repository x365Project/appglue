import {BaseExpression} from "../../BaseExpression";
import {ExpressionValue} from "../../ExpressionValue";
import {ExpressionExpectedType} from "../../ExpressionExpectedType";
import React from "react";
import {RegisterExpression} from "../../Utilities/RegisterExpression";
import styled from "styled-components";
import {ExpressionValueRenderer} from "../../ExpressionValueRenderer";
import {ExpressionLineDiv, ExpressionPiece} from "../../ExpressionStyles";
import {IconButton} from "@material-ui/core";
import {AutoBind} from "../../../Common/AutoBind";
import {InlineOptionSelect} from "../../../CommonUI/InlineOptionSelect";
import {ExpressionEditContext} from "../../Utilities/ExpressionEditContext";
import {IBaseExpressionElement} from "../../Utilities/IBaseExpressionElement";
import { PlusIcon } from "../../../CommonUI/Icon/PlusIcon";
import { DeleteIcon } from "../../../CommonUI/Icon/DeleteIcon";
import { AndIcon } from "../../../CommonUI/Icon/AndIcon";
import { OrIcon } from "../../../CommonUI/Icon/OrIcon";
import { ObserveState } from "../../../CommonUI/StateManagement/ObserveState";
import { StateManager } from "../../../CommonUI/StateManagement/StateManager";

const BracketedDiv = styled.div`
    position: relative;
    padding: 2px 4px;
    margin-left: 6px;
    margin-right: 10px;

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

export enum GroupingType {
    AND = 'and',
    OR = 'or'
}

@RegisterExpression('Logic', 'And Group',  <AndIcon /> ,ExpressionExpectedType.BOOLEAN)
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
        StateManager.changed(this);
    }

    delete(index: number) {
        this.elements.splice(index, 1);
        StateManager.changed(this);
    }

    setEditContext(editContext: ExpressionEditContext, owner: IBaseExpressionElement): void {
        super.setEditContext(editContext, owner);

        for (let p of this.elements) {
            p.setEditContext(editContext, this);
        }
    }

    render() {
        return (
            <ObserveState listenTo={this} control={() => <BracketedDiv>
                {this.elements.map((g: ExpressionValue, i: number) => {
                    return (
                        <ExpressionLineDiv key={i}>
                            <ExpressionValueRenderer key={'g-' + i} el={g}></ExpressionValueRenderer>
                            {this.renderEndOfLine(i)}
                        </ExpressionLineDiv>
                    );
                })}
            </BracketedDiv>} />
        );
    }

    private renderEndOfLine(i: number) {
        let isLast = i + 1 === this.elements.length;
        let isFirst = i  === 0;
        if (isFirst && isLast) {
            return (
                <ExpressionPiece>
                    <IconButton size={'small'} onClick={this.addToFromAction}>
                        <PlusIcon />
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
                    <IconButton size={'small'} aria-label="delete" onClick={() => this.deleteToFromAction(i)}>
                        <DeleteIcon />
                    </IconButton>
                </ExpressionPiece>
            );
        } else if (isLast) {
            return (
                <ExpressionPiece>
                    <IconButton size={'small'} onClick={this.addToFromAction}>
                        <PlusIcon />
                    </IconButton>
                    <IconButton size={'small'} aria-label="delete" onClick={() => this.deleteToFromAction(i)}>
                        <DeleteIcon />
                    </IconButton>
                </ExpressionPiece>
            );
        }
    }

    @AutoBind
    private addToFromAction() {
        this.add();
    }

    

    @AutoBind
    private deleteToFromAction(index: number) {
        this.delete(index);
    }



    @AutoBind
    private onGroupTypeSelect(newGroup: string) {
        this.typeOfGroup = newGroup as GroupingType;

        StateManager.changed(this);
    }
}

@RegisterExpression('Logic', 'Or Group', <OrIcon />, ExpressionExpectedType.BOOLEAN)
export class OrGroup extends AndGroup {

    constructor() {
        super();
        this.typeOfGroup = GroupingType.OR;
    }
}