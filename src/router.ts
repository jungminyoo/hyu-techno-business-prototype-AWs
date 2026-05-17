import { createHashRouter, Outlet } from "react-router";
import Layout from "./pages/Layout";
import ExamineLayout from "./pages/examine/ExamineLayout";
import Landing from "./pages/Landing";
import ManageLayout from "./pages/manage/ManageLayout";
import First from "./pages/examine/First";
import Revisit from "./pages/examine/Revisit";
import Area from "./pages/examine/Area";
import Others from "./pages/examine/Others";
import Examine from "./pages/manage/Examine";
import PatientsSidebar from "./pages/manage/PatientsSidebar";
import ExamRecordsSidebar from "./pages/manage/ExamRecordsSidebar";
import Complete from "./pages/examine/Complete";
import FirstMedical from "./pages/examine/FirstMedical";

const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      {
        path: "examine",
        Component: ExamineLayout,
        children: [
          {
            path: "first",
            Component: Outlet,
            children: [
              { index: true, Component: First },
              {
                path: ":patientId/medical",
                Component: FirstMedical,
              },
            ],
          },
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
            path: "patients",
            Component: PatientsSidebar,
            children: [
              {
                path: ":patientId",
                Component: ExamRecordsSidebar,
                children: [
                  {
                    path: "exam/:examineId",
                    Component: Examine,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
