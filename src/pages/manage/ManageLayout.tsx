import { Outlet } from "react-router";
import Dashboard from "./Dashboard";

function ManageLayout() {
  return (
    <>
      <div className="flex-1 min-h-0 flex">
        <Dashboard />
        <main className="flex-1 min-w-0 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default ManageLayout;
