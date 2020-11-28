import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap"
import images from "assets/images"

const CardInvoice = ({ data }) => {
  const name = data.founder
  const nameIcon = name.charAt(0)

  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <CardBody>
            <Row>
              <Col lg="4">
                <div className="text-lg-center">
                  {data.image ? (
                    <img
                      src={images[data.image]}
                      className="avatar-sm mr-3 rounded-circle mb-4 float-left float-lg-none"
                      alt="img"
                    />
                  ) : (
                    <div className="avatar-sm mr-3 mx-lg-auto mb-4 float-left float-lg-none">
                      <span
                        className={
                          "avatar-title rounded-circle bg-soft-" +
                          data.color +
                          " text-primary font-size-16"
                        }
                      >
                        {nameIcon}
                      </span>
                    </div>
                  )}

                  <h5 className="mb-1 font-size-15 text-truncate">
                    {data.founder}
                  </h5>
                  <Link to="#" className="text-muted">
                    @Skote
                  </Link>
                </div>
              </Col>

              <Col lg="8">
                <div>
                  <Link
                    to={"/invoices-detail/" + data.id}
                    className="d-block text-primary mb-2"
                  >
                    Invoice #{data.invoiceID}
                  </Link>
                  <h5 className="text-truncate mb-4 mb-lg-5">{data.company}</h5>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item mr-3">
                      <h5 className="font-size-14" id="amountTooltip">
                        <i className="bx bx-money mr-1 text-primary" />${" "}
                        {data.invoicePrice}
                        <UncontrolledTooltip
                          placement="top"
                          target="amountTooltip"
                        >
                          Amount
                        </UncontrolledTooltip>
                      </h5>
                    </li>
                    <li className="list-inline-item">
                      <h5 className="font-size-14" id="duedateTooltip">
                        <i className="bx bx-calendar mr-1 text-primary" />
                        {data.date}
                        <UncontrolledTooltip
                          placement="top"
                          target="duedateTooltip"
                        >
                          Due Date
                        </UncontrolledTooltip>
                      </h5>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default CardInvoice
