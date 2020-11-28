import React from "react"
import { Link } from "react-router-dom"
import { Badge, Button, Input, Label, UncontrolledTooltip } from "reactstrap"

const EcommerceOrderColumns = toggleModal => [
  {
    text: "",
    dataField: "id",
    formatter: (cellContent, row) => (
      <div className="custom-control custom-checkbox">
        <Input type="checkbox" className="custom-control-input" id={row.id} />
        <Label className="custom-control-label" htmlFor={row.id}>
          &nbsp;
        </Label>
      </div>
    ),
  },
  {
    dataField: "orderId",
    text: "Order ID",
    sort: true,
    formatter: (cellContent, row) => (
      <Link to="#" className="text-body font-weight-bold">
        {row.orderId}
      </Link>
    ),
  },
  {
    dataField: "billingName",
    text: "Billing Name",
    sort: true,
  },
  {
    dataField: "Date",
    text: "Date",
    sort: true,
  },
  {
    dataField: "total",
    text: "Total",
    sort: true,
  },
  {
    dataField: "paymentStatus",
    text: "Payment Status",
    sort: true,
    formatter: (cellContent, row) => (
      <Badge
        className={"font-size-12 badge-soft-" + row.badgeclass}
        color={row.badgeClass}
        pill
      >
        {row.paymentStatus}
      </Badge>
    ),
  },
  {
    isDummyField: true,
    text: "Payment Method",
    sort: true,
    formatter: (cellContent, row) => (
      <>
        <i className={"fab " + row.methodIcon + " mr-1"} />
        {row.paymentMethod}
      </>
    ),
  },
  {
    isDummyField: true,
    text: "View Details",
    sort: true,
    formatter: () => (
      <Button
        type="button"
        color="primary"
        className="btn-sm btn-rounded"
        onClick={toggleModal}
      >
        View Details
      </Button>
    ),
  },
  {
    isDummyField: true,
    text: "Action",
    formatter: () => (
      <>
        <Link to="#" className="mr-3 text-primary">
          <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Link>
        <Link to="#" className="text-danger">
          <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
          <UncontrolledTooltip placement="top" target="deletetooltip">
            Delete
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },
]

export default EcommerceOrderColumns
