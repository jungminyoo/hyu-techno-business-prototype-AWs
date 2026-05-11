import { Outlet } from "react-router";

function ManageLayout() {
  return (
    <>
      <h1>Manage Page</h1>
      <Outlet />
    </>
  );
}

export default ManageLayout;
