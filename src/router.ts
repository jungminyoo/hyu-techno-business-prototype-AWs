import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import ExamineLayout from "./pages/examine/ExamineLayout";
import Landing from "./pages/Landing";
import ManageLayout from "./pages/manage/ManageLayout";
import First from "./pages/examine/First";
import Revisit from "./pages/examine/Revisit";
import Area from "./pages/examine/Area";
import Point from "./pages/examine/Point";
import Movement from "./pages/examine/Movement";
import Others from "./pages/examine/Others";
import Dashboard from "./pages/manage/Dashboard";
import Examine from "./pages/manage/Examine";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      {
        path: "examine",
        Component: ExamineLayout,
        children: [
          { path: "first", Component: First },
          { path: "revisit", Component: Revisit },
          { path: "area", Component: Area },
          { path: "point", Component: Point },
          { path: "movement", Component: Movement },
          { path: "others", Component: Others },
        ],
      },
      {
        path: "manage",
        Component: ManageLayout,
        children: [
          {
            path: "dashboard",
            Component: Dashboard,
            children: [{ path: ":examineId", Component: Examine }],
          },
        ],
      },
    ],
  },
]);

export default router;
