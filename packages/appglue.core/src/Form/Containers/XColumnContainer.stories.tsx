import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { XFormDesigner } from "./../XFormDesigner";
import { XFormConfiguration } from "./../XFormConfiguration";
import { getFormConfig } from "../Testing/FormTestData";
import {XUserForm} from "../XUserForm";
import {XColumnContainer, XColumnContainerColumn} from "./XColumnContainer";
import {XTextField} from "../Controls/XTextField";
import {Label} from "@material-ui/icons";
import Typography from "material-ui/styles/typography";
import { WidthUnitInterface } from "../FormDesignConstants";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";


export interface XFormDesignerProps {
    form: XFormConfiguration;
}

export default {
    title: "Form Designer/Layout/Column",
    component: XFormDesigner,
} as Meta;

const Template: Story<XFormDesignerProps> = (args) => <XUserForm {...args} />;

const MissingTemplate: Story<{}> = () => (
    <div>
        Missing
    </div>
);

function getUI(thirdColumn?: boolean) : {form: XFormConfiguration, colContainer: XColumnContainer, col1: XColumnContainerColumn, col2 :XColumnContainerColumn, col3?: XColumnContainerColumn} {
    let ui = new XFormConfiguration();
    let columnContainer = new XColumnContainer();
    let actualCol = new XColumnContainerColumn();
    let actualCol2 = new XColumnContainerColumn();
// show border so we can see
    columnContainer.overrideFormBorderSettings = DefaultOnOff.On;
    columnContainer.showContainerBorder = true;
    columnContainer.defaultShowColumnBorder = true;

    columnContainer.add(actualCol);
    columnContainer.add(actualCol2);
    actualCol.add(new XTextField());
    actualCol.add(new XTextField());
    actualCol.add(new XTextField());
    actualCol2.add(new XTextField());
    actualCol2.add(new XTextField());
    actualCol2.add(new XTextField());
    let actualCol3: XColumnContainerColumn | undefined = undefined;
    if (thirdColumn) {
        let actualCol3 = new XColumnContainerColumn();
        columnContainer.add(actualCol3);
        actualCol3.targetWidth = 200;
        actualCol3.maxSizePx = 200;
        actualCol3.widthUnit = WidthUnitInterface.PIXEL;
        actualCol3.add(new XTextField());
        actualCol3.add(new XTextField());
        actualCol3.add(new XTextField());
    }
    ui.add(columnContainer);

    return {form: ui, colContainer : columnContainer, col1: actualCol, col2: actualCol2, col3: actualCol3};
}

let ui = getUI();

export const TwoColumns50Percent = Template.bind({}, {form: ui.form});

ui = getUI();
ui.col1.targetWidth = 70;
ui.col1.targetWidth = 30;

export const TwoColumns70_30Percent = Template.bind({}, {form: ui.form});

ui = getUI();
ui.col1.targetWidth = 70;
ui.col1.targetWidth = 50;

export const TwoColumns70_50Percent_OVERALLOCATE = Template.bind({}, {form: ui.form});

ui = getUI();
ui.col1.targetWidth = 30;
ui.col1.targetWidth = 60;

export const TwoColumns60_30Percent_UNDERALLOCATE = Template.bind({}, {form: ui.form});
ui = getUI(true);
ui.col1.targetWidth = 10;
ui.col1.minSizePx = 100;
ui.col1.maxSizePx = 100;
ui.col2.targetWidth = 70;
ui.col2.maxSizePx = 300;

export const ThreeColumnsWithSpace = Template.bind({}, {form: ui.form});
ui = getUI(true);
ui.col1.targetWidth = 10;
ui.col1.minSizePx = 200;
ui.col1.maxSizePx = 300;
ui.col2.targetWidth = 70;
ui.col2.maxSizePx = 300;


export const ThreeColumnsWithMinSizes = Template.bind({}, {form: ui.form});

export const ResponsiveLayout = MissingTemplate.bind({}, {});

ui = getUI();
ui.colContainer.lineBetweenColumns = true;
ui.colContainer.defaultShowColumnBorder = false;

export const LineBetweenColumnsNoBorder = Template.bind({}, {form: ui.form});

ui = getUI();
ui.colContainer.paddingBetweenContainerAndColumns = 50;

export const ContainerColumnSpace = Template.bind({}, {form: ui.form});

ui = getUI();
ui.colContainer.gapBetweenColumns = 40;
export const ColumnsSpace = Template.bind({}, {form: ui.form});

ui = getUI();
ui.col1.targetWidth = 30;
ui.col1.targetWidth = 60;
ui.colContainer.containerBackgroundColor = 'blue';
ui.colContainer.defaultColumnBackgroundColor = 'red';
ui.colContainer.defaultShowColumnBorder = true;
ui.colContainer.defaultColumnBorderColor = '#ff0';

export const FromFormColumnColorAndBorder = Template.bind({}, {form: ui.form});

ui = getUI();
ui.col1.targetWidth = 30;
ui.col1.targetWidth = 60;
ui.colContainer.containerBackgroundColor = 'blue';
ui.colContainer.defaultColumnBackgroundColor = 'red';
ui.col1.columnBackgroundColor = 'yellow';

export const ColorsAndBorderOverride = Template.bind({}, {form: ui.form});


ui = getUI();
ui.form.defaultInterControlSpacing = 40;

export const FromSpacingBetweenControls = Template.bind({}, {form: ui.form});

ui = getUI();
ui.form.defaultInterControlSpacing = 40;
ui.col1.interControlSpacing = 10;
ui.col2.interControlSpacing = 50;

export const OverrideSpacingBetweenControls = Template.bind({}, {form: ui.form});


ui = getUI();
ui.form.defaultInnerColumnMargin = 40;

export const FromFormInnerMargin = Template.bind({}, {form: ui.form});

ui = getUI();
ui.form.defaultInnerColumnMargin = 40;
ui.colContainer.defaultInnerColumnMargin = 20;
ui.col2.innerMargin = 80

export const OverrideFormInnerMargin = Template.bind({}, {form: ui.form});
