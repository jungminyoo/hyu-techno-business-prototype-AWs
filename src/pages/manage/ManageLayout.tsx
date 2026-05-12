import { Outlet } from "react-router";
import PatientsSidebar from "./PatientsSidebar";
import ExaminesSidebar from "./ExamRecordsSidebar";

function ManageLayout() {
  return (
    <div className="h-full flex min-h-0">
        <PatientsSidebar />
        <ExaminesSidebar />
        <main className="flex-1 min-w-0 overflow-auto">
          <Outlet />
        </main>
    </div>
  );
}

export default ManageLayout;
