import { useNavigate } from "react-router";

function Complete() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full justify-center px-4 py-6">
        <div className="flex w-full max-w-md flex-col justify-center rounded-3xl bg-white px-5 py-8 text-neutral-900 shadow-lg">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-3xl text-blue-600">
              ✓
            </div>

            <h1 className="text-xl font-bold leading-snug text-neutral-900">
              문진표 제출이
              <br />
              완료되었습니다.
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              진료실 앞에서 잠시 대기해 주시면
              <br />
              순서대로 이름을 호명해 드리겠습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoHome}
            className="
              mt-10 w-full rounded-2xl bg-neutral-900 py-3.5 text-sm font-bold
              text-white transition-colors cursor-pointer active:bg-neutral-700
            "
          >
            처음 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Complete;
