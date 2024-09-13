import { lazy } from "react";
import Report from "../layouts/Reports.js";
import Services from "../layouts/Services.js";
import ConsumerServices from "../layouts/services_c.js";
/****Layouts*****/
const LoginLayout = lazy(() => import("../layouts/LoginLayout.js")); // Create a new simple layout without sidebar and navbar
const RegisterLayout = lazy(() => import("../layouts/RegisterLayout.js")); // Create a new simple layout without sidebar and navbar
const Starter = lazy(() => import("../layouts/Starter.js"));
const Dash = lazy(() => import("../layouts/dash.js"));

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <LoginLayout />,
  },
  {
    path: "/service",
    element: <Services />,
  },
  {
    path: "/starter",
    element: <Starter />,
  },
  {
    path: "/report",
    element: <Report />,
  },  
  {
    path: "/dash",
    element: <Dash />,
  },
  {
    path: "/services",
    element: <ConsumerServices />,
  },
  {
    path: "/register",
    element: <RegisterLayout />,
  }
];

export default ThemeRoutes;
