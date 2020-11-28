import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { map } from "lodash"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { MDBDataTable } from "mdbreact"
import "assets/scss/datatables.scss"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import cryptoOrderColumn from "./cryptoOrderColumn"
import { getCryptoOrders } from "store/crypto/actions"

const CryptoOrders = props => {
  const { orders, onGetOrders } = props
  const [startDate, setStartDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("1")

  useEffect(() => {
    onGetOrders()
  }, [onGetOrders])

  const handleChange = date => {
    setStartDate(date)
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  const status = {
    completed: (
      <span className="badge badge-success font-size-10">Completed</span>
    ),
    pending: <span className="badge badge-warning font-size-10">Pending</span>,
    failed: <span className="badge badge-danger font-size-10">Failed</span>,
  }
  const data = {
    columns: cryptoOrderColumn,
    rows: map(orders, order => ({ ...order, status: status[order.status] })),
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Crypto" breadcrumbItem="Orders" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-3">Orders</h4>

                  <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1")
                        }}
                      >
                        All Orders
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggleTab("2")
                        }}
                      >
                        Processing
                      </NavLink>
                    </NavItem>
                  </ul>

                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="all-order">
                      <Form>
                        <Row>
                          <div className="col-xl col-sm-6">
                            <FormGroup className="mt-3 mb-0">
                              <Label>Date :</Label>
                              <DatePicker
                                selected={startDate}
                                onChange={handleChange}
                                className="form-control"
                                placeholderText="Select date"
                              />
                            </FormGroup>
                          </div>

                          <div className="col-xl col-sm-6">
                            <FormGroup className="mt-3 mb-0">
                              <Label>Coin</Label>
                              <select className="form-control select2-search-disable">
                                <option value="BTC" defaultValue>
                                  Bitcoin
                                </option>
                                <option value="ETH">Ethereum</option>
                                <option value="LTC">litecoin</option>
                              </select>
                            </FormGroup>
                          </div>

                          <div className="col-xl col-sm-6">
                            <FormGroup className="mt-3 mb-0">
                              <Label>Type</Label>
                              <select className="form-control select2-search-disable">
                                <option value="BU" defaultValue>
                                  Buy
                                </option>
                                <option value="SE">Sell</option>
                              </select>
                            </FormGroup>
                          </div>

                          <div className="col-xl col-sm-6">
                            <FormGroup className="mt-3 mb-0">
                              <Label>Status</Label>
                              <select className="form-control select2-search-disable">
                                <option value="CO" defaultValue>
                                  Completed
                                </option>
                                <option value="PE">Pending</option>
                              </select>
                            </FormGroup>
                          </div>

                          <div className="col-xl col-sm-6 align-self-end">
                            <div className="mt-3">
                              <Button
                                type="button"
                                color="primary"
                                className="w-md"
                              >
                                Add Order
                              </Button>
                            </div>
                          </div>
                        </Row>
                      </Form>

                      <MDBDataTable
                        responsive
                        bordered
                        data={data}
                        className="mt-5"
                      />
                    </TabPane>
                    <TabPane tabId="2" id="processing">
                      <div>
                        <MDBDataTable
                          responsive
                          bordered
                          data={data}
                          className="mt-4"
                        />
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

CryptoOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

const mapStateToProps = ({ crypto }) => ({
  orders: crypto.orders,
})

const mapDispatchToProps = dispatch => ({
  onGetOrders: () => dispatch(getCryptoOrders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CryptoOrders))
