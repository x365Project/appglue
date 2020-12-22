import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";

import {
	AbsoluteExpression, AddExpression, AsCurrencyExpression, AsPercentageExpression, AverageExpression, DivideExpression, EqualExpression, MaxExpression, MinExpression, ModExpression, MultiplyExpression, NotEqualExpression, RandomExpression, RoundExpression, SubstractExpression, SumExpression,
} from "./ExpressionElements";
import { XExpressionDefinition } from "./XExpressionDefinition";
import { XExpressionEditor } from "./XExpressionEditor";

export interface XExpressionEditorProps {
    expression: XExpressionDefinition;
}

export default {
    title: "Expression Designer/Math",
    parameters: {
        controls: {
            disabled: true,
        }
    }
} as Meta;


const Template: Story<XExpressionEditorProps> = (args) => <XExpressionEditor {...args} />;

let expression:any;
expression= new AbsoluteExpression();
expression.value1.value = -1;
let exp = new XExpressionDefinition();
exp.expression = expression;

export const Absolute = Template.bind({},{expression : exp});

expression= new AddExpression();
expression.value1.value = -1;
expression.value2.value = 10;
exp = new XExpressionDefinition();
exp.expression = expression;

export const Add = Template.bind({},{expression : exp});

expression= new AsCurrencyExpression();
expression.value1.value = -1;
exp = new XExpressionDefinition();
exp.expression = expression;

export const AsCurrency = Template.bind({},{expression : exp});

expression= new AsPercentageExpression();
expression.value1.value = -1;
exp = new XExpressionDefinition();
exp.expression = expression;

export const AsPercentage = Template.bind({},{expression : exp});

expression= new AverageExpression();
expression.value1.variableName = 'numberList';
exp = new XExpressionDefinition();
exp.expression = expression;

export const Average = Template.bind({},{expression : exp});

expression= new DivideExpression();
expression.divideValue.variableName = 'divideValue'
expression.divideBy.variableName = 'divideBy'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Divide = Template.bind({},{expression : exp});

expression= new EqualExpression();
expression.value1.variableName = 'value1'
expression.value2.variableName = 'value2'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Equal = Template.bind({},{expression : exp});

expression= new MaxExpression();
expression.value1.variableName = 'numberList'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Max = Template.bind({},{expression : exp});

expression= new MinExpression();
expression.value1.variableName = 'numberList'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Min = Template.bind({},{expression : exp});

expression= new ModExpression();
expression.value1.variableName = 'numberList'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Mod = Template.bind({},{expression : exp});

expression= new MultiplyExpression();
expression.value1.variableName = 'value1'
expression.value2.variableName = 'value2'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Multiply = Template.bind({},{expression : exp});

expression= new NotEqualExpression();
expression.value1.variableName = 'value1'
expression.value2.variableName = 'value2'
exp = new XExpressionDefinition();
exp.expression = expression;

export const NotEqual = Template.bind({},{expression : exp});

expression= new RandomExpression();
exp = new XExpressionDefinition();
exp.expression = expression;

export const Random = Template.bind({},{expression : exp});

expression= new RoundExpression();
expression.value1.variableName = 'value1'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Round = Template.bind({},{expression : exp});

expression= new SubstractExpression();
expression.value1.variableName = 'value1'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Substract = Template.bind({},{expression : exp});

expression= new SumExpression();
expression.value1.variableName = 'numberList'
exp = new XExpressionDefinition();
exp.expression = expression;

export const Sum = Template.bind({},{expression : exp});
