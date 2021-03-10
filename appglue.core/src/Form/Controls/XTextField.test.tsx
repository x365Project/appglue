import React from "react";
import {
  render,
  waitFor,
  within,
  fireEvent,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XTextField } from "./XTextField";
import { XStackContainer } from "../../Form/Containers/XStackContainer";
import { XUserForm } from "../../Form/XUserForm";
import { TextControlSize, TextControlStyle } from "../FormDesignConstants";

describe("XTextField", () => {
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
    const control = new XTextField();
    control.valueName = "test";
    control.label = "test label";
    stack.add(control);
    return render(<XUserForm form={form} />);
  };

  it("Control renders as it should", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test label/i)).toBeInTheDocument();
    expect(getByTestId("test-hinttext")).toBeInTheDocument();
    const textField = getByTestId("test");
    const textbox = within(textField).getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeEmptyDOMElement();
  });

  it("Control can change form data", async () => {
    const form = new XFormConfiguration();
    const initialFormValues = {
      test: "init form data",
    };
    const newForm = factory(form);
    const formContext = form.getFormContext();
    formContext?.setFormData(initialFormValues);
    const textField = newForm.getByTestId("test");
    const textbox = within(textField).getByRole("textbox");

    let compareValues = {
      test: "init form data",
    };
    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeEmptyDOMElement();
    expect(formContext?.getFormData()).toEqual(compareValues);

    compareValues = {
      test: "text area change",
    };
    userEvent.type(textbox, "text area change");
    expect(formContext?.getFormData()).toEqual(compareValues);
    expect(textbox).toHaveValue("text area change");
  });

  it("Control properties are able to be written to and read from JSON", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test label/i)).toBeInTheDocument();
    const textField = getByTestId("test");
    const textbox = within(textField).getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeEmptyDOMElement();
    expect(textbox).toHaveAttribute("type", "text");
    expect(textbox).toHaveClass("MuiOutlinedInput-input");
  });

  it("Control renders properly when data is missing", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);
    const textField = getByTestId("test");
    const textbox = within(textField).getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeEmptyDOMElement();
    expect(form.getFormContext()?.getFormData()).toEqual({});
  });

  it("Control renders properly when data is present", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);
    const textField = getByTestId("test");
    const textbox = within(textField).getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeEmptyDOMElement();
    form.getFormContext()?.setFormDataValue("test", "firstname")
    expect(form.getFormContext()?.getFormDataValue("test")).toEqual("firstname");
  });

  it("Control acts as expected when data is of the wrong type", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);
    const textField = getByTestId("test");
    const textbox = within(textField).getByRole("textbox");
    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeEmptyDOMElement();
    fireEvent.change(textbox, { target: { value: 10 } });
    waitFor(() =>
      expect(form.getFormContext()?.getFormDataValue("test")).not.toEqual(
        10
      )
    );
  });

  it("Control displays validation when validation is present", async () => {
  });

  it("Check override the size and style", () => {
      const form = new XFormConfiguration();
      form.defaultTextSize = TextControlSize.SMALL;
      form.defaultTextStyle = TextControlStyle.OUTLINE;

      let {container} = factory(form);
      expect(container.querySelector(`[data-size="${TextControlSize.SMALL}"]`)).toBeInTheDocument();
      expect(container.querySelector(`[data-role="${TextControlStyle.OUTLINE}"]`)).not.toBeInTheDocument();
  });
});
