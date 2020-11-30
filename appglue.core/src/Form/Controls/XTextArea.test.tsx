import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XTextArea } from "./XTextArea";
import { XStackContainer } from "../../Form/Containers/XStackContainer";
import { XUserForm } from "../../Form/XUserForm";

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

    it("renders correctly by default props and available to type", async () => {
        const form = new XFormConfiguration();
        const { getByTestId, queryByText } = factory(form);

        expect(queryByText(/test label/i)).toBeInTheDocument();
        const textarea = getByTestId("test");
        expect(textarea).toBeInTheDocument();
        expect(textarea.nodeValue).toBeNull();
        userEvent.type(textarea, "blah blah blah");
        waitFor(() => expect(textarea.nodeValue).toEqual("blah blah blah"));
        waitFor(() => expect(form.getFormRuntimeContext()?.getFormDataValue("test")).toEqual("blah blah blah"));
        // TODO: ensure that hint text is rendered correctly
        waitFor(() => expect(queryByText(/test hint/i)).toBeInTheDocument());
    });

    it("properties should be able to be written to and read from JSON", async () => {
        const form = new XFormConfiguration();
        const initialFormValues = {
            test: "blah blah blah",
        }
        const formContext = form.getFormRuntimeContext();
        formContext?.setFormData(initialFormValues);
        const { getByTestId } = factory(form);
        const textarea = getByTestId("test");
        waitFor(() => expect(textarea.nodeValue).toEqual("blah blah blah"));
        userEvent.type(textarea, "new content");
        const changedFromValues = {
            test: "new content",
        }
        waitFor(() => expect(formContext?.getFormData()).toEqual(changedFromValues));
    });
});
