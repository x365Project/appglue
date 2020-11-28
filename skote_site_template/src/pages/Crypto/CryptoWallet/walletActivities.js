import React from "react"
import PropTypes from "prop-types"
import { Card, CardBody, NavItem, NavLink } from "reactstrap"
import classnames from "classnames"
import { MDBDataTable } from "mdbreact"
import cryptoWalletColumns from "./cryptoWalletColumns"

const WalletActivities = ({ walletHistory, activeTab, toggleTab }) => {
  const data = {
    columns: cryptoWalletColumns,
    rows: walletHistory,
  }

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Activities</h4>
        <ul className="nav nav-tabs nav-tabs-custom">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "1",
              })}
              onClick={() => {
                toggleTab("1")
              }}
            >
              All
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
              Buy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "3",
              })}
              onClick={() => {
                toggleTab("3")
              }}
            >
              Sell
            </NavLink>
          </NavItem>
        </ul>

        <div className="mt-4">
          <MDBDataTable responsive bordered data={data} />
        </div>
      </CardBody>
    </Card>
  )
}

WalletActivities.propTypes = {
  walletHistory: PropTypes.array,
  activeTab: PropTypes.string,
  toggleTab: PropTypes.func,
}

export default WalletActivities
