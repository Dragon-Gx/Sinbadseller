import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import VendorPage from "./pages/VendorPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/vendor",
    Component: VendorPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
