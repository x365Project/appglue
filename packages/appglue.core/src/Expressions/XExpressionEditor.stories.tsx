import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from "@storybook/react/types-6-0";
import {XExpressionEditor} from "./XExpressionEditor";
import {XExpressionDefinition} from "./XExpressionDefinition";
import {ExpressionExpectedType} from "./ExpressionExpectedType";
import {AddExpression} from "./ExpressionElements/Math/AddExpression";
import {SumExpression} from "./ExpressionElements/Math/SumExpression";
import {IfThenExpression, IfThenStyle} from "./ExpressionElements/Logic/IfThenExpression";
import {MultiplyExpression} from "./ExpressionElements/Math/MultiplyExpression";
import {DivideExpression} from "./ExpressionElements/Math/DivideExpression";
import {GreaterThanExpression} from "./ExpressionElements/Logic/GreaterThan";
import {StringLengthExpression} from "./ExpressionElements/String/StringLengthExpression";

export interface XExpressionEditorProps {
    expression: XExpressionDefinition;
}



export default {
    title: "Expression Designer/Simple",
    parameters: {
        controls: {
            disabled: true,
        }
    }
} as Meta;

// const TestTemplate: Story<MyTest> = (args) => <MyTest {...args} />;
//
// export const TestBlank = TestTemplate.bind({},{});


const Template: Story<XExpressionEditorProps> = (args) => <XExpressionEditor {...args} />;

export const Blank = Template.bind({},{expression : new XExpressionDefinition()});


let exp = new XExpressionDefinition();
exp.variableName = 'incomeName'
export const ReturnVariable = Template.bind({},{expression : exp});


exp = new XExpressionDefinition();
exp.value = 10
export const ReturnValue = Template.bind({},{expression : exp});




function getMathExpression() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new AddExpression();
    baseExpression.value1.value = 4;

    let subExpression = new AddExpression();
    subExpression.value1.variableName = 'income';

    let sum = new SumExpression();
    sum.value1.variableName = 'otherIncome';
    subExpression.value2.subExpression = sum;

    baseExpression.value2.subExpression = subExpression;

    exp.expression = baseExpression;

    return exp;
}


exp = getMathExpression();


export const Simple = Template.bind({},{expression : exp});





function getMathExpressionDivide() : XExpressionDefinition {
    let exp = new XExpressionDefinition();
    exp.expressionValueType = ExpressionExpectedType.NUMBER;

    let baseExpression = new AddExpression();
    baseExpression.value1.value = 4;

    let subExpression = new AddExpression();
    subExpression.value1.variableName = 'income';

    let divide = new DivideExpression();
    divide.divideValue.variableName = 'otherIncome';
    divide.divideBy.value = 20;
    subExpression.value2.subExpression = divide;

    baseExpression.value2.subExpression = subExpression;

    exp.expression = baseExpression;

    return exp;
}

exp = getMathExpressionDivide();


export const Divide = Template.bind({},{expression : exp});



