import React, { useEffect, useState } from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import { get, map } from "lodash"
import { withTranslation } from "react-i18next"

//i18n
import i18n from "../../../i18n"
import languages from "../../../common/languages"


//export default withTranslation()(LanguageDropdown)
