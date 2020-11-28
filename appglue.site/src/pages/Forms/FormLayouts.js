import React from "react"

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormLayouts = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Form" breadcrumbItem="Form Layouts" />
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Form grid layout</CardTitle>

                  <Form>
                    <FormGroup>
                      <Label for="formrow-firstname-Input">First name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="formrow-firstname-Input"
                      />
                    </FormGroup>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-email-Input">Email</Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="formrow-email-Input"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-password-Input">Password</Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="formrow-password-Input"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4}>
                        <FormGroup>
                          <Label for="formrow-InputCity">City</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-InputCity"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup>
                          <Label for="formrow-InputState">State</Label>
                          <select
                            id="formrow-InputState"
                            className="form-control"
                          >
                            <option>Choose...</option>
                            <option>...</option>
                          </select>
                        </FormGroup>
                      </Col>

                      <Col lg={4}>
                        <FormGroup>
                          <Label for="formrow-InputZip">Zip</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-InputZip"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <div className="custom-control custom-checkbox custom-control-inline">
                        <Input
                          type="checkbox"
                          className="custom-control-Input"
                          id="formrow-customCheck"
                        />
                        <Label
                          className="custom-control-Label"
                          for="formrow-customCheck"
                        >
                          Check me out
                        </Label>
                      </div>
                    </FormGroup>
                    <div>
                      <button type="submit" className="btn btn-primary w-md">
                        Submit
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Horizontal form layout</CardTitle>

                  <Form>
                    <FormGroup className="row mb-4">
                      <Label
                        for="horizontal-firstname-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        First name
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          className="form-control"
                          id="horizontal-firstname-Input"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="row mb-4">
                      <Label
                        for="horizontal-email-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        Email
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="email"
                          className="form-control"
                          id="horizontal-email-Input"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="row mb-4">
                      <Label
                        for="horizontal-password-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        Password
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="password"
                          className="form-control"
                          id="horizontal-password-Input"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="row justify-content-end">
                      <Col sm={9}>
                        <div className="custom-control custom-checkbox mb-4">
                          <Input
                            type="checkbox"
                            className="custom-control-Input"
                            id="horizontal-customCheck"
                          />
                          <Label
                            className="custom-control-Label"
                            for="horizontal-customCheck"
                          >
                            Remember me
                          </Label>
                        </div>

                        <div>
                          <Button
                            type="submit"
                            color="primary"
                            className="w-md"
                          >
                            Submit
                          </Button>
                        </div>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* end row  */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Inline forms layout</CardTitle>

                  <form className="form-inline">
                    <Label className="sr-only" for="inlineFormInputName2">
                      Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control mb-2 mr-sm-3"
                      id="inlineFormInputName2"
                      placeholder="Enter Name"
                    />
                    <Label className="sr-only" for="inlineFormemail2">
                      Email
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Enter Email" />
                    </InputGroup>
                    <div className="custom-control custom-checkbox custom-control-inline">
                      <Input
                        type="checkbox"
                        id="inlineForm-customCheck"
                        className="custom-control-input"
                      />
                      <Label
                        className="custom-control-label"
                        for="inlineForm-customCheck"
                      >
                        Remember me
                      </Label>
                    </div>
                    &nbsp;
                    <button type="submit" className="btn btn-primary mb-2">
                      Submit
                    </button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  )
}

export default FormLayouts
