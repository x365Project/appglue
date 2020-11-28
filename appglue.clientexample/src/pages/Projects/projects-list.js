import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Image
import images from "assets/images"
import companies from "assets/images/companies"

import { getProjects } from "store/actions"

const ProjectsList = props => {
  const { projects, onGetProjects } = props

  useEffect(() => {
    onGetProjects()
  }, [onGetProjects])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects List" />

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap table-centered table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "100px" }}>
                          #
                        </th>
                        <th scope="col">Projects</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Team</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {map(projects, (project, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={companies[project.img]}
                              alt=""
                              className="avatar-sm"
                            />
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14">
                              <Link
                                to={`/projects-overview/${project.id}`}
                                className="text-dark"
                              >
                                {project.name}
                              </Link>
                            </h5>
                            <p className="text-muted mb-0">
                              {project.description}
                            </p>
                          </td>
                          <td>{project.dueDate}</td>
                          <td>
                            <Badge color={project.color}>
                              {project.status}
                            </Badge>
                          </td>
                          <td>
                            <div className="team">
                              {map(project.team, (member, index) =>
                                !member.img || member.img !== "Null" ? (
                                  <Link
                                    key={index}
                                    to="#"
                                    className="team-member d-inline-block"
                                    id="member1"
                                  >
                                    <img
                                      src={images[member.img]}
                                      className="rounded-circle avatar-xs m-1"
                                      alt=""
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="member1"
                                    >
                                      {member.name}
                                    </UncontrolledTooltip>
                                  </Link>
                                ) : (
                                  <Link
                                    to="#"
                                    className="team-member d-inline-block"
                                    id={"member" + member.id}
                                    key={"_team_" + index}
                                  >
                                    <div className="avatar-xs m-1">
                                      <span
                                        className={
                                          "avatar-title rounded-circle bg-soft-" +
                                          member.color +
                                          " text-" +
                                          member.color +
                                          " font-size-16"
                                        }
                                      >
                                        {member.name.charAt(0)}
                                      </span>
                                      <UncontrolledTooltip
                                        placement="top"
                                        target={"member" + member.id}
                                      >
                                        {member.name}
                                      </UncontrolledTooltip>
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>
                          </td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                href="#"
                                className="card-drop"
                                tag="i"
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem href="#">Action</DropdownItem>
                                <DropdownItem href="#">
                                  Another action
                                </DropdownItem>
                                <DropdownItem href="#">
                                  Something else here
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle mr-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ProjectsList.propTypes = {
  projects: PropTypes.array,
  onGetProjects: PropTypes.func,
}

const mapStateToProps = ({ projects }) => ({
  projects: projects.projects,
})

const mapDispatchToProps = dispatch => ({
  onGetProjects: () => dispatch(getProjects()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsList))
