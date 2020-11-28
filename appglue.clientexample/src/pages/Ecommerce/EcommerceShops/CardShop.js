import PropTypes from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { Card, Col, Row } from "reactstrap"

const CardShop = props => {
  const { shop } = props
  const name = shop.name
  const nameIcon = name.charAt(0)
  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <Row>
            <Col lx="5">
              <div className="text-center p-4 border-right">
                <div className="avatar-sm mx-auto mb-4">
                  <span
                    className={
                      "avatar-title rounded-circle bg-soft-" +
                      shop.color +
                      " primary text-" +
                      shop.color +
                      " font-size-16"
                    }
                  >
                    {nameIcon}
                  </span>
                </div>
                <h5 className="text-truncate">{shop.name}</h5>
              </div>
            </Col>

            <Col xl="7">
              <div className="p-4 text-center text-xl-left">
                <Row>
                  <Col md="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">Products</p>
                      <h5>{shop.product}</h5>
                    </div>
                  </Col>
                  <Col md="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">
                        Wallet Balance
                      </p>
                      <h5>${shop.balance}</h5>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link to="#">See profile</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardShop.propTypes = {
  shop: PropTypes.object
}

export default CardShop
