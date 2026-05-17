import { Outlet } from "react-router";

function ExamineLayout() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none">
      <Outlet />
    </div>
  );
}

export default ExamineLayout;
