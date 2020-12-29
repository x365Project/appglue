import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import {
    DateEqualToExpression,
    DateGetDayExpression,
    DateGetHourExpression,
    DateGetMonthExpression,
    DateGetSecondExpression,
    DateGetTodayExpression,
    DateGetYearExpression,
    DateGreaterThanExpression,
    DateLessThanExpression,
    ExistsExpression,

    GreaterThanExpression,
    GreaterThanEqualToExpression,
    IfThenExpression,
    IfThenStyle,
    MultiplyExpression,
    IsFalseExpression,
    IsTrueExpression,
    LessThanExpression,
    LessThanEqualToExpression,
    NotExpression,
    AbsoluteExpression,
    AddExpression,
    AsCurrencyExpression,
    AsPercentageExpression,
    AverageExpression,
    DivideExpression,
    EqualExpression,
    MaxExpression,
    MinExpression,
    ModExpression,
    NotEqualExpression,
    RandomExpression,
    RoundExpression,
    SubstractExpression,
    SumExpression,
    StringListCombineExpression,
    StringCombineExpression,
    StringContainsExpression,
    StringEndWithExpression,
    StringIndexOfExpression,
    StringIsEmptyExpression,
    StringIsNotEmptyExpression,
    StringIsValidEmailExpression,
    StringLengthExpression,
    StringListAllInExpression,
    StringListContainsExpression,
    StringListGetStringByIndexExpression,
    StringListInExpression,
    StringListNotAllInExpression,
    StringListNotContainsExpression,
    StringListNotInExpression,
    StringLowercaseExpression,
    StringNotContainsExpression,
    StringProperExpression,
    StringStartWithExpression,
    StringTrimExpression,
    StringUppercaseExpression
} from "./ExpressionElements";
import {XExpressionEditor} from "./XExpressionEditor";
import { XExpressionDefinition } from './XExpressionDefinition';
import { ExpressionExpectedType } from './ExpressionExpectedType';

describe("XExpressionEditor", () => {

    let errorList: any[] = [];

    const renderError = (output: string) => {
        errorList.push(output);
    };

    const renderWarn = (output: any) => {
        errorList.push(output);
    }

    const originalError = console.error
    const originalWarn = console.error
    const originalLog = console.log

    beforeEach(() => {
        console.error = renderError
        console.warn = renderWarn
        // console.log = renderLog
    })


    afterEach(() => {
        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
    })

    it("Date: equal with focus render value", () => {
        let expression: DateEqualToExpression = new DateEqualToExpression();
        expression.value1.value = '2020-02-02';
        expression.value2.value = '2020-02-02';
        let exp = new XExpressionDefinition();
        exp.expression = expression;


        const {getAllByText, container} = render(<XExpressionEditor expression={exp} />);
        let dateElems = getAllByText(/2020-02-02/i);

        expect(dateElems).toHaveLength(2);

        fireEvent.click(dateElems[0]);

        let valueInput = container.querySelector('.MuiInputBase-root input') as HTMLInputElement;
        expect(valueInput).toHaveFocus();

        expect(errorList).toHaveLength(0);
    });

    it("Date: get day", () => {
        let expression: DateGetDayExpression = new DateGetDayExpression();
        expression.value1.value = '2020-02-02';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/2020-02-02/i)).toBeInTheDocument();
        expect(queryByText(/get day/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Date: get hour", () => {
        let expression: DateGetHourExpression = new DateGetHourExpression();
        expression.value1.value = '2020-02-02';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/2020-02-02/i)).toBeInTheDocument();
        expect(queryByText(/get hour/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Date: get month", () => {
        let expression: DateGetMonthExpression = new DateGetMonthExpression();
        expression.value1.value = '2020-02-02';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/2020-02-02/i)).toBeInTheDocument();
        expect(queryByText(/get month/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Date: get second", () => {
        let expression: DateGetSecondExpression = new DateGetSecondExpression();
        expression.value1.value = '2020-02-02';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/2020-02-02/i)).toBeInTheDocument();
        expect(queryByText(/get second/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Date: get Today", () => {
        let expression: DateGetTodayExpression = new DateGetTodayExpression();
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/get today/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Date: get Year", () => {
        let expression: DateGetYearExpression = new DateGetYearExpression();
        expression.value1.value = '2020-02-02';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/get year/i)).toBeInTheDocument();
        expect(queryByText(/2020-02-02/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Date: greater than", () => {
        let expression: DateGreaterThanExpression = new DateGreaterThanExpression();
        expression.value1.value = '2020-02-05';
        expression.value2.value = '2020-02-03';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/2020-02-05/i)).toBeInTheDocument();
        expect(queryByText(/2020-02-03/i)).toBeInTheDocument();
        expect(queryByText(/>/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Date: less than", () => {
        let expression: DateLessThanExpression = new DateLessThanExpression();
        expression.value1.value = '2020-02-03';
        expression.value2.value = '2020-02-05';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/2020-02-03/i)).toBeInTheDocument();
        expect(queryByText(/2020-02-05/i)).toBeInTheDocument();
        expect(queryByText(/</i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    
    it("Logic: exists", () => {
        let expression: ExistsExpression = new ExistsExpression();
        expression.value1.variableName = 'testVal';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/testVal/i)).toBeInTheDocument();
        expect(queryByText(/exists/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic: Greater Than", () => {
        let expression: GreaterThanExpression = new GreaterThanExpression();
        expression.value1.variableName = 'test1';
        expression.value2.variableName = 'test2';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/test1/i)).toBeInTheDocument();
        expect(queryByText(/test2/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic: Greater Than Equal", () => {
        let expression: GreaterThanEqualToExpression = new GreaterThanEqualToExpression();
        expression.value1.variableName = 'test1';
        expression.value2.variableName = 'test2';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/test1/i)).toBeInTheDocument();
        expect(queryByText(/test2/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic: IfThenExpression", () => {
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

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/income/i)).toBeInTheDocument();
        expect(queryByText(/10/i)).toBeInTheDocument();
        expect(queryByText(/isEmployee/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic: IsFalse", () => {
        let expression: IsFalseExpression = new IsFalseExpression();
        expression.value1.variableName = 'test1';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/test1/i)).toBeInTheDocument();
        expect(queryByText(/is false/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic: IsTrue", () => {
        let expression: IsTrueExpression = new IsTrueExpression();
        expression.value1.variableName = 'test1';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/test1/i)).toBeInTheDocument();
        expect(queryByText(/is true/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic: LessThan", () => {
        let expression: LessThanExpression = new LessThanExpression();
        expression.value1.variableName = 'test1';
        expression.value2.variableName = 'test2';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/test1/i)).toBeInTheDocument();
        expect(queryByText(/test2/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic: LessThanEqualTo", () => {
        let expression: LessThanEqualToExpression = new LessThanEqualToExpression();
        expression.value1.variableName = 'test1';
        expression.value2.variableName = 'test2';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/test1/i)).toBeInTheDocument();
        expect(queryByText(/test2/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Logic:  Not", () => {
        let expression: NotExpression = new NotExpression();
        expression.value1.variableName = 'test1';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/not/i)).toBeInTheDocument();
        expect(queryByText(/test1/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Absolute", () => {
        let expression: AbsoluteExpression = new AbsoluteExpression();
        expression.value1.value = -1;
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText, container} = render(<XExpressionEditor expression={exp} />);
        let valueElem = queryByText(/-1/i);

        expect(queryByText(/absolute/i)).toBeInTheDocument();
        expect(valueElem).toBeInTheDocument();

        fireEvent.click(valueElem!);

        let valueInput = container.querySelector('.MuiInputBase-root input') as HTMLInputElement;
        expect(valueInput).toHaveFocus();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Add", () => {
        let expression: AddExpression = new AddExpression();
        expression.value1.value = -1;
        expression.value2.value = 10;
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/\+/i)).toBeInTheDocument();
        expect(queryByText(/-1/i)).toBeInTheDocument();
        expect(queryByText(/10/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  As Currency", () => {
        let expression: AsCurrencyExpression = new AsCurrencyExpression();
        expression.value1.value = -1;
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/as currency/i)).toBeInTheDocument();
        expect(queryByText(/-1/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  As Percentage", () => {
        let expression: AsPercentageExpression = new AsPercentageExpression();
        expression.value1.value = -1;
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/as percentage/i)).toBeInTheDocument();
        expect(queryByText(/-1/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Average", () => {
        let expression: AverageExpression = new AverageExpression();
        expression.value1.variableName = 'numberList'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/numberList/i)).toBeInTheDocument();
        expect(queryByText(/average/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Divide", () => {
        let expression: DivideExpression = new DivideExpression();
        expression.divideValue.variableName = 'divideValue'
        expression.divideBy.variableName = 'divideBy'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/divideValue/i)).toBeInTheDocument();
        expect(queryByText(/divideBy/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Equal", () => {
        let expression: EqualExpression = new EqualExpression();
        expression.value1.variableName = 'value1'
        expression.value2.variableName = 'value2'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/value1/i)).toBeInTheDocument();
        expect(queryByText(/value2/i)).toBeInTheDocument();
        expect(queryByText(/=/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Max", () => {
        let expression = new MaxExpression();
        expression.value1.value = [1, 2];
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText, container} = render(<XExpressionEditor expression={exp} />);

        let valueElem = queryByText(expression.value1.value.join(','));

        expect(valueElem).toBeInTheDocument();
        expect(queryByText(/max/i)).toBeInTheDocument();

        fireEvent.click(valueElem!);

        let valueInput = container.querySelector('.MuiInputBase-root input') as HTMLInputElement;
        expect(valueInput).toHaveFocus();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Min", () => {
        let expression = new MinExpression();
        expression.value1.variableName = 'numberList'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/numberList/i)).toBeInTheDocument();
        expect(queryByText(/min/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Mod", () => {
        let expression = new ModExpression();
        expression.value1.variableName = 'numberList'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/numberList/i)).toBeInTheDocument();
        expect(queryByText(/mod/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Multiply", () => {
        let expression = new MultiplyExpression();
        expression.value1.variableName = 'value1'
        expression.value2.variableName = 'value2'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/value1/i)).toBeInTheDocument();
        expect(queryByText(/value2/i)).toBeInTheDocument();
        expect(queryByText(/\*/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  NotEqual", () => {
        let expression = new NotEqualExpression();
        expression.value1.variableName = 'value1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/value1/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).toBeInTheDocument();
        expect(queryByText(/!=/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Random", () => {
        let expression = new RandomExpression();
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/random number/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Round", () => {
        let expression = new RoundExpression();
        expression.value1.variableName = 'value1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/value1/i)).toBeInTheDocument();
        expect(queryByText(/round/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Substract", () => {
        let expression = new SubstractExpression();
        expression.value1.variableName = 'value1'
        expression.value2.variableName = 'value2'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/value1/i)).toBeInTheDocument();
        expect(queryByText(/value2/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("Math:  Sum", () => {
        let expression = new SumExpression();
        expression.value1.variableName = 'numberList'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/numberList/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  List Combine", () => {
        let expression = new StringListCombineExpression();
        expression.value1.variableName = 'stringList1'
        expression.value2.value = ['1', '2'];
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText, container} = render(<XExpressionEditor expression={exp} />);

        let valueElem = queryByText(expression.value2.value.join(','));

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(valueElem).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        fireEvent.click(valueElem!)
        let valueInput = container.querySelector('.MuiInputBase-root input') as HTMLInputElement;
        expect(valueInput).toHaveFocus();

        expect(errorList).toHaveLength(0);
    });

    it("String:  Combine", () => {
        let expression = new StringCombineExpression();
        expression.value1.variableName = 'stringList1'
        expression.value2.value = 'test';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText, container} = render(<XExpressionEditor expression={exp} />);

        let valueElem = queryByText(expression.value2.value);
        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(valueElem).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        fireEvent.click(valueElem!)
        let valueInput = container.querySelector('.MuiInputBase-root input') as HTMLInputElement;
        expect(valueInput).toHaveFocus();

        expect(errorList).toHaveLength(0);
    });

    it("String:  Contains", () => {
        let expression = new StringContainsExpression();
        expression.value1.variableName = 'stringList1'
        expression.value2.value = 'test';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(expression.value2.value)).toBeInTheDocument();
        expect(queryByText(/contains/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  EndWith", () => {
        let expression = new StringEndWithExpression();
        expression.value1.variableName = 'stringList1'
        expression.value2.value = 'test';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(expression.value2.value)).toBeInTheDocument();
        expect(queryByText(/end with/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  IndexOf", () => {
        let expression = new StringIndexOfExpression();
        expression.value1.variableName = 'stringList1'
        expression.value2.value = 'test';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(expression.value2.value)).toBeInTheDocument();
        expect(queryByText(/index of/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  IsEmpty", () => {
        let expression = new StringIsEmptyExpression();
        expression.value1.variableName = 'stringList1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(/text\.isEmpty/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  IsNotEmpty", () => {
        let expression = new StringIsNotEmptyExpression();
        expression.value1.variableName = 'stringList1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(/text\.isNotEmpty/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  IsValidEmail", () => {
        let expression = new StringIsValidEmailExpression();
        expression.value1.variableName = 'stringList1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(/text\.isEmail/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  Length", () => {
        let expression = new StringLengthExpression();
        expression.value1.variableName = 'stringList1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(/text\.length/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  ListAllIn", () => {
        let expression = new StringListAllInExpression();
        expression.value1.variableName = 'stringList1'
        expression.value2.value = ['1', '2'];
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(expression.value2.value.join(','))).toBeInTheDocument();
        expect(queryByText(/all in/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  ListContains", () => {
        let expression = new StringListContainsExpression();
        expression.value1.variableName = 'stringList1'
        expression.value2.value = 'aaa';
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(/aaa/i)).toBeInTheDocument();
        expect(queryByText(/contains/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  ListGetStringByIndex", () => {
        let expression = new StringListGetStringByIndexExpression();
        expression.value1.value = 2;
        expression.value2.variableName = 'stringList1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(/2/i)).toBeInTheDocument();
        expect(queryByText(/th of/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  ListIn", () => {
        let expression = new StringListInExpression();
        expression.value1.value = 'aaa';
        expression.value2.variableName = 'stringList1'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist1/i)).toBeInTheDocument();
        expect(queryByText(/aaa/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  ListNotAllIn", () => {
        let expression = new StringListNotAllInExpression();
        expression.value1.value = ['aaa', 'bbb'];
        expression.value2.variableName = 'stringList'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist/i)).toBeInTheDocument();
        expect(queryByText(/all not in/i)).toBeInTheDocument();
        expect(queryByText(expression.value1.value.join(','))).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  ListNotContains", () => {
        let expression = new StringListNotContainsExpression();
        expression.value1.value = ['aaa', 'bbb'];
        expression.value2.variableName = 'stringList'
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist/i)).toBeInTheDocument();
        expect(queryByText(/not contains/i)).toBeInTheDocument();
        expect(queryByText(expression.value1.value.join(','))).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  ListNotIn", () => {
        let expression = new StringListNotInExpression();
        expression.value1.variableName = 'stringList'
        expression.value2.value = ['aaa', 'bbb'];
        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringlist/i)).toBeInTheDocument();
        expect(queryByText(/not in/i)).toBeInTheDocument();
        expect(queryByText(expression.value2.value.join(','))).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  Lowercase", () => {
        let expression = new StringLowercaseExpression();
        expression.value1.variableName = 'stringVal'

        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringVal/i)).toBeInTheDocument();
        expect(queryByText(/text\.toLowercase/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  NotContains", () => {
        let expression = new StringNotContainsExpression();
        expression.value1.variableName = 'stringVal'
        expression.value2.value = 'test string'

        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringVal/i)).toBeInTheDocument();
        expect(queryByText(/test string/i)).toBeInTheDocument();
        expect(queryByText(/not contains/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  Proper", () => {
        let expression = new StringProperExpression();
        expression.value1.variableName = 'stringVal'

        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringVal/i)).toBeInTheDocument();
        expect(queryByText(/text\.toPropercase/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  StartWith", () => {
        let expression = new StringStartWithExpression();
        expression.value1.variableName = 'stringVal1'
        expression.value2.variableName = 'stringVal2'

        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringVal1/i)).toBeInTheDocument();
        expect(queryByText(/stringVal2/i)).toBeInTheDocument();
        expect(queryByText(/start with/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  Trim", () => {
        let expression = new StringTrimExpression();
        expression.value1.variableName = 'stringVal'

        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringVal/i)).toBeInTheDocument();
        expect(queryByText(/trim/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

    it("String:  Uppercase", () => {
        let expression = new StringUppercaseExpression();
        expression.value1.variableName = 'stringVal'

        let exp = new XExpressionDefinition();
        exp.expression = expression;

        const {queryByText} = render(<XExpressionEditor expression={exp} />);

        expect(queryByText(/stringVal/i)).toBeInTheDocument();
        expect(queryByText(/text\.touppercase/i)).toBeInTheDocument();
        expect(queryByText(/Click to edit/i)).not.toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });

});
