import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";

import {
	StringListCombineExpression, StringCombineExpression, StringContainsExpression, StringEndWithExpression, StringIndexOfExpression, StringIsEmptyExpression, StringIsNotEmptyExpression, IfThenExpression, StringIsValidEmailExpression, StringLengthExpression, StringListAllInExpression, StringListContainsExpression, StringListGetStringByIndexExpression, StringListInExpression, StringListNotAllInExpression, StringListNotContainsExpression, StringListNotInExpression, StringLowercaseExpression, StringNotContainsExpression, StringProperExpression, StringStartWithExpression, StringTrimExpression, StringUppercaseExpression,
} from "./ExpressionElements";
import { XExpressionDefinition } from "./XExpressionDefinition";
import { XExpressionEditor } from "./XExpressionEditor";

export interface XExpressionEditorProps {
    expression: XExpressionDefinition;
}

export default {
    title: "Expression Designer/String",
    parameters: {
        controls: {
            disabled: true,
        }
    }
} as Meta;


const Template: Story<XExpressionEditorProps> = (args) => <XExpressionEditor {...args} />;

let expression:any;
expression= new StringListCombineExpression();
expression.value1.valueName = 'stringList';
expression.value2.value = ['1', '2'];
let exp = new XExpressionDefinition();
exp.expression = expression;

export const ListCombine = Template.bind({},{expression : exp});

expression= new StringCombineExpression();
expression.value1.value = 'a';
expression.value2.value = 'b';
exp = new XExpressionDefinition();
exp.expression = expression;

export const Combine = Template.bind({},{expression : exp});

expression= new StringContainsExpression();
expression.value1.value = 'ab';
expression.value2.value = 'b';
exp = new XExpressionDefinition();
exp.expression = expression;

export const Contains = Template.bind({},{expression : exp});

expression= new StringEndWithExpression();
expression.value1.value = 'ab';
expression.value2.value = 'b';
exp = new XExpressionDefinition();
exp.expression = expression;

export const EndWith = Template.bind({},{expression : exp});

expression= new StringIndexOfExpression();
expression.value1.value = 'ab';
expression.value2.value = 'b';
exp = new XExpressionDefinition();
exp.expression = expression;

export const IndexOf = Template.bind({},{expression : exp});

expression= new StringIsEmptyExpression();
exp = new XExpressionDefinition();
exp.expression = expression;

export const IsEmpty = Template.bind({},{expression : exp});

expression= new StringIsNotEmptyExpression();
exp = new XExpressionDefinition();
exp.expression = expression;

export const IsNotEmpty = Template.bind({},{expression : exp});

expression= new StringIsValidEmailExpression();
exp = new XExpressionDefinition();
exp.expression = expression;

export const IsValidEmail = Template.bind({},{expression : exp});

expression= new StringLengthExpression();
exp = new XExpressionDefinition();
exp.expression = expression;

export const Length = Template.bind({},{expression : exp});

expression= new StringListAllInExpression();
expression.value1.value = ['1', '2'];
expression.value2.value = ['3', '4'];
exp = new XExpressionDefinition();
exp.expression = expression;

export const ListAllIn = Template.bind({},{expression : exp});

expression= new StringListContainsExpression();
expression.value1.value = ['1', '2'];
expression.value2.value = '1';
exp = new XExpressionDefinition();
exp.expression = expression;

export const ListContains = Template.bind({},{expression : exp});

expression= new StringListGetStringByIndexExpression();
expression.value1.value = 2;
expression.value2.variableName = 'stringList';
exp = new XExpressionDefinition();
exp.expression = expression;

export const GetStringByIndex = Template.bind({},{expression : exp});

expression= new StringListInExpression();
expression.value1.value = 'aaa';
expression.value2.variableName = 'stringList';
exp = new XExpressionDefinition();
exp.expression = expression;

export const ListIn = Template.bind({},{expression : exp});

expression= new StringListNotAllInExpression();
expression.value1.value = ['aaa', 'bbb'];
expression.value2.variableName = 'stringList';
exp = new XExpressionDefinition();
exp.expression = expression;

export const ListNotAllIn = Template.bind({},{expression : exp});

expression= new StringListNotContainsExpression();
expression.value1.value = ['aaa', 'bbb'];
expression.value2.variableName = 'stringList';
exp = new XExpressionDefinition();
exp.expression = expression;

export const ListNotContains = Template.bind({},{expression : exp});

expression= new StringListNotInExpression();
expression.value1.variableName = 'stringList';
expression.value2.value = ['aaa', 'bbb'];
exp = new XExpressionDefinition();
exp.expression = expression;

export const ListNotIn = Template.bind({},{expression : exp});

expression= new StringLowercaseExpression();
expression.value1.variableName = 'stringVal';
exp = new XExpressionDefinition();
exp.expression = expression;

export const Lowercase = Template.bind({},{expression : exp});

expression= new StringNotContainsExpression();
expression.value1.variableName = 'stringVal';
exp = new XExpressionDefinition();
exp.expression = expression;

export const NotContains = Template.bind({},{expression : exp});

expression= new StringProperExpression();
expression.value1.variableName = 'stringVal';
exp = new XExpressionDefinition();
exp.expression = expression;

export const Propercase = Template.bind({},{expression : exp});

expression= new StringStartWithExpression();
expression.value1.variableName = 'stringVal';
exp = new XExpressionDefinition();
exp.expression = expression;

export const StartWith = Template.bind({},{expression : exp});

expression= new StringTrimExpression();
expression.value1.variableName = 'stringVal';
exp = new XExpressionDefinition();
exp.expression = expression;

export const Trim = Template.bind({},{expression : exp});

expression= new StringUppercaseExpression();
expression.value1.variableName = 'stringVal';
exp = new XExpressionDefinition();
exp.expression = expression;

export const Uppercase = Template.bind({},{expression : exp});
