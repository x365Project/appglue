import {UserFormData} from "../UserFormData";
import {XTextField} from "../Controls/XTextField";
import {XTextArea} from "../Controls/XTextArea";
import {XCheckboxField} from "../Controls/XCheckboxField";
import {XSelectbox} from "../Controls/XSelectbox";
import {XHeading} from "../Controls/XHeading";
import {XLabel} from "../Controls/XLabel";
import {XButton} from "../Controls/XButton";
import {XSwitch} from "../Controls/XSwitch";
import {XCheckboxList} from "../Controls/XCheckboxList";

import {
  XColumnContainer, 
  XColumnContainerColumn,
  XStackContainer,
  XHStackContainer,
  XTabContainer,
	XTabContainerTab,
	XTabContainerTabContent,
	XTabContainerTabHeader
} from "../Containers";

import {XRadioGroup} from '../Controls/XRadioGroup';
import {XFormConfiguration} from "../XFormConfiguration";
import {XDatePicker} from '../Controls/XDatePicker';
import {XTimePicker} from '../Controls/XTimePicker';
import {XNumberBox} from "../Controls/XNumberBox";
import {XSlider} from "../Controls/XSlider";
import {XButtonGroup} from "../Controls/XButtonGroup";
import {WidthUnitInterface} from "../FormDesignConstants";
import { DefaultOnOff } from "../Utilities/DefaultOnOff";


// this is temporary code to create form definition.
// eventually, this form will be read in from JSON and written to JSON... even though I think that
// this might be useful pattern to create test scripts.

export function getFormData() : UserFormData {
  let formData = new UserFormData();
  formData['firstName'] = 'Carl';
  formData['lastName'] = 'Hewitt';
  formData['testdata'] = '';
  formData['age'] = 28;

  return formData;
}

export function getFormConfig(): XFormConfiguration {

  let heading = new XHeading();
  heading.text = "Person Information";
  heading.type = "h3";
  heading.wordwrap = true;

  let label = new XLabel();
  label.text = " Enter Information Below";

  let composite2 = new XTextField();
  composite2.label = 'first name';
  composite2.valueName = 'firstName';


  let composite3 = new XTextField();
  composite3.label = 'last name';
  composite3.valueName = 'lastName';

  let compositeCheckbox = new XCheckboxField();
  compositeCheckbox.label = 'Is Male';
  compositeCheckbox.valueName = 'isMale';


  let numberBox = new XNumberBox();
  numberBox.label = 'Age';
  numberBox.valueName = 'age';

  let compositeCheckList = new XCheckboxList();
  compositeCheckList.label = "Software Used"
  compositeCheckList.list = ["Upwork", "Hubstaff", 'Google Sites']

  let selectBox = new XSelectbox();
  selectBox.valueName='selectLabel'
  selectBox.list = ['Pizza', 'Cake', 'Beer', 'Candy'];

  let textbox = new XTextArea();
  textbox.valueName = 'personDescription'
  textbox.rowMax = 20;
  textbox.rowMin = 7;
  textbox.placeholderText = 'enter description of person';

  let radioButtonGroup = new XRadioGroup();
  radioButtonGroup.valueName = 'tester';
  radioButtonGroup.label = 'Happy to be tester';
  radioButtonGroup.list = ['Yes', 'No', 'Indifferent'];



  let button = new XButton();
  button.label = 'Submit';
  let button2 = new XButton();
  button.label = 'Cancel';

  let switchMe = new XSwitch();
  switchMe.label = 'isAlive';
  switchMe.valueName = 'isAlive';

  let datePicker = new XDatePicker();
  datePicker.label = 'Birthday';
  datePicker.valueName = 'birthday';

  let timePicker = new XTimePicker();
  timePicker.label = 'Favorite Time Of Day';
  timePicker.valueName = 'favoriteTime';

  let slider = new XSlider();
  slider.step = 10;
  slider.min = 0;
  slider.max = 100;
  slider.label = 'Skill Level';
  slider.valueName = 'skillLevel';

  let buttonGroup = new XButtonGroup();
  buttonGroup.label = 'Skills';
  buttonGroup.valueName = 'skills';
  buttonGroup.list = ['React', 'Typescript', 'NodeJS'];


  let colContainer = new XColumnContainer();
  colContainer.lineBetweenColumns = false;
  let container1 = new XColumnContainerColumn();

  container1.targetWidth = 20;
  container1.widthUnit = WidthUnitInterface.PERCENTAGE;
  colContainer.add(container1);

  [1, 2, 3].map((value) => {
    let composite = new XTextField();
    composite.label = "Facts " + value;
    composite.valueName = 'otherdata_' + value;
    container1.add(composite);
    return value;
  })

  let container2 = new XColumnContainerColumn();

  container2.targetWidth = 70;
  container2.widthUnit = WidthUnitInterface.PERCENTAGE;
  colContainer.add(container2);

  [1, 2, 3].map((value) => {
    let composite = new XTextField();
    composite.label = 'Other Facts ' + value;
    composite.valueName = 'otherdata2_' + value;
    container2.add(composite);
    return value;
  })

  let container3 = new XColumnContainerColumn();

  container3.targetWidth = 20;
  container3.overrideFormBorderSettings = DefaultOnOff.On;
  container3.showColumnBorder = true;
  container3.widthUnit = WidthUnitInterface.PERCENTAGE;
  colContainer.add(container3);

  [1, 2, 3].map((value) => {
    let composite = new XTextField();
    composite.label = 'More Facts ' + value ;
    composite.valueName = 'otherdata3_' + value;
    container3.add(composite);
    return value;
  })


  

  let container = new XStackContainer();
  container.add(label);
  container.add(composite2);
  container.add(composite3);
  container.add(switchMe);
  container.add(numberBox);
  container.add(compositeCheckbox);
  container.add(selectBox);
  container.add(textbox);
  container.add(radioButtonGroup);
  container.add(compositeCheckList);
  container.add(datePicker);
  container.add(timePicker);
  container.add(slider);
  container.add(buttonGroup);

  let headingContainer = new XStackContainer();
  headingContainer.add(heading);


  let hstack = new XHStackContainer();
  hstack.add(button);
  hstack.add(button2);



  let ui = new XFormConfiguration([headingContainer, container, colContainer, hstack]);
  // todo: come back here
  //ui.setFormData(formData);



  // test code to start the process of writing out a json representation of the form
  try {
    let s = JSON.stringify(ui.getStorageData(), null, 2);


    // console.log('************ Written Out *************');
    // console.log( s);
    // console.log('************ Written Out *************');

    let sasobj = JSON.parse(s);

    let newUI = new XFormConfiguration();
    newUI.setStorageData(sasobj);

    // console.log(newUI);

    //        let news =
    JSON.stringify(newUI.getStorageData(), null, 2);

    // console.log('************ READ IN - Written Out *************');
    // console.log( news);
    // console.log('************ READ IN -  Written Out *************');

    //   return newUI;
  } catch {
    console.log(ui.getStorageData());

  }

  return ui;
}
