import React from "react"
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  UncontrolledDropdown,
} from "reactstrap"

const EcommerceCustomerColumns = () => [
  {
    dataField: "id",
    text: "#",
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
    dataField: "username",
    text: "Username",
    sort: true,
  },
  {
    text: "Phone / Email",
    dataField: "phone",
    sort: true,
    formatter: (cellContent, row) => (
      <>
        <p className="mb-1">{row.phone}</p>
        <p className="mb-0">{row.email}</p>
      </>
    ),
  },
  {
    dataField: "address",
    text: "Address",
    sort: true,
  },
  {
    dataField: "rating",
    text: "Rating",
    sort: true,
    formatter: (cellContent, row) => (
      <Badge color="success" className="font-size-12">
        <i className="mdi mdi-star mr-1" />
        {row.rating}
      </Badge>
    ),
  },
  {
    dataField: "walletBalance",
    text: "Wallet Balances",
    sort: true,
  },
  {
    dataField: "joiningDate",
    text: "Joining Date",
    sort: true,
  },
  {
    dataField: "menu",
    isDummyField: true,
    text: "Action",
    formatter: () => (
      <UncontrolledDropdown>
        <DropdownToggle href="#" className="card-drop" tag="i">
          <i className="mdi mdi-dots-horizontal font-size-18" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href="#">
            <i className="fas fa-pencil-alt text-success mr-1" />
            Edit
          </DropdownItem>
          <DropdownItem href="#">
            <i className="fas fa-trash-alt text-danger mr-1" />
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
]

export default EcommerceCustomerColumns
