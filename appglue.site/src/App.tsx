import React from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"

// Import scss
import "./assets/scss/theme.scss"

const App = (props: any) => {
  function getLayout() {
    let layoutCls:any

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

const mapStateToProps = (state: any) => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
