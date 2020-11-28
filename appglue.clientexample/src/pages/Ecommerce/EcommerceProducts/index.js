import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap"
import classnames from "classnames"
import { isEmpty, map } from "lodash"

//Import Star Ratings
import StarRatings from "react-star-ratings"

// RangeSlider
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

//Import Product Images
import { productImages } from "../../../assets/images/product"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

//Import data
import { discountData, productsData } from "../../../common/data"

//Import actions
import { getProducts } from "../../../store/e-commerce/actions"

const EcommerceProducts = props => {
  const { products, history, onGetProducts } = props
  // eslint-disable-next-line no-unused-vars
  const [FilterClothes, setFilterClothes] = useState([
    { id: 1, name: "T-shirts", link: "#" },
    { id: 2, name: "Shirts", link: "#" },
    { id: 3, name: "Jeans", link: "#" },
    { id: 4, name: "Jackets", link: "#" },
  ])
  const [productList, setProductList] = useState([])
  const [activeTab, setActiveTab] = useState("1")
  // eslint-disable-next-line no-unused-vars
  const [discountDataList, setDiscountDataList] = useState([])
  const [filters, setFilters] = useState({
    discount: [],
    price: { min: 0, max: 500 },
  })
  const [page, setPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(5)

  useEffect(() => {
    setProductList(products)
    onGetProducts()
    setDiscountDataList(discountData)
  }, [onGetProducts, products])

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products)
  }, [products])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const onSelectDiscount = e => {
    const { value, checked } = e.target
    const { discount } = filters
    setFilters({
      ...filters,
      discount: discount.find(item => item === value)
        ? discount.filter(item => item !== value)
        : [...discount, value],
    })
    onFilterProducts(value, checked)
  }

  const onFilterProducts = (value, checked) => {
    const { discount } = filters
    let filteredProducts = productsData
    if (!!checked && parseInt(value) === 0) {
      filteredProducts = productsData.filter(product => product.offer < 10)
    } else if (discount.length > 0) {
      filteredProducts = productsData.filter(
        product => product.offer >= Math.min(...discount)
      )
    }
    setProductList(filteredProducts)
  }

  const onUpdate = (render, handle, value) => {
    setProductList(
      productsData.filter(
        product => product.newPrice >= value[0] && product.newPrice <= value[1]
      )
    )
  }

  /*
  on change rating checkbox method
  */
  const onChangeRating = value => {
    setProductList(productsData.filter(product => product.rating >= value))
  }

  const onSelectRating = value => {
    setProductList(productsData.filter(product => product.rating === value))
  }

  const onUncheckMark = () => {
    setProductList(productsData)
  }

  const handlePageClick = page => {
    setPage(page)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Product" />
          <Row>
            <Col lg="3">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Filter</CardTitle>
                  <div>
                    <h5 className="font-size-14 mb-3">Clothes</h5>
                    {/* Render Cloth Categories */}
                    <ul className="list-unstyled product-list">
                      {FilterClothes.map((cloth, key) => (
                        <li key={"_li_" + key}>
                          <Link to={cloth.link}>
                            <i className="mdi mdi-chevron-right mr-1" />
                            {cloth.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-4">Price</h5>
                    <br />

                    <Nouislider
                      range={{ min: 0, max: 600 }}
                      tooltips={true}
                      start={[100, 500]}
                      connect
                      onSlide={onUpdate}
                    />
                  </div>

                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Discount</h5>
                    {discountData.map((discount, i) => (
                      <div
                        className="custom-control custom-checkbox mt-2"
                        key={i}
                      >
                        <Input
                          type="checkbox"
                          value={discount.value}
                          className="custom-control-input"
                          id={i}
                          onChange={onSelectDiscount}
                        />
                        <Label className="custom-control-label" htmlFor={i}>
                          {discount.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3">
                    <h5 className="font-size-14 mb-3">Customer Rating</h5>
                    <div>
                      <div className="custom-control custom-checkbox mt-2">
                        <Input
                          type="checkbox"
                          className="custom-control-input"
                          id="productratingCheck1"
                          onChange={e => {
                            if (e.target.checked) {
                              onChangeRating(4)
                            } else {
                              onUncheckMark(4)
                            }
                          }}
                        />
                        <Label
                          className="custom-control-label"
                          htmlFor="productratingCheck1"
                        >
                          4 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </div>
                      <div className="custom-control custom-checkbox mt-2">
                        <Input
                          type="checkbox"
                          className="custom-control-input"
                          id="productratingCheck2"
                          onChange={e => {
                            if (e.target.checked) {
                              onChangeRating(3)
                            } else {
                              onUncheckMark(3)
                            }
                          }}
                        />
                        <Label
                          className="custom-control-label"
                          htmlFor="productratingCheck2"
                        >
                          3 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </div>
                      <div className="custom-control custom-checkbox mt-2">
                        <Input
                          type="checkbox"
                          className="custom-control-input"
                          id="productratingCheck3"
                          onChange={e => {
                            if (e.target.checked) {
                              onChangeRating(2)
                            } else {
                              onUncheckMark(2)
                            }
                          }}
                        />
                        <Label
                          className="custom-control-label"
                          htmlFor="productratingCheck3"
                        >
                          2 <i className="bx bx-star text-warning" /> & Above
                        </Label>
                      </div>
                      <div className="custom-control custom-checkbox mt-2">
                        <Input
                          type="checkbox"
                          className="custom-control-input"
                          id="productratingCheck4"
                          onChange={e => {
                            if (e.target.checked) {
                              onSelectRating(1)
                            } else {
                              onUncheckMark(1)
                            }
                          }}
                        />
                        <Label
                          className="custom-control-label"
                          htmlFor="productratingCheck4"
                        >
                          1 <i className="bx bx-star text-warning" />
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg="9">
              <Row className="mb-3">
                <Col xl="4" sm="6">
                  <div className="mt-2">
                    <h5>Clothes</h5>
                  </div>
                </Col>
                <Col lg="8" sm="6">
                  <Form className="mt-4 mt-sm-0 float-sm-right form-inline">
                    <div className="search-box mr-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control border-0"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                    <Nav className="product-view-nav" pills>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1")
                          }}
                        >
                          <i className="bx bx-grid-alt" />
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
                          <i className="bx bx-list-ul" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Form>
                </Col>
              </Row>
              <Row>
                {!isEmpty(productList) &&
                  productList.map((product, key) => (
                    <Col xl="4" sm="6" key={"_col_" + key}>
                      <Card
                        onClick={() =>
                          history.push(`/ecommerce-products/${product.id}`)
                        }
                      >
                        <CardBody>
                          <div className="product-img position-relative">
                            {product.isOffer ? (
                              <div className="avatar-sm product-ribbon">
                                <span className="avatar-title rounded-circle  bg-primary">
                                  {`-${product.offer}%`}
                                </span>
                              </div>
                            ) : null}

                            <img
                              src={productImages[product.image]}
                              alt=""
                              className="img-fluid mx-auto d-block"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <h5 className="mb-3 text-truncate">
                              <Link
                                to={"/ecommerce-product-detail/" + product.id}
                                className="text-dark"
                              >
                                {product.name}{" "}
                              </Link>
                            </h5>
                            <div className="text-muted mb-3">
                              <StarRatings
                                rating={product.rating}
                                starRatedColor="#F1B44C"
                                starEmptyColor="#2D363F"
                                numberOfStars={5}
                                name="rating"
                                starDimension="14px"
                                starSpacing="3px"
                              />
                            </div>
                            <h5 className="my-0">
                              <span className="text-muted mr-2">
                                <del>${product.oldPrice}</del>
                              </span>
                              <b>${product.newPrice}</b>
                            </h5>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>

              <Row>
                <Col lg="12">
                  <Pagination className="pagination pagination-rounded justify-content-center mt-2 mb-5">
                    <PaginationItem disabled={page === 1}>
                      <PaginationLink
                        previous
                        href="#"
                        onClick={() => handlePageClick(page - 1)}
                      />
                    </PaginationItem>
                    {map(Array(totalPage), (item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink
                          onClick={() => handlePageClick(i + 1)}
                          href="#"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={page === totalPage}>
                      <PaginationLink
                        next
                        href="#"
                        onClick={() => handlePageClick(page + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  history: PropTypes.object,
  onGetProducts: PropTypes.func,
}

const mapStateToProps = state => ({
  products: state.ecommerce.products,
})

const mapDispatchToProps = dispatch => ({
  onGetProducts: () => dispatch(getProducts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceProducts))
