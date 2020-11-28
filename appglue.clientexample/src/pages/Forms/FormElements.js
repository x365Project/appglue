import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormElements = () => {
  const [customchk, setcustomchk] = useState(true)
  const [customchkPrimary, setcustomchkPrimary] = useState(true)
  const [customchkSuccess, setcustomchkSuccess] = useState(true)
  const [customchkInfo, setcustomchkInfo] = useState(true)
  const [customchkWarning, setcustomchkWarning] = useState(true)
  const [customchkDanger, setcustomchkDanger] = useState(true)
  const [customOutlinePrimary, setcustomOutlinePrimary] = useState(true)
  const [customOutlineSuccess, setcustomOutlineSuccess] = useState(true)
  const [customOutlineInfo, setcustomOutlineInfo] = useState(true)
  const [customOutlineWarning, setcustomOutlineWarning] = useState(true)
  const [customOutlineDanger, setcustomOutlineDanger] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize , settoggleSwitchSize] = useState(true)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Form" breadcrumbItem="Form Elements" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>Textual inputs</CardTitle>
                  <CardSubtitle className="mb-3">
                    Here are examples of <code>.form-control</code> applied to
                    each textual HTML5 <code>&lt;input&gt;</code>{" "}
                    <code>type</code>.
                  </CardSubtitle>

                  <div className="form-group row">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Text
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Artisanal kale"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-search-input"
                      className="col-md-2 col-form-label"
                    >
                      Search
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="search"
                        defaultValue="How do I shoot web"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-email-input"
                      className="col-md-2 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="email"
                        defaultValue="bootstrap@example.com"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-url-input"
                      className="col-md-2 col-form-label"
                    >
                      URL
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="url"
                        defaultValue="https://getbootstrap.com"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-tel-input"
                      className="col-md-2 col-form-label"
                    >
                      Telephone
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="tel"
                        defaultValue="1-(555)-555-5555"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-password-input"
                      className="col-md-2 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="password"
                        defaultValue="hunter2"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-number-input"
                      className="col-md-2 col-form-label"
                    >
                      Number
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="number"
                        defaultValue="42"
                        id="example-number-input"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-datetime-local-input"
                      className="col-md-2 col-form-label"
                    >
                      Date and time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="datetime-local"
                        defaultValue="2019-08-19T13:45:00"
                        id="example-datetime-local-input"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-date-input"
                      className="col-md-2 col-form-label"
                    >
                      Date
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-month-input"
                      className="col-md-2 col-form-label"
                    >
                      Month
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="month"
                        defaultValue="2019-08"
                        id="example-month-input"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-week-input"
                      className="col-md-2 col-form-label"
                    >
                      Week
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="week"
                        defaultValue="2019-W33"
                        id="example-week-input"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-time-input"
                      className="col-md-2 col-form-label"
                    >
                      Time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="time"
                        defaultValue="13:45:00"
                        id="example-time-input"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="example-color-input"
                      className="col-md-2 col-form-label"
                    >
                      Color
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="color"
                        defaultValue="#556ee6"
                        id="example-color-input"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-2 col-form-label">Select</label>
                    <div className="col-md-10">
                      <select className="form-control">
                        <option>Select</option>
                        <option>Large select</option>
                        <option>Small select</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <label className="col-md-2 col-form-label">
                      Custom Select
                    </label>
                    <div className="col-md-10">
                      <select className="custom-select">
                        <option defaultValue>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Sizing</CardTitle>
                  <CardSubtitle className="mb-3">
                    Set heights using classNamees like{" "}
                    <code>.form-control-lg</code> and{" "}
                    <code>.form-control-sm</code>.
                  </CardSubtitle>
                  <div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Default input"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder=".form-control-sm"
                      />
                    </div>
                    <div>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder=".form-control-lg"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Range Inputs</CardTitle>
                  <CardSubtitle className="mb-3">
                    Set horizontally scrollable range inputs using{" "}
                    <code>.form-control-range</code>.
                  </CardSubtitle>

                  <div>
                    <h5 className="font-size-14">Example</h5>
                    <input
                      type="range"
                      className="form-control-range"
                      id="formControlRange"
                    />
                  </div>
                  <div className="mt-4">
                    <h5 className="font-size-14">Custom Range</h5>
                    <input
                      type="range"
                      className="custom-range"
                      id="customRange1"
                    />
                    <input
                      type="range"
                      className="custom-range mt-4"
                      min="0"
                      max="5"
                      id="customRange2"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Checkboxes</CardTitle>

                  <Row>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14 mb-4">
                          Default Checkboxes
                        </h5>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Default checkbox
                          </label>
                        </div>
                        <div className="form-check form-check-right">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck2"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck2"
                          >
                            Default checkbox Right
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14 mb-4">Custom Checkboxes</h5>
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="CustomCheck1"
                            onChange={() => false}
                            checked={customchk}
                          />
                          <label
                            className="custom-control-label"
                            onClick={() => {
                              setcustomchk(!customchk)
                            }}
                          >
                            Custom checkbox
                          </label>
                        </div>

                        <div className="custom-control custom-checkbox custom-control-right">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck2"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck2"
                          >
                            Custom checkbox Right
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14">
                          <i className="mdi mdi-arrow-right text-primary mr-1"></i>{" "}
                          Custom Checkboxes colors
                        </h5>
                        <p className="sub-header mb-4">
                          Add class <code>.custom-checkbox-* </code> for a color
                          Checkboxes
                        </p>

                        <div>
                          <div className="custom-control custom-checkbox custom-checkbox-primary mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheckcolor1"
                              checked={customchkPrimary}
                              onChange={() => {
                                setcustomchkPrimary(!customchkPrimary)
                              }}
                            />

                            <label
                              className="custom-control-label"
                              htmlFor="customCheckcolor1"
                            >
                              Checkbox Primary
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox  custom-checkbox-success mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheckcolor2"
                              checked={customchkSuccess}
                              onChange={() => {
                                setcustomchkSuccess(!customchkSuccess)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckcolor2"
                            >
                              Checkbox Success
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox custom-checkbox-info mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheckcolor3"
                              checked={customchkInfo}
                              onChange={() => {
                                setcustomchkInfo(!customchkInfo)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckcolor3"
                            >
                              Checkbox Info
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox  custom-checkbox-warning mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheckcolor4"
                              checked={customchkWarning}
                              onChange={() => {
                                setcustomchkWarning(!customchkWarning)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckcolor4"
                            >
                              Checkbox Warning
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox custom-checkbox-danger">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheckcolor5"
                              checked={customchkDanger}
                              onChange={() => {
                                setcustomchkDanger(!customchkDanger)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckcolor5"
                            >
                              Checkbox Danger
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14">
                          <i className="mdi mdi-arrow-right text-primary mr-1"></i>{" "}
                          Custom Checkboxes Outline
                        </h5>
                        <p className="sub-header mb-4">
                          Add class <code>custom-checkbox-outline</code> &{" "}
                          <code>.custom-checkbox-* </code> for a color
                          Checkboxes
                        </p>

                        <div>
                          <div className="custom-control custom-checkbox custom-checkbox-outline custom-checkbox-primary mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck-outlinecolor1"
                              checked={customOutlinePrimary}
                              onChange={() => {
                                setcustomOutlinePrimary(!customOutlinePrimary)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck-outlinecolor1"
                            >
                              Checkbox Outline Primary
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox custom-checkbox-outline custom-checkbox-success mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck-outlinecolor2"
                              checked={customOutlineSuccess}
                              onChange={() => {
                                setcustomOutlineSuccess(!customOutlineSuccess)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck-outlinecolor2"
                            >
                              Checkbox Outline Success
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox custom-checkbox-outline custom-checkbox-info mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck-outlinecolor3"
                              checked={customOutlineInfo}
                              onChange={() => {
                                setcustomOutlineInfo(!customOutlineInfo)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck-outlinecolor3"
                            >
                              Checkbox Outline Info
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox custom-checkbox-outline  custom-checkbox-warning mb-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck-outlinecolor4"
                              checked={customOutlineWarning}
                              onChange={() => {
                                setcustomOutlineWarning(!customOutlineWarning)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck-outlinecolor4"
                            >
                              Checkbox Outline Warning
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox custom-checkbox-outline custom-checkbox-danger">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck-outlinecolor5"
                              checked={customOutlineDanger}
                              onChange={() => {
                                setcustomOutlineDanger(!customOutlineDanger)
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck-outlinecolor5"
                            >
                              Checkbox Outline Danger
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle>Radios</CardTitle>

                  <Row>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14 mb-4">Default Radios</h5>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Default radio
                          </label>
                        </div>
                        <div className="form-check form-check-right">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Default radio Right
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14 mb-4">Custom Radios</h5>
                        <div className="custom-control custom-radio mb-3">
                          <input
                            type="radio"
                            id="customRadio1"
                            name="customRadio"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio1"
                          >
                            Toggle this custom radio
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-right">
                          <input
                            type="radio"
                            id="customRadio2"
                            name="customRadio"
                            className="custom-control-input"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio2"
                          >
                            Or toggle this Right custom radio
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14">
                          <i className="mdi mdi-arrow-right text-primary mr-1"></i>{" "}
                          Custom Radio colors
                        </h5>
                        <p className="sub-header mb-4">
                          Add class <code>.custom-radio-* </code> for a color
                          Radios
                        </p>

                        <div>
                          <div className="custom-control custom-radio custom-radio-primary mb-3">
                            <input
                              type="radio"
                              id="customRadiocolor1"
                              name="customRadiocolor1"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiocolor1"
                            >
                              Custom Radio Primary
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-success mb-3">
                            <input
                              type="radio"
                              id="customRadiocolor2"
                              name="customRadiocolor2"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiocolor2"
                            >
                              Custom Radio Success
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-info mb-3">
                            <input
                              type="radio"
                              id="customRadiocolor3"
                              name="customRadiocolor3"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiocolor3"
                            >
                              Custom Radio Info
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-warning mb-3">
                            <input
                              type="radio"
                              id="customRadiocolor4"
                              name="customRadiocolor4"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiocolor4"
                            >
                              Custom Radio Warning
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-danger">
                            <input
                              type="radio"
                              id="customRadiocolor5"
                              name="customRadiocolor5"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiocolor5"
                            >
                              Custom Radio Danger
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xl={3} sm={6}>
                      <div className="mt-4">
                        <h5 className="font-size-14">
                          <i className="mdi mdi-arrow-right text-primary mr-1"></i>{" "}
                          Custom Radio Outline
                        </h5>
                        <p className="sub-header mb-4">
                          Add class <code>custom-radio-outline</code> &{" "}
                          <code>.custom-radio-* </code> for a color Checkboxes
                        </p>

                        <div>
                          <div className="custom-control custom-radio custom-radio-outline custom-radio-primary mb-3">
                            <input
                              type="radio"
                              id="customRadiooutlinecolor1"
                              name="customRadiooutlinecolor1"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiooutlinecolor1"
                            >
                              Radio Outline Primary
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-outline custom-radio-success mb-3">
                            <input
                              type="radio"
                              id="customRadiooutlinecolor2"
                              name="customRadiooutlinecolor2"
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiooutlinecolor2"
                            >
                              Radio Outline Success
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-outline custom-radio-info mb-3">
                            <input
                              type="radio"
                              id="customRadiooutlinecolor3"
                              name="customRadiooutlinecolor3"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiooutlinecolor3"
                            >
                              Radio Outline Info
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-outline custom-radio-warning mb-3">
                            <input
                              type="radio"
                              id="customRadiooutlinecolor4"
                              name="customRadiooutlinecolor4"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiooutlinecolor4"
                            >
                              Radio Outline Warning
                            </label>
                          </div>
                          <div className="custom-control custom-radio custom-radio-outline custom-radio-danger">
                            <input
                              type="radio"
                              id="customRadiooutlinecolor5"
                              name="customRadiooutlinecolor5"
                              className="custom-control-input"
                              defaultChecked
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadiooutlinecolor5"
                            >
                              Radio Outline Danger
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>Switches</CardTitle>
                  <CardSubtitle className="mb-3">
                    A switch has the markup of a custom checkbox but uses the{" "}
                    <code>.custom-switch</code> className to render a toggle
                    switch. Switches also support the <code>disabled</code>{" "}
                    attribute.
                  </CardSubtitle>
                  <Row>
                    <Col lg={6}>
                      <div>
                        <h5 className="font-size-14 mb-3">Switch examples</h5>
                        <div
                          className="custom-control custom-switch mb-2"
                          dir="ltr"
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch1"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch1"
                            onClick={e => {
                              settoggleSwitch(!toggleSwitch)
                            }}
                          >
                            Toggle this switch element
                          </label>
                        </div>
                        <div className="custom-control custom-switch" dir="ltr">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            disabled
                            id="customSwitch2"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitch2"
                          >
                            Disabled switch element
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mt-4 mt-lg-0">
                        <h5 className="font-size-14 mb-3">Switch sizes</h5>

                        <div
                          className="custom-control custom-switch mb-3"
                          dir="ltr"
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitchsizesm"
                            defaultChecked
                            // onClick={() => {
                            //   this.setState({
                            //     toggleSwitchSize: !this.state
                            //       .toggleSwitchSize,
                            //   })
                            // }}
                            onClick={e => {
                        settoggleSwitchSize(!toggleSwitchSize)
                      }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitchsizesm"
                          >
                            Small Size Switch
                          </label>
                        </div>

                        <div
                          className="custom-control custom-switch custom-switch-md mb-3"
                          dir="ltr"
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitchsizemd"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitchsizemd"
                          >
                            Medium Size Switch
                          </label>
                        </div>

                        <div
                          className="custom-control custom-switch custom-switch-lg mb-3"
                          dir="ltr"
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitchsizelg"
                            defaultChecked
                            // onClick={() => {
                            //   this.setState({
                            //     toggleSwitchLarge: !this.state
                            //       .toggleSwitchLarge,
                            //   })
                            // }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitchsizelg"
                          >
                            Large Size Switch
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle>File browser</CardTitle>
                  <CardSubtitle className="mb-3">
                    The file input is the most gnarly of the bunch and requires
                    additional JavaScript if you’d like to hook them up with
                    functional <em>Choose file…</em> and selected file name
                    text.
                  </CardSubtitle>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose file
                    </label>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormElements
