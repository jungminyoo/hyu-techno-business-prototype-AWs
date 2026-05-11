import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="fixed w-full h-full bg-blue-500 flex justify-center items-center">
      <main className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] px-9 py-7 bg-white rounded-xl">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
