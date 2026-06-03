import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-[#FFE8CC] p-0 sm:p-4 lg:p-8">
      <main className="h-full w-full overflow-hidden bg-white shadow-[0px_0px_32px_-5px_rgba(255,157,46,1)] sm:h-[calc(100vh-2rem)] sm:rounded-xl lg:h-[calc(100vh-4rem)] lg:max-w-[1440px]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
