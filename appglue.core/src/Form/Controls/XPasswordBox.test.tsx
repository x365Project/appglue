import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XPasswordBox } from "./XPasswordBox";
import { XStackContainer } from "../Containers/XStackContainer";
import { XUserForm } from "../XUserForm";

describe("XPasswordBox", () => {

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
        const control = new XPasswordBox();
        control.valueName = "test";
        control.label = "test label";
        control.hintText = "test hint";
        stack.add(control);
        return render(<XUserForm form={form} />);
    };

    it("renders as it should", () => {
        const form = new XFormConfiguration();
        const { getByTestId, queryByText } = factory(form);

        expect(queryByText(/test label/i)).toBeInTheDocument();
        const passwordBox = getByTestId("test").querySelector('input') as HTMLInputElement;
        expect(passwordBox).toBeInTheDocument();
        expect(passwordBox).toBeEmptyDOMElement();
        userEvent.type(passwordBox, "blah blah blah");
        expect(passwordBox).toHaveValue("blah blah blah");
        expect(form.getFormContext()?.getFormDataValue("test")).toEqual("blah blah blah");
        expect(getByTestId('test-hinttext')).toBeInTheDocument();
    });

    it("control reads/writes form data properly", () => {
        const form = new XFormConfiguration();
        const initialFormValues = {
            test: "init form value",
        }
        const newForm = factory(form);
        const formContext = form.getFormContext();
        formContext?.setFormData(initialFormValues);
        const passwordBox = newForm.getByTestId('test').querySelector('input') as HTMLInputElement;
        
        let compareValues = {
            test: "init form value",
        }
        expect(passwordBox).toBeInTheDocument();
        expect(passwordBox).toBeEmptyDOMElement();
        expect(formContext?.getFormData()).toEqual(compareValues);

        fireEvent.change(passwordBox, { target: {value: "password init"}})
        compareValues = {
            test: "password init",
        }
        expect(formContext?.getFormData()).toEqual(compareValues);
        expect(passwordBox).toHaveValue("password init");
    });

    it("configure form and password", () => {
        const form = new XFormConfiguration();
        const firstForm = factory(form);
        const passwordBox = firstForm.getByTestId('test').querySelector('input') as HTMLInputElement;
        fireEvent.change(passwordBox, { target: {value: "password init"}})
        expect(passwordBox).toBeInTheDocument();
        expect(passwordBox).toBeEmptyDOMElement();
        expect(passwordBox).toHaveValue("password init");
        
        let newForm = new XFormConfiguration();
        const secondForm = render(<XUserForm form={newForm} />);
        let newTextArea = secondForm.getByTestId('test').querySelector('input') as HTMLInputElement;
        expect(newTextArea).toBeInTheDocument();
        expect(newTextArea).toBeEmptyDOMElement();
        expect(newTextArea).toHaveValue("password init");
        expect(secondForm.queryByText(/test label/i)).toBeInTheDocument();
    });
});
