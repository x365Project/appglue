import { Route } from "react-router-dom"

const Authmiddleware = ({ component: Component, layout: Layout }: any) => (
  <Route
    render={props => {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

export default Authmiddleware
