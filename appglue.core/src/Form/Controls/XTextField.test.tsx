import React from "react";
import { render, waitFor, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XTextField } from "./XTextField";
import { XStackContainer } from "../../Form/Containers/XStackContainer";
import { XUserForm } from "../../Form/XUserForm";
import { TextControlSize, TextControlStyle } from "../FormDesignConstants";
import { FormEditContext } from "../Utilities/FormEditContext";
import { ValidationIssue } from '../../Common/IDesignValidationProvider';
import { XFormAndLayoutDesignPanel } from "../Utilities/XFormAndLayoutDesignPanel"

describe("XTextField", () => {

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
    })

    afterEach(() => {

        console.error = originalError;
        console.warn = originalWarn;
        console.log = originalLog;
    })

    const factory = (form: XFormConfiguration) => {
        const stack = new XStackContainer();
        form.add(stack);
        const control = new XTextField();
        control.valueName = "test";
        control.label = "test label";
        control.hintText = "test hint";
        stack.add(control);
        return render(<XUserForm form={form} />);
    };

    it("renders as it should", async () => {
        const form = new XFormConfiguration();
        const { getByTestId, queryByText } = factory(form);

        expect(queryByText(/test label/i)).toBeInTheDocument();
        const textField = getByTestId("test");
        const textbox = within(textField).getByRole("textbox");
        expect(textbox).toBeInTheDocument();
        expect(textbox).toBeEmptyDOMElement();
        userEvent.type(textbox, "blah blah blah");
        waitFor(() => expect(textbox).toHaveValue("blah blah blah"));
        expect(form.getFormRuntimeContext()?.getFormDataValue("test")).toEqual("blah blah blah");
        expect(queryByText(/test hint/i)).toBeInTheDocument();
    });

    it("control reads/writes form data properly", async () => {
        const form = new XFormConfiguration();
        const initialFormValues = {
            test: "init form data",
        }
        const newForm = factory(form);
        const formContext = form.getFormRuntimeContext();
        formContext?.setFormData(initialFormValues);
        const textField = newForm.getByTestId('test');
        const textbox = within(textField).getByRole("textbox");

        let compareValues = {
            test: "init form data",
        }
        expect(textbox).toBeInTheDocument();
        expect(textbox).toBeEmptyDOMElement();
        expect(formContext?.getFormData()).toEqual(compareValues);

        compareValues = {
            test: "text area change",
        }
        fireEvent.change(textbox, { target: {value: "text area change"}})
        expect(formContext?.getFormData()).toEqual(compareValues);
        expect(textbox).toHaveValue("text area change");
    });

    it("configure form and text box", async () => {
        const form = new XFormConfiguration();
        const firstForm = factory(form);
        const textField = firstForm.getByTestId("test");
        const textbox = within(textField).getByRole("textbox");
        userEvent.type(textbox, "blah blah blah?");
        expect(textbox).toHaveClass('MuiOutlinedInput-input');
        expect(textbox).toHaveValue("blah blah blah?");
        
        let newForm = new XFormConfiguration();
        const secondForm = render(<XUserForm form={newForm} />);
        let newTextField = secondForm.getByTestId('test');
        const newTextbox = within(newTextField).getByRole("textbox");
        expect(newTextbox).toHaveValue("blah blah blah?");
        expect(secondForm.queryByText(/test label/i)).toBeInTheDocument();
        expect(secondForm.queryByText(/test hint/i)).toBeInTheDocument();
    });

    it("Check override the size and style", () => {
        const form = new XFormConfiguration();
        form.defaultTextSize = TextControlSize.SMALL;
        form.defaultTextStyle = TextControlStyle.OUTLINE;

        let {container, getByTestId} = factory(form);
        expect(container.querySelector(`[data-size="${TextControlSize.SMALL}"]`)).toBeInTheDocument();
        expect(container.querySelector(`[data-role="${TextControlStyle.OUTLINE}"]`)).not.toBeInTheDocument();
        expect(getByTestId('test-hinttext')).toHaveTextContent(/test hint/i);

    });

    it("Check design validation display", () => {
        const form = new XFormConfiguration();
        let ui = new FormEditContext(form);        
        form.setFormEditContext(ui);
        const stack = new XStackContainer();
        form.add(stack);
        const control = new XTextField();
        control.valueName = "test";
        control.label = "test label";
        control.hintText = "test hint";
        stack.add(control);
        
        ui.runtimeValidationProvider = {
            getRuntimeValidationIssues: (): ValidationIssue[] => {
                let issues: ValidationIssue[] = [];
                if (form.getFormRuntimeContext()?.getFormDataValue('test')) {
                    issues.push(new ValidationIssue('Value is required', undefined, control.id));
                }
                return issues;
            }
        }

        const {container, getByTestId} = render(<XFormAndLayoutDesignPanel editContext={ui} />);
        const helpText = getByTestId('test-hinttext');
        expect(helpText).toBeInTheDocument();
    });
});
