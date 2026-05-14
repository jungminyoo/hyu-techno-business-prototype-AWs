import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import ExamineLayout from "./pages/examine/ExamineLayout";
import Landing from "./pages/Landing";
import ManageLayout from "./pages/manage/ManageLayout";
import First from "./pages/examine/First";
import Revisit from "./pages/examine/Revisit";
import Area from "./pages/examine/Area";
import Others from "./pages/examine/Others";
import Examine from "./pages/manage/Examine";
import Complete from "./pages/examine/Complete";

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
          { path: "others", Component: Others },
          { path: "complete", Component: Complete },
        ],
      },
      {
        path: "manage",
        Component: ManageLayout,
        children: [
          {
            path: ":patientId",
            Component: Examine,
          },
        ],
      },
    ],
  },
]);

export default router;
