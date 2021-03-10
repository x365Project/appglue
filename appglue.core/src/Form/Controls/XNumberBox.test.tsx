import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { XFormConfiguration } from "../XFormConfiguration";
import { XNumberBox } from "./XNumberBox";
import { XStackContainer } from "../../Form/Containers/XStackContainer";
import { XUserForm } from "../../Form/XUserForm";

describe("XNumberBox", () => {
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
    const control = new XNumberBox();
    control.valueName = "test";
    control.label = "test numberbox label";
    stack.add(control);
    return render(<XUserForm form={form} />);
  };

  it("Control renders as it should", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test numberbox label/i)).toBeInTheDocument();
    expect(getByTestId("test-hinttext")).toBeInTheDocument();
    const numberBox = getByTestId("test").querySelector(
      "input"
    ) as HTMLInputElement;
    expect(numberBox).toBeInTheDocument();
    expect(numberBox).toBeEmptyDOMElement();
  });

  it("Control can change form data", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test numberbox label/i)).toBeInTheDocument();
    expect(getByTestId("test-hinttext")).toBeInTheDocument();
    const numberBox = getByTestId("test").querySelector(
      "input"
    ) as HTMLInputElement;
    expect(numberBox).toBeInTheDocument();
    expect(numberBox).toBeEmptyDOMElement();

    fireEvent.change(numberBox, { target: { value: 5 } });
    await waitFor(() => expect(numberBox).toHaveValue(5));
  });

  it("Control properties are able to be written to and read from JSON", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test numberbox label/i)).toBeInTheDocument();
    expect(getByTestId("test-hinttext")).toBeInTheDocument();
    const numberBox = getByTestId("test").querySelector(
      "input"
    ) as HTMLInputElement;
    expect(numberBox).toBeInTheDocument();
    expect(numberBox).toBeEmptyDOMElement();
    expect(numberBox).toHaveAttribute("type", "number");
    expect(numberBox).toHaveClass("MuiOutlinedInput-input");
  });

  it("Control renders properly when data is missing", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test numberbox label/i)).toBeInTheDocument();
    expect(getByTestId("test-hinttext")).toBeInTheDocument();
    const numberBox = getByTestId("test").querySelector(
      "input"
    ) as HTMLInputElement;
    expect(numberBox).toBeInTheDocument();
    expect(numberBox).toBeEmptyDOMElement();
    expect(form.getFormContext()?.getFormData()).toEqual({});
  });

  it("Control renders properly when data is present", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test numberbox label/i)).toBeInTheDocument();
    expect(getByTestId("test-hinttext")).toBeInTheDocument();
    const numberBox = getByTestId("test").querySelector(
      "input"
    ) as HTMLInputElement;
    expect(numberBox).toBeInTheDocument();
    expect(numberBox).toBeEmptyDOMElement();

    form.getFormContext()?.setFormDataValue("test", 5);
    expect(form.getFormContext()?.getFormDataValue("test")).toEqual(5);
  });

  it("Control acts as expected when data is of the wrong type", async () => {
    const form = new XFormConfiguration();
    const { getByTestId, queryByText } = factory(form);

    expect(queryByText(/test numberbox label/i)).toBeInTheDocument();
    expect(getByTestId("test-hinttext")).toBeInTheDocument();
    const numberBox = getByTestId("test").querySelector(
      "input"
    ) as HTMLInputElement;
    expect(numberBox).toBeInTheDocument();
    expect(numberBox).toBeEmptyDOMElement();

    userEvent.type(numberBox, "10");
    await waitFor(() =>
      expect(form.getFormContext()?.getFormDataValue("test")).not.toEqual(10)
    );
  });

  it("Control displays validation when validation is present", async () => {
  });
});
