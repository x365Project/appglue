import React from "react"
import {
  Container,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

const Dashboard = (props: any) => {

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid></Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Dashboard)
