import React, { useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Image
import logo from "../../assets/images/logo-dark.png"
import PropTypes from "prop-types"
import { getInvoiceDetail } from "../../store/invoices/actions"
import { connect } from "react-redux"

const InvoiceDetail = props => {
  const {
    invoiceDetail,
    match: { params },
    onGetInvoiceDetail,
  } = props

  useEffect(() => {
    if (params && params.id) {
      onGetInvoiceDetail(params.id)
    } else {
      onGetInvoiceDetail(1) //remove this after full integration
    }
  }, [params, onGetInvoiceDetail])

  //Print the Invoice
  const printInvoice = () => {
    window.print()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Detail" />
          {!isEmpty(invoiceDetail) && (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="invoice-title">
                      <h4 className="float-right font-size-16">
                        Order # {invoiceDetail.orderId}
                      </h4>
                      <div className="mb-4">
                        <img src={logo} alt="logo" height="20" />
                      </div>
                    </div>
                    <hr />
                    <Row>
                      <Col xs="6">
                        <address>
                          <strong>Billed To:</strong>
                          <br />
                          {map(
                            invoiceDetail.billingAddress.split(","),
                            (item, key) => (
                              <React.Fragment key={key}>
                                <span>{item}</span>
                                <br />
                              </React.Fragment>
                            )
                          )}
                        </address>
                      </Col>
                      <Col xs="6" className="text-right">
                        <address>
                          <strong>Shipped To:</strong>
                          <br />
                          {map(
                            invoiceDetail.shippingAddress.split(","),
                            (item, key) => (
                              <React.Fragment key={key}>
                                <span>{item}</span>
                                <br />
                              </React.Fragment>
                            )
                          )}
                        </address>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" className="mt-3">
                        <address>
                          <strong>Payment Method:</strong>
                          <br />
                          {invoiceDetail.card}
                          <br />
                          {invoiceDetail.email}
                        </address>
                      </Col>
                      <Col xs="6" className="mt-3 text-right">
                        <address>
                          <strong>Order Date:</strong>
                          <br />
                          {invoiceDetail.orderDate}
                          <br />
                          <br />
                        </address>
                      </Col>
                    </Row>
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 font-weight-bold">
                        Order summary
                      </h3>
                    </div>
                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>No.</th>
                            <th>Item</th>
                            <th className="text-right">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {map(
                            invoiceDetail.orderSummary.items,
                            (item, key) => (
                              <tr key={key}>
                                <td>{item.id}</td>
                                <td>{item.item}</td>
                                <td className="text-right">{item.price}</td>
                              </tr>
                            )
                          )}
                          <tr>
                            <td colSpan="2" className="text-right">
                              Sub Total
                            </td>
                            <td className="text-right">
                              {invoiceDetail.orderSummary.subTotal}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="border-0 text-right">
                              <strong>Shipping</strong>
                            </td>
                            <td className="border-0 text-right">
                              {invoiceDetail.orderSummary.shipping}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="border-0 text-right">
                              <strong>Total</strong>
                            </td>
                            <td className="border-0 text-right">
                              <h4 className="m-0">
                                {invoiceDetail.orderSummary.total}
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="d-print-none">
                      <div className="float-right">
                        <Link
                          to="#"
                          onClick={printInvoice}
                          className="btn btn-success waves-effect waves-light mr-2"
                        >
                          <i className="fa fa-print" />
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-primary w-md waves-effect waves-light"
                        >
                          Send
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

InvoiceDetail.propTypes = {
  invoiceDetail: PropTypes.object,
  onGetInvoiceDetail: PropTypes.func,
}

const mapStateToProps = ({ invoices }) => ({
  invoiceDetail: invoices.invoiceDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetInvoiceDetail: id => dispatch(getInvoiceDetail(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InvoiceDetail))
