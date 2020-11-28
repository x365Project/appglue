import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import { Button, Card, CardBody, Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { getOrders } from "store/actions"
import EcommerceOrderColumns from "./EcommerceOrderColumns"
import EcommerceOrdersModal from "./EcommerceOrdersModal"

const EcommerceOrders = props => {
  const { orders, onGetOrders } = props
  const [modal, setModal] = useState(false)
  const [orderList, setOrderList] = useState([])
  const pageOptions = {
    sizePerPage: 10,
    totalSize: 50, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  useEffect(() => {
    onGetOrders()
    setOrderList(orders)
  }, [onGetOrders, orders])

  useEffect(() => {
    if (!isEmpty(orders)) setOrderList(orders)
  }, [orders])

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { page, searchText }) => {
    setOrderList(
      orders.filter(order =>
        Object.keys(order).some(
          key =>
            typeof order[key] === "string" &&
            order[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    )
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal} toggle={toggleModal} />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                {!isEmpty(orderList) && (
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={orderList || []}
                          columns={EcommerceOrderColumns(toggleModal)}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box mr-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-right">
                                    <Button
                                      type="button"
                                      color="success"
                                      className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                    >
                                      <i className="mdi mdi-plus mr-1" />
                                      Add New Order
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      responsive
                                      remote
                                      bordered={false}
                                      striped={false}
                                      classes={
                                        "table table-centered table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      onTableChange={handleTableChange}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
}

const mapStateToProps = state => ({
  orders: state.ecommerce.orders,
})

const mapDispatchToProps = dispatch => ({
  onGetOrders: () => dispatch(getOrders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceOrders))
