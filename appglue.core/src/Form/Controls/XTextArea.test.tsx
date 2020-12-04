import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XTextArea } from "./XTextArea";
import { XStackContainer } from "../../Form/Containers/XStackContainer";
import { XUserForm } from "../../Form/XUserForm";
import { TextControlSize, TextControlStyle } from "../FormDesignConstants";
import { FormEditContext } from "../Utilities/FormEditContext";
import { XFormAndLayoutDesignPanel } from "../Utilities/XFormAndLayoutDesignPanel";

describe("XTextArea", () => {
    const factory = (form: XFormConfiguration) => {
        const stack = new XStackContainer();
        form.add(stack);
        const control = new XTextArea();
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
        const textarea = getByTestId("test");
        expect(textarea).toBeInTheDocument();
        expect(textarea).toBeEmptyDOMElement();
        userEvent.type(textarea, "blah blah blah");
        waitFor(() => expect(textarea).toHaveValue("blah blah blah"));
        waitFor(() => expect(form.getFormRuntimeContext()?.getFormDataValue("test")).toEqual("blah blah blah"));
        waitFor(() => expect(queryByText(/test hint/i)).toBeInTheDocument());
    });

    it("control reads/writes form data properly", async () => {
        const form = new XFormConfiguration();
        const initialFormValues = {
            test: "init form value",
        }
        const newForm = factory(form);
        const formContext = form.getFormRuntimeContext();
        formContext?.setFormData(initialFormValues);
        const textarea = newForm.getByTestId('test');
        
        let compareValues = {
            test: "init form value",
        }
        expect(textarea).toBeInTheDocument();
        expect(textarea).toBeEmptyDOMElement();
        expect(formContext?.getFormData()).toEqual(compareValues);

        fireEvent.change(textarea, { target: {value: "text area init"}})
        compareValues = {
            test: "text area init",
        }
        expect(formContext?.getFormData()).toEqual(compareValues);
        expect(textarea).toHaveValue("text area init");
    });

    it("configure form and text area", async () => {
        const form = new XFormConfiguration();
        const firstForm = factory(form);
        const textarea = firstForm.getByTestId('test');
        fireEvent.change(textarea, { target: {value: "text area init"}})
        expect(textarea).toBeInTheDocument();
        expect(textarea).toBeEmptyDOMElement();
        expect(textarea).toHaveValue("text area init");
        
        let newForm = new XFormConfiguration();
        const secondForm = render(<XUserForm form={newForm} />);
        let newTextArea = secondForm.getByTestId('test');
        expect(newTextArea).toBeInTheDocument();
        expect(newTextArea).toBeEmptyDOMElement();
        expect(newTextArea).toHaveValue("text area init");
        expect(secondForm.queryByText(/test label/i)).toBeInTheDocument();
        expect(secondForm.queryByText(/test hint/i)).toBeInTheDocument();
    });

    it("Check design validation display", () => {
        const form = new XFormConfiguration();
        let {getByTestId} = factory(form);
        
        const helpText = getByTestId('test-hinttext');
        expect(helpText).toBeInTheDocument();
        expect(helpText).toHaveClass("Mui-error");
    });
});
