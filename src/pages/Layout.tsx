import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="fixed w-full h-full bg-[#FFE8CC] flex justify-center items-center">
      <main className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] bg-white rounded-xl overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
