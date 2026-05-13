import { Outlet } from "react-router";

function ManageLayout() {
  return (
    <div className="h-full flex min-h-0">
      <main className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ManageLayout;
