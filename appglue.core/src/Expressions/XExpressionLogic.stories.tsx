import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XExpressionDefinition} from "./XExpressionDefinition";
import {ExpressionExpectedType} from "./ExpressionExpectedType";
import {
    GreaterThanExpression,
    IfThenExpression,
    IfThenStyle,

    StringLengthExpression,
    MultiplyExpression,
    ExistsExpression,
    IsFalseExpression,
    IsTrueExpression,
    LessThanExpression,
    LessThanEqualToExpression,
    NotExpression,
} from "./ExpressionElements";

import {XExpressionEditor} from "./XExpressionEditor";
import {XExpressionEditorProps} from "./XExpressionEditor.stories";


export default {
    title: "Expression Designer/Logic",
    parameters: {
        controls: {
            disabled: true,
        }
    }
} as Meta;

const Template: Story<XExpressionEditorProps> = (args) => <XExpressionEditor {...args} />;


function getLogicExpression() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    baseExpression.ifThenStyle = IfThenStyle.BRANCH_DATA_RETURN;

    baseExpression.ifBranches[0]!.ifExpression!.elements[0]!.variableName = 'isEmployee';

    let subExpression = new MultiplyExpression();
    subExpression.value2.value = 10;
    subExpression.value1.variableName = 'income'
    baseExpression.ifBranches[0].thenExpression.subExpression = subExpression;
    baseExpression.defaultOutput.value = 0;

    exp.expression = baseExpression;

    return exp;
}

let exp = getLogicExpression();

export const IfThen = Template.bind({},{expression : exp});




exp = getLogicExpression();
(exp.expression as IfThenExpression).showElseAsDefault = true;

export const IfThenDefault = Template.bind({},{expression : exp});



function getLogicExpressionElseIf() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    baseExpression.ifThenStyle = IfThenStyle.BRANCH_DATA_RETURN;


    baseExpression.ifBranches[0]!.ifExpression!.elements[0]!.variableName = 'isEmployee';
    let subExpression = new MultiplyExpression();
    subExpression.value2.value = 10;
    subExpression.value1.variableName = 'income'
    baseExpression.ifBranches[0].thenExpression.subExpression = subExpression;
    let second = baseExpression.addIfBranch();
    second.ifExpression.elements[0]!.variableName = 'isContractor';
    second.thenExpression.value = 1000;

    baseExpression.defaultOutput.value = 0;
    exp.expression = baseExpression;

    return exp;
}

exp = getLogicExpressionElseIf();

export const IfThenElseIf = Template.bind({},{expression : exp});



exp = getLogicExpressionElseIf();
(exp.expression as IfThenExpression).thenText = 'Bonus Paid Is'

export const IfThenElseIfReplacedThen = Template.bind({},{expression : exp});



exp = getLogicExpressionElseIf();
(exp.expression as IfThenExpression).showElseAsDefault = true;

export const IfThenElseIfDefault = Template.bind({},{expression : exp});



exp = getLogicExpressionElseIf();
(exp.expression as IfThenExpression).showElseAsDefault = true;
(exp.expression as IfThenExpression).thenText = 'company pays';
(exp.expression as IfThenExpression).defaultText = 'everyone else gets';

export const IfThenElseIfDefaultChangedText = Template.bind({},{expression : exp});



function getLogicExpressionElseIfElseWithSub() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    baseExpression.ifThenStyle = IfThenStyle.BRANCH_DATA_RETURN;


    baseExpression.ifBranches[0].ifExpression.elements[0].variableName = 'isEmployee';
    let subExpression = new MultiplyExpression();
    subExpression.value2.value = 10;
    subExpression.value1.variableName = 'income'
    baseExpression.ifBranches[0].thenExpression.subExpression = subExpression;

    let greaterThan = new GreaterThanExpression();
    let strLen = new StringLengthExpression()
    strLen.value1.variableName = 'person.name'

    greaterThan.value1.subExpression = strLen;
    greaterThan.value2.value = 5;

    let secondIf = baseExpression.addIfBranch();

    secondIf.ifExpression.elements[0].subExpression = greaterThan;
    secondIf.thenExpression.value = 1000;

    baseExpression.defaultOutput.value = 0

    exp.expression = baseExpression;

    return exp;
}

exp = getLogicExpressionElseIfElseWithSub();

export const IfThenElseIfElseWithSub = Template.bind({},{expression : exp});



function getLogicExpressionElseIfElseWithSubWithBlanks() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    let subExpression = new MultiplyExpression();
    baseExpression.ifThenStyle = IfThenStyle.BRANCH_DATA_RETURN;


    baseExpression.ifBranches[0]!.ifExpression!.elements[0]!.variableName = 'isEmployee';
    // *** Left Null
    //    subExpression.value2.value = 10;
    subExpression.value1.variableName = 'income'
    baseExpression.ifBranches[0].thenExpression.subExpression = subExpression;

    let greaterThan = new GreaterThanExpression();
    let strLen = new StringLengthExpression()
    strLen.value1.variableName = 'person.name'

    greaterThan.value1.subExpression = strLen;
    greaterThan.value2.value = 5;

    let secondIf = baseExpression.addIfBranch();

    secondIf.ifExpression.elements[0].subExpression = greaterThan;
    secondIf.thenExpression.value = 1000;

    // *** Left Null
    //    baseExpression.defaultOutput.value = 0;

    exp.expression = baseExpression;

    return exp;
}

exp = getLogicExpressionElseIfElseWithSubWithBlanks();

export const IfThenElseIfElseWithSubWithBlanks = Template.bind({},{expression : exp});




function getLogicExpressionResultAtEnd() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    baseExpression.ifThenStyle = IfThenStyle.DATA_RETURN;

    baseExpression.ifBranches[0].ifExpression.elements[0].variableName = 'isEmployee';

    // true result
    let subExpression = new MultiplyExpression();
    subExpression.value2.value = 10;
    subExpression.value1.variableName = 'income'
    baseExpression.trueOutput.subExpression = subExpression;

    // false result
    baseExpression.defaultOutput.value = 0

    exp.expression = baseExpression;

    return exp;
}

exp = getLogicExpressionResultAtEnd();

export const IfThenResultsAtEnd = Template.bind({},{expression : exp});




function getLogicExpressionResultElseIfAtEnd() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    baseExpression.ifThenStyle = IfThenStyle.DATA_RETURN;

    baseExpression.ifBranches[0].ifExpression.elements[0].variableName = 'isEmployee';


    let greaterThan = new GreaterThanExpression();
    let strLen = new StringLengthExpression()
    strLen.value1.variableName = 'person.name'

    greaterThan.value1.subExpression = strLen;
    greaterThan.value2.value = 5;

    let secondIf = baseExpression.addIfBranch();

    secondIf.ifExpression.elements[0].subExpression = greaterThan;
    secondIf.thenExpression.value = 20;

    // true result
    let subExpression = new MultiplyExpression();
    subExpression.value2.value = 10;
    subExpression.value1.variableName = 'income'
    baseExpression.trueOutput.subExpression = subExpression;

    // false result
    baseExpression.defaultOutput.value = 0

    exp.expression = baseExpression;

    return exp;
}

exp = getLogicExpressionResultElseIfAtEnd();

export const IfThenResultsElseIfAtEnd = Template.bind({},{expression : exp});





function getIfSimpleRule() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    baseExpression.ifThenStyle = IfThenStyle.LOGICAL_RETURN;

    baseExpression.ifBranches[0].ifExpression.elements[0].variableName = 'isEmployee';

    exp.expression = baseExpression;

    return exp;
}

exp = getIfSimpleRule();

export const IfSimpleRule = Template.bind({},{expression : exp});




exp = getIfSimpleRule();

(exp.expression as IfThenExpression).showSimpleReturn = false;
export const IfSimpleRuleNoReturn = Template.bind({},{expression : exp});




function getIfElseSimpleRule() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new IfThenExpression();
    baseExpression.ifThenStyle = IfThenStyle.LOGICAL_RETURN;

    baseExpression.ifBranches[0].ifExpression.elements[0].variableName = 'isEmployee';

    baseExpression.addIfBranch().ifExpression.elements[0].variableName = 'isContractor'

    exp.expression = baseExpression;

    return exp;
}

exp = getIfElseSimpleRule();

export const IfElseSimpleRule = Template.bind({},{expression : exp});




exp = getIfElseSimpleRule();

(exp.expression as IfThenExpression).showSimpleReturn = false;
export const IfElseSimpleRuleNoReturn = Template.bind({},{expression : exp});


let expression:any;

expression= new ExistsExpression();
expression.value1.variableName = 'testVal';

exp = new XExpressionDefinition();
exp.expression = expression;
export const Exists = Template.bind({},{expression : exp});


expression = new IsFalseExpression();
expression.value1.variableName = 'test1';
exp = new XExpressionDefinition();
exp.expression = expression;
export const IsFalse = Template.bind({},{expression : exp});


expression = new IsTrueExpression();
expression.value1.variableName = 'test1';
exp = new XExpressionDefinition();
exp.expression = expression;
export const isTrue = Template.bind({},{expression : exp});

expression = new LessThanExpression();
expression.value1.variableName = 'test1';
expression.value2.variableName = 'test2';
exp = new XExpressionDefinition();
exp.expression = expression;
export const LessThan = Template.bind({},{expression : exp});

expression = new LessThanEqualToExpression();
expression.value1.variableName = 'test1';
expression.value2.variableName = 'test2';
exp = new XExpressionDefinition();
exp.expression = expression;
export const LessThanEqualTo = Template.bind({},{expression : exp});

expression = new NotExpression();
expression.value1.variableName = 'test1';
exp = new XExpressionDefinition();
exp.expression = expression;
export const Not = Template.bind({},{expression : exp});