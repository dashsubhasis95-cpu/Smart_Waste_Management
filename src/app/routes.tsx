import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Scanner } from "./pages/Scanner";
import { SmartBins } from "./pages/SmartBins";
import { Rewards } from "./pages/Rewards";
import { Analytics } from "./pages/Analytics";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "scanner", Component: Scanner },
      { path: "smart-bins", Component: SmartBins },
      { path: "rewards", Component: Rewards },
      { path: "analytics", Component: Analytics },
      { path: "admin", Component: Admin },
    ],
  },
]);
