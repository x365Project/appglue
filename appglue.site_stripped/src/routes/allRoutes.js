import React from "react"
import { Redirect } from "react-router-dom"


// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"


//Pages
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesPricing from "../pages/Utility/pages-pricing"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"
import Dashboard from "../pages/Dashboard";


const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  // { path: "/dashboard-saas", component: DashboardSaas },
  // { path: "/dashboard-crypto", component: DashboardCrypto },
  //
  // //Crypto
  // { path: "/crypto-wallet", component: CryptoWallet },
  // { path: "/crypto-buy-sell", component: CryptoBuySell },
  // { path: "/crypto-exchange", component: CryptoExchange },
  // { path: "/crypto-lending", component: CryptoLending },
  // { path: "/crypto-orders", component: CryptoOrders },
  // { path: "/crypto-kyc-application", component: CryptoKYCApplication },
  //
  // //chat
  // { path: "/chat", component: Chat },
  //
  // // //calendar
  // { path: "/calendar", component: Calendar },
  //
  // // //profile
  // { path: "/profile", component: UserProfile },
  //
  // //Ecommerce
  // { path: "/ecommerce-products", component: EcommerceProducts },
  // { path: "/ecommerce-product-detail", component: EcommerceProductDetail },
  // { path: "/ecommerce-products/:id", component: EcommerceProductDetail },
  // { path: "/ecommerce-orders", component: EcommerceOrders },
  // { path: "/ecommerce-customers", component: EcommerceCustomers },
  // { path: "/ecommerce-cart", component: EcommerceCart },
  // { path: "/ecommerce-checkout", component: EcommerceCheckout },
  // { path: "/ecommerce-shops", component: EcommerceShops },
  // { path: "/ecommerce-add-product", component: EcommerceAddProduct },
  //
  // //Email
  // { path: "/email-inbox", component: EmailInbox },
  // { path: "/email-read", component: EmailRead },
  //
  // //Invoices
  // { path: "/invoices-list", component: InvoicesList },
  // { path: "/invoices-detail", component: InvoiceDetail },
  // { path: "/invoices-detail/:id", component: InvoiceDetail },
  //
  // // Tasks
  // { path: "/tasks-list", component: TasksList },
  // { path: "/tasks-kanban", component: TasksKanban },
  // { path: "/tasks-create", component: TasksCreate },
  //
  // //Projects
  // { path: "/projects-grid", component: ProjectsGrid },
  // { path: "/projects-list", component: ProjectsList },
  // { path: "/projects-overview", component: ProjectsOverview },
  // { path: "/projects-overview/:id", component: ProjectsOverview },
  // { path: "/projects-create", component: ProjectsCreate },
  //
  // // Contacts
  // { path: "/contacts-grid", component: ContactsGrid },
  // { path: "/contacts-list", component: ContactsList },
  // { path: "/contacts-profile", component: ContactsProfile },
  //
  // //Charts
  // { path: "/apex-charts", component: ChartApex },
  // { path: "/chartist-charts", component: ChartistChart },
  // { path: "/chartjs-charts", component: ChartjsChart },
  // { path: "/e-charts", component: EChart },
  // { path: "/sparkline-charts", component: SparklineChart },
  // { path: "/tui-charts", component: ToastUIChart },
  // { path: "/charts-knob", component: ChartsKnob },
  //
  // // Icons
  // { path: "/icons-boxicons", component: IconBoxicons },
  // { path: "/icons-dripicons", component: IconDripicons },
  // { path: "/icons-materialdesign", component: IconMaterialdesign },
  // { path: "/icons-fontawesome", component: IconFontawesome },
  //
  // // Tables
  // { path: "/tables-basic", component: BasicTables },
  // { path: "/tables-datatable", component: DatatableTables },
  // { path: "/tables-responsive", component: ResponsiveTables },
  // { path: "/tables-editable", component: EditableTables },
  //
  // // Maps
  // { path: "/maps-google", component: MapsGoogle },
  // { path: "/maps-vector", component: MapsVector },
  // { path: "/maps-leaflet", component: MapsLeaflet },
  //
  // // Forms
  // { path: "/form-elements", component: FormElements },
  // { path: "/form-layouts", component: FormLayouts },
  // { path: "/form-advanced", component: FormAdvanced },
  // { path: "/form-editors", component: FormEditors },
  // { path: "/form-mask", component: FormMask },
  // { path: "/form-repeater", component: FormRepeater },
  // { path: "/form-uploads", component: FormUpload },
  // { path: "/form-wizard", component: FormWizard },
  // { path: "/form-validation", component: FormValidations },
  // { path: "/form-xeditable", component: FormXeditable },
  //
  // // Ui
  // { path: "/ui-alerts", component: UiAlert },
  // { path: "/ui-buttons", component: UiButtons },
  // { path: "/ui-cards", component: UiCards },
  // { path: "/ui-carousel", component: UiCarousel },
  // { path: "/ui-colors", component: UiColors },
  // { path: "/ui-dropdowns", component: UiDropdown },
  // { path: "/ui-general", component: UiGeneral },
  // { path: "/ui-grid", component: UiGrid },
  // { path: "/ui-images", component: UiImages },
  // { path: "/ui-lightbox", component: UiLightbox },
  // { path: "/ui-modals", component: UiModal },
  // { path: "/ui-progressbars", component: UiProgressbar },
  // { path: "/ui-sweet-alert", component: UiSweetAlert },
  // { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  // { path: "/ui-typography", component: UiTypography },
  // { path: "/ui-video", component: UiVideo },
  // { path: "/ui-session-timeout", component: UiSessionTimeout },
  // { path: "/ui-rating", component: UiRating },
  // { path: "/ui-rangeslider", component: UiRangeSlider },
  // { path: "/ui-notifications", component: UiNotifications },
  // { path: "/ui-image-cropper", component: UiImageCropper },
  //
  // //Utility
  // { path: "/pages-starter", component: PagesStarter },
  // { path: "/pages-timeline", component: PagesTimeline },
  // { path: "/pages-faqs", component: PagesFaqs },
  // { path: "/pages-pricing", component: PagesPricing },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-forget-pwd", component: ForgetPwd1 },
  { path: "/auth-lock-screen", component: LockScreen },
]

export { userRoutes, authRoutes }
