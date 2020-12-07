import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { XFormAndLayoutDesignPanel } from "./XFormAndLayoutDesignPanel"
import { XFormConfiguration } from '../XFormConfiguration';
import { getFormConfig } from "../Testing/FormTestData";
import { FormContext } from './FormContext';
import { FormMode } from '../FormDesignConstants';
import { XStackContainer } from '../Containers/XStackContainer';
import { XTextField } from '../Controls/XTextField';
import { XBaseControl } from '../Controls/XBaseControl';
import { ValidationIssue, ValidationLevel } from '../../Common/IDesignValidationProvider';
import { XHStackContainer } from '../Containers/XHStackContainer';
import { XColumnContainer } from '../Containers/XColumnContainer';

describe("InternalUserFormDesignPanel", () => {


    let errorList: any[] = [];

    const renderError = (output: string) => {
        errorList.push(output);
    };

    const renderWarn = (output: any) => {
        errorList.push(output);
    }

    const renderLog = (_output: any) => {
        return;
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

    it("Renders FormDesign Mode empty XFormAndLayoutDesignPanel component correctly", () => {
        let ui: FormContext;

        let form: XFormConfiguration = new XFormConfiguration()
        ui = new FormContext(form);
    
        ui.form.setFormContext(ui);

        const { getByText } = render(<XFormAndLayoutDesignPanel editContext={ui} />);

        expect(errorList).toHaveLength(0);

        // Design Toolbox in design mode
        expect(getByText(/EDIT FORM DEFAULTS/i)).toBeInTheDocument();
        expect(getByText(/Text Field/i)).toBeInTheDocument();
        expect(getByText(/Text Area/i)).toBeInTheDocument();
        expect(getByText(/^Checkbox$/g)).toBeInTheDocument();
        expect(getByText(/Switch/i)).toBeInTheDocument();
        expect(getByText(/Date Picker/i)).toBeInTheDocument();
        expect(getByText(/Time Picker/i)).toBeInTheDocument();
        expect(getByText(/Numberbox/i)).toBeInTheDocument();
        expect(getByText(/Slider Control/i)).toBeInTheDocument();
        expect(getByText(/Selectbox/i)).toBeInTheDocument();
        expect(getByText(/CheckboxList/i)).toBeInTheDocument();
        expect(getByText(/Radio Button Group/i)).toBeInTheDocument();
        expect(getByText(/^Button Group$/g)).toBeInTheDocument();
        expect(getByText(/Heading/i)).toBeInTheDocument();
        expect(getByText(/Label/i)).toBeInTheDocument();
        expect(getByText(/^Button$/g)).toBeInTheDocument();
        
    });


    it("Renders Layout Mode empty XFormAndLayoutDesignPanel component correctly", () => {
        let ui: FormContext;

        let form: XFormConfiguration = new XFormConfiguration()
        ui = new FormContext(form);
        ui.mode = FormMode.LayoutDesign;

        ui.form.setFormContext(ui);

        const { getByText } = render(<XFormAndLayoutDesignPanel editContext={ui} />);
        expect(errorList).toHaveLength(0);

        // Design Toolbox in Layout mode
        expect(getByText(/EDIT FORM DEFAULTS/i)).toBeInTheDocument();
        expect(getByText(/^Stack Container$/g)).toBeInTheDocument();
        expect(getByText(/Columns/i)).toBeInTheDocument();
        expect(getByText(/Horizontal Stack Container/i)).toBeInTheDocument();
        
    });


    it("Renders XFormAndLayoutDesignPanel component correctly with full", () => {
        let form = getFormConfig();
        let ui = new FormContext(form);

        form.setFormContext(ui);

        const { getByText } = render(<XFormAndLayoutDesignPanel editContext={ui} />);

        expect(errorList).toHaveLength(0);
        
        expect(getByText(/EDIT FORM DEFAULTS/i)).toBeInTheDocument();

        expect(getByText(/Person Information/i)).toBeInTheDocument();
    });


    it("Check the selected controls", () => {
        let form = getFormConfig();
        let ui = new FormContext(form);

        form.setFormContext(ui);

        const ref = React.createRef<XFormAndLayoutDesignPanel>()
        const { getByTestId, container, getByText } = render(<XFormAndLayoutDesignPanel editContext={ui} ref={ref} />);

        let overlayDiv = getByTestId('firstName').closest('div[data-testid="control-wrapper"]')!.querySelector('div[data-testid="control-click-div"]')!;

        expect(overlayDiv).toBeInTheDocument();

        fireEvent.click(overlayDiv);
        expect(container.querySelector('.config-form-header')).toBeInTheDocument();
        expect(getByText(/Text Field \[firstName\]/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
        
    });

    it("Check the selection layouts", () => {
        let form = getFormConfig();
        let ui = new FormContext(form);
        ui.mode = FormMode.LayoutDesign;
        form.setFormContext(ui);

        const ref = React.createRef<XFormAndLayoutDesignPanel>()

        // hook to the update
        ui.onDesignerUpdate = () => {
            ref.current?.forceUpdate();
        }

        const {container, getByTestId, getByText} = render(<XFormAndLayoutDesignPanel editContext={ui} ref={ref} />);
        let overlayDiv = getByTestId(form.getContainers()[0].id).querySelector('div[data-test="container-click-div"]')!;
        expect(overlayDiv).toBeInTheDocument();
        fireEvent.click(overlayDiv);
        expect(container.querySelector('.config-form-header')).toBeInTheDocument();
        expect(getByText(/Edit: Stack Container/i)).toBeInTheDocument();

        expect(errorList).toHaveLength(0);

    });

    it("Check the design validation", () => {
        let form = new XFormConfiguration();
        let stack = new XStackContainer();
        let textField = new XTextField();
        textField.valueName = 'ttt';
        textField.label = 'Text';
        stack.add(textField);

        let errorField = new XTextField();
        errorField.label = 'Label';

        stack.add(errorField);

        form.add(stack)
        let ui = new FormContext(form);
        form.setFormContext(ui);

        ui.designValidationProvider = {
            getDesignValidationIssues: (): ValidationIssue[] => {
                let breaks: ValidationIssue[] = [];
                for (let c of form.getAllControls()) {
                    const valueName = Reflect.get(c, 'valueName');
                    if (valueName && valueName.length < 6) {
                        breaks.push(
                            new ValidationIssue('valueName must have at least 6 characters', valueName, c.id, ValidationLevel.WARNING)
                        )
                    }
                }
                return breaks;
            }
        }
        ui.computeDesignValidationIssues();

        const {getByTestId} = render(<XFormAndLayoutDesignPanel editContext={ui} />);
        const errorNotification = getByTestId('error-notification');
        const warnNotification = getByTestId('warn-notification');

        expect(warnNotification).toBeInTheDocument();
        expect(errorNotification).toBeInTheDocument();

        const cErrorNotification = getByTestId('control-error-validation');
        const cWarnNotification = getByTestId('control-warn-validation');

        expect(cErrorNotification).toBeInTheDocument();
        expect(cWarnNotification).toBeInTheDocument();

        expect(errorList).toHaveLength(0);

    });



    it("Check the pin section", () => {
        let form = getFormConfig();

        form.doNotScrollFirstContainerOnForm = true;
        form.doNotScrollLastContainerOnForm = true;

        let ui = new FormContext(form);
    
        form.setFormContext(ui);

        const {getByTestId} = render(<XFormAndLayoutDesignPanel editContext={ui} />);
        expect(getByTestId('pin-first-container')).toBeInTheDocument();
        expect(getByTestId('pin-middle-container')).toBeInTheDocument();
        expect(getByTestId('pin-last-container')).toBeInTheDocument();

        expect(errorList).toHaveLength(0);
    });


    it("Check the empty container in Form Design", () => {
        let form = new XFormConfiguration();

        let stack = new XStackContainer();
        form.add(stack);

        let ui = new FormContext(form);
        form.setFormContext(ui);

        let hstack = new XHStackContainer();
        form.add(hstack);

        let columnContainer = new XColumnContainer();
        form.add(columnContainer);

        const {getAllByText} = render(<XFormAndLayoutDesignPanel editContext={ui} />);

        expect(getAllByText('Drag controls from toolbox.')).toHaveLength(4);

        expect(errorList).toHaveLength(0);
    });


    it("Check the empty container in Layout Mode", () => {
        let form = new XFormConfiguration();

        let stack = new XStackContainer();
        form.add(stack);

        let ui = new FormContext(form);
        ui.mode = FormMode.LayoutDesign;
        form.setFormContext(ui);

        let hstack = new XHStackContainer();
        form.add(hstack);

        let columnContainer = new XColumnContainer();
        form.add(columnContainer);

        const {getAllByText} = render(<XFormAndLayoutDesignPanel editContext={ui} />);

        expect(getAllByText('Add controls in the form design tab')).toHaveLength(4);

        expect(errorList).toHaveLength(0);
    });
});
