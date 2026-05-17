import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="fixed w-full h-full bg-[#FFE8CC] flex justify-center items-center">
      <main className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] bg-white rounded-xl shadow-[0px_0px_32px_-5px_rgba(255,157,46,1)] overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
