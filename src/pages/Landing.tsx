import { Link } from "react-router";

function Landing() {
  const handleFirstVisit = () => {
    console.log("초진 선택");
    // TODO: 다음 페이지 이동 또는 상태 저장
  };

  const handleRevisit = () => {
    console.log("재진 선택");
    // TODO: 다음 페이지 이동 또는 상태 저장
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-6">
      <div className="flex h-full w-full max-w-md flex-col justify-center rounded-3xl bg-white px-5 py-8 text-neutral-900 shadow-lg">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium text-blue-600">
            AWS 정형외과 문진 시스템
          </p>

          <h1 className="text-xl font-bold leading-snug text-neutral-900">
            안녕하세요.
            <br />
            진심을 다하는
            <br />
            AWS 정형외과 의원입니다.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            정확한 진료를 위해
            <br />
            간단한 문진을 먼저 진행하겠습니다.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3">
          <Link
            to={"/examine/first"}
            onClick={handleFirstVisit}
            className="
              cursor-pointer rounded-2xl border border-blue-200 bg-blue-50 px-4 py-5
              text-center text-sm font-bold leading-snug text-blue-700 shadow-sm
              transition-all active:scale-[0.98] active:bg-blue-100
            "
          >
            처음
            <br />
            오셨나요?
            <br />
            <span className="text-xs font-semibold">(초진)</span>
          </Link>

          <Link
            to={"/examine/revisit"}
            onClick={handleRevisit}
            className="
              cursor-pointer rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-5
              text-center text-sm font-bold leading-snug text-neutral-700 shadow-sm
              transition-all active:scale-[0.98] active:bg-neutral-100
            "
          >
            다시
            <br />
            방문하셨나요?
            <br />
            <span className="text-xs font-semibold">(재진)</span>
          </Link>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-neutral-400">
          해당되는 항목을 선택하면
          <br />
          문진이 시작됩니다.
        </p>
      </div>
    </div>
  );
}

export default Landing;
