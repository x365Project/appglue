import React from 'react'
import { Redirect } from "react-router-dom"

// Dashboard
import Dashboard from "../Pages/Dashboard"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/dashboard-saas", component: Dashboard },
  { path: "/dashboard-crypto", component: Dashboard },

  //Crypto
  { path: "/crypto-wallet", component: Dashboard },
  { path: "/crypto-buy-sell", component: Dashboard },
  { path: "/crypto-exchange", component: Dashboard },
  { path: "/crypto-lending", component: Dashboard },
  { path: "/crypto-orders", component: Dashboard },
  { path: "/crypto-kyc-application", component: Dashboard },

  //chat
  { path: "/chat", component: Dashboard },

  // //calendar
  { path: "/calendar", component: Dashboard },

  // //profile
  { path: "/profile", component: Dashboard },

  //Ecommerce
  { path: "/ecommerce-products", component: Dashboard },
  { path: "/ecommerce-product-detail", component: Dashboard },
  { path: "/ecommerce-products/:id", component: Dashboard },
  { path: "/ecommerce-orders", component: Dashboard },
  { path: "/ecommerce-customers", component: Dashboard },
  { path: "/ecommerce-cart", component: Dashboard },
  { path: "/ecommerce-checkout", component: Dashboard },
  { path: "/ecommerce-shops", component: Dashboard },
  { path: "/ecommerce-add-product", component: Dashboard },

  //Email
  { path: "/email-inbox", component: Dashboard },
  { path: "/email-read", component: Dashboard },

  //Invoices
  { path: "/invoices-list", component: Dashboard },
  { path: "/invoices-detail", component: Dashboard },
  { path: "/invoices-detail/:id", component: Dashboard },

  // Tasks
  { path: "/tasks-list", component: Dashboard },
  { path: "/tasks-kanban", component: Dashboard },
  { path: "/tasks-create", component: Dashboard },

  //Projects
  { path: "/projects-grid", component: Dashboard },
  { path: "/projects-list", component: Dashboard },
  { path: "/projects-overview", component: Dashboard },
  { path: "/projects-overview/:id", component: Dashboard },
  { path: "/projects-create", component: Dashboard },

  // Contacts
  { path: "/contacts-grid", component: Dashboard },
  { path: "/contacts-list", component: Dashboard },
  { path: "/contacts-profile", component: Dashboard },

  //Charts
  { path: "/apex-charts", component: Dashboard },
  { path: "/chartist-charts", component: Dashboard },
  { path: "/chartjs-charts", component: Dashboard },
  { path: "/e-charts", component: Dashboard },
  { path: "/sparkline-charts", component: Dashboard },
  { path: "/tui-charts", component: Dashboard },
  { path: "/charts-knob", component: Dashboard },

  // Icons
  { path: "/icons-boxicons", component: Dashboard },
  { path: "/icons-dripicons", component: Dashboard },
  { path: "/icons-materialdesign", component: Dashboard },
  { path: "/icons-fontawesome", component: Dashboard },

  // Tables
  { path: "/tables-basic", component: Dashboard },
  { path: "/tables-datatable", component: Dashboard },
  { path: "/tables-responsive", component: Dashboard },
  { path: "/tables-editable", component: Dashboard },

  // Maps
  { path: "/maps-google", component: Dashboard },
  { path: "/maps-vector", component: Dashboard },
  { path: "/maps-leaflet", component: Dashboard },

  // Forms
  { path: "/form-elements", component: Dashboard },
  { path: "/form-layouts", component: Dashboard },
  { path: "/form-advanced", component: Dashboard },
  { path: "/form-editors", component: Dashboard },
  { path: "/form-mask", component: Dashboard },
  { path: "/form-repeater", component: Dashboard },
  { path: "/form-uploads", component: Dashboard },
  { path: "/form-wizard", component: Dashboard },
  { path: "/form-validation", component: Dashboard },
  { path: "/form-xeditable", component: Dashboard },

  // Ui
  { path: "/ui-alerts", component: Dashboard },
  { path: "/ui-buttons", component: Dashboard },
  { path: "/ui-cards", component: Dashboard },
  { path: "/ui-carousel", component: Dashboard },
  { path: "/ui-colors", component: Dashboard },
  { path: "/ui-dropdowns", component: Dashboard },
  { path: "/ui-general", component: Dashboard },
  { path: "/ui-grid", component: Dashboard },
  { path: "/ui-images", component: Dashboard },
  { path: "/ui-lightbox", component: Dashboard },
  { path: "/ui-modals", component: Dashboard },
  { path: "/ui-progressbars", component: Dashboard },
  { path: "/ui-sweet-alert", component: Dashboard },
  { path: "/ui-tabs-accordions", component: Dashboard },
  { path: "/ui-typography", component: Dashboard },
  { path: "/ui-video", component: Dashboard },
  { path: "/ui-session-timeout", component: Dashboard },
  { path: "/ui-rating", component: Dashboard },
  { path: "/ui-rangeslider", component: Dashboard },
  { path: "/ui-notifications", component: Dashboard },
  { path: "/ui-image-cropper", component: Dashboard },

  //Utility
  { path: "/pages-starter", component: Dashboard },
  { path: "/pages-timeline", component: Dashboard },
  { path: "/pages-faqs", component: Dashboard },
  { path: "/pages-pricing", component: Dashboard },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to={{ pathname: "/dashboard" }} /> },
]

export { userRoutes }
