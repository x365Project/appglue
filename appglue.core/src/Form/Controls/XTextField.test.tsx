import React from "react";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XTextField } from "./XTextField";
import { XStackContainer } from "../../Form/Containers/XStackContainer";
import { XUserForm } from "../../Form/XUserForm";
import { TextControlSize, TextControlStyle } from "../FormDesignConstants";
import { FormEditContext } from "../Utilities/FormEditContext";
import { XFormAndLayoutDesignPanel } from "../Utilities/XFormAndLayoutDesignPanel";

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
        // console.log = renderLog
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

    it("renders correctly by default props and available to type", async () => {
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
            test: "blah blah blah",
        }
        const formContext = form.getFormRuntimeContext();
        formContext?.setFormData(initialFormValues);
        const { getByTestId } = factory(form);
        const textField = getByTestId("test");
        const textbox = within(textField).getByRole("textbox");
        waitFor(() => expect(textbox).toHaveValue("blah blah blah"));
        userEvent.type(textbox, "new content");
        const changedFromValues = {
            test: "new content",
        }
        waitFor(() => expect(formContext?.getFormData()).toEqual(changedFromValues));
    });

    it("Check override the size and style", () => {
        const form = new XFormConfiguration();
        form.defaultTextSize = TextControlSize.SMALL;
        form.defaultTextStyle = TextControlStyle.OUTLINE;

        let {container, getByTestId} = factory(form);
        expect(container.querySelector(`[data-size="${TextControlSize.SMALL}"][data-role="${TextControlStyle.OUTLINE}"]`)).toBeInTheDocument();
        expect(getByTestId('test-hinttext')).toHaveTextContent(/test hint/i);

    });

    it("Check design validation display", () => {
        const form = new XFormConfiguration();
        form.defaultTextSize = TextControlSize.SMALL;
        form.defaultTextStyle = TextControlStyle.OUTLINE;
        const stack = new XStackContainer();
        form.add(stack);
        const control = new XTextField();
        control.label = "test label";
        stack.add(control);
        const ui = new FormEditContext(form);
        form.setFormEditContext(ui);
        const {getByTestId} = render(<XFormAndLayoutDesignPanel editContext={ui} />);
        expect(getByTestId('control-error-validation')).toBeInTheDocument();
    });
});
