import React from "react";
import { render, waitFor, fireEvent, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XTextArea } from "./XTextArea";
import { XStackContainer } from "../../Form/Containers/XStackContainer";
import { XUserForm } from "../../Form/XUserForm";

describe("XTextArea", () => {
  let errorList: any[] = [];

  const renderError = (output: string) => {
    errorList.push(output);
  };

  const renderWarn = (output: any) => {
    errorList.push(output);
  };

  const originalError = console.error;
  const originalWarn = console.error;
  const originalLog = console.log;

  beforeEach(() => {
    console.error = renderError;
    console.warn = renderWarn;
  });

  afterEach(() => {
    console.error = originalError;
    console.warn = originalWarn;
    console.log = originalLog;
  });

  const factory = (form: XFormConfiguration) => {
    const stack = new XStackContainer();
    form.add(stack);
    const control = new XTextArea();
    control.valueName = "test";
    control.label = "test textarea label";
    stack.add(control);
    return render(<XUserForm form={form} />);
  };

  it("Control renders as it should", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test textarea label/i)).toBeInTheDocument();
    expect(getByTestId('test-hinttext')).toBeInTheDocument();
    const textarea = getByTestId('test').querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeEmptyDOMElement();

    textarea.setSelectionRange(0, 0);
    userEvent.type(textarea, "blah blah blah");
    await waitFor(() =>
      expect(form.getFormContext()?.getFormDataValue("test")).toEqual(
        "blah blah blah"
      )
    );
    await waitFor(() => expect(textarea).toHaveValue("blah blah blah"));
  });

  it("Control can change form data", async () => {
      const form = new XFormConfiguration();
      const initialFormValues = {
          test: "init form value",
      }
      const newForm = factory(form);
      const formContext = form.getFormContext();
      formContext?.setFormData(initialFormValues);
      const textarea = newForm.getByTestId('test').querySelector('textarea') as HTMLTextAreaElement;

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

  it("Control properties are able to be written to and read from JSON", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test textarea label/i)).toBeInTheDocument();
    expect(getByTestId('test-hinttext')).toBeInTheDocument();
    const textarea = getByTestId('test').querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeEmptyDOMElement();
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveClass("MuiOutlinedInput-input");
  });

  it("Control renders properly when data is missing", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test textarea label/i)).toBeInTheDocument();
    expect(getByTestId('test-hinttext')).toBeInTheDocument();
    const textarea = getByTestId('test').querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeEmptyDOMElement();
    expect(form.getFormContext()?.getFormData()).toEqual({});
  });

  it("Control renders properly when data is present", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);
    
    expect(queryByText(/test textarea label/i)).toBeInTheDocument();
    expect(getByTestId('test-hinttext')).toBeInTheDocument();
    const textarea = getByTestId('test').querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeEmptyDOMElement();

    form.getFormContext()?.setFormDataValue("test", "message")
    expect(form.getFormContext()?.getFormDataValue("test")).toEqual("message");
  });

  it("Control acts as expected when data is of the wrong type", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);
    
    expect(queryByText(/test textarea label/i)).toBeInTheDocument();
    expect(getByTestId('test-hinttext')).toBeInTheDocument();
    const textarea = getByTestId('test').querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeEmptyDOMElement();

    fireEvent.change(textarea, { target: { value: 10 } });
    await waitFor(() =>
      expect(form.getFormContext()?.getFormDataValue("test")).not.toEqual(
        10
      )
    );
  });

  it("Control displays validation when validation is present", async () => {
  });
});
