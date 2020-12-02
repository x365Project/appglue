import React from "react"

import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router-dom"

//Simple bar
import SimpleBar from "simplebar-react"

//i18n
import { withTranslation, WithTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

interface propTypes extends WithTranslation {
  theme: any
  type: any
  isMobile: boolean
}
const Sidebar: React.FC<propTypes & RouteComponentProps> = ({theme, type, isMobile}: propTypes & RouteComponentProps) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent />
            </SimpleBar>
          ) : (
            <SidebarContent />
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStatetoProps = (state: any) => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
