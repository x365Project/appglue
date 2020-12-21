import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";

import {
	DateEqualToExpression,
	DateGetDayExpression,
	DateGetHourExpression,
	DateGetMonthExpression,
	DateGetTodayExpression,
	DateGetYearExpression,
    DateGreaterThanExpression,
    DateLessThanExpression
} from "./ExpressionElements";
import { XExpressionDefinition } from "./XExpressionDefinition";
import { XExpressionEditor } from "./XExpressionEditor";

export interface XExpressionEditorProps {
    expression: XExpressionDefinition;
}

export default {
    title: "Expression Designer/Date",
    parameters: {
        controls: {
            disabled: true,
        }
    }
} as Meta;


const Template: Story<XExpressionEditorProps> = (args) => <XExpressionEditor {...args} />;

let expression:any;
expression= new DateEqualToExpression();
expression.value1.value = '2020-02-02';
expression.value2.value = '2020-02-02';
let exp = new XExpressionDefinition();
exp.expression = expression;

export const DateEqual = Template.bind({},{expression : exp});

expression = new DateGetDayExpression();
expression.value1.value = '2020-02-02';
exp = new XExpressionDefinition();
exp.expression = expression;

export const GetDay = Template.bind({},{expression : exp});

expression = new DateGetHourExpression();
expression.value1.value = '2020-02-02';
exp = new XExpressionDefinition();
exp.expression = expression;
export const GetHour = Template.bind({},{expression : exp});

expression = new DateGetHourExpression();
expression.value1.value = '2020-02-02';
exp = new XExpressionDefinition();
exp.expression = expression;
export const GetMinute = Template.bind({},{expression : exp});

expression = new DateGetMonthExpression();
expression.value1.value = '2020-02-02';
exp = new XExpressionDefinition();
exp.expression = expression;
export const GetMonth = Template.bind({},{expression : exp});

expression = new DateGetTodayExpression();
exp = new XExpressionDefinition();
exp.expression = expression;
export const GetToday = Template.bind({},{expression : exp});


expression = new DateGetYearExpression();
expression.value1.value = '2020-02-02';
exp = new XExpressionDefinition();
exp.expression = expression;
export const GetYear = Template.bind({},{expression : exp});


expression = new DateGreaterThanExpression();
expression.value1.value = '2020-02-05';
expression.value2.value = '2020-02-02';
exp = new XExpressionDefinition();
exp.expression = expression;
export const GreaterThan = Template.bind({},{expression : exp});

expression = new DateLessThanExpression();
expression.value1.value = '2020-02-03';
expression.value2.value = '2020-02-05';
exp = new XExpressionDefinition();
exp.expression = expression;

export const LessThan = Template.bind({},{expression : exp});
