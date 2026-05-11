import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import ExamineLayout from "./pages/examine/ExamineLayout";
import Landing from "./pages/Landing";
import ManageLayout from "./pages/manage/ManageLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: "examine", Component: ExamineLayout },
      { path: "manage", Component: ManageLayout },
    ],
  },
]);

export default router;
