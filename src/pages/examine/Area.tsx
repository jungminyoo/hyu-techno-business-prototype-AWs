import { useNavigate } from "react-router";
import BodyAreaSelector from "../../components/anatomy/BodyAreaSelector";
import ElbowPainSelector from "../../components/anatomy/ElbowPainSelector";
import MovementOption from "../../components/area/MovementOption";
import useExamine from "../../stores/useExamine";
import ExamineProgress from "./ExamineProgress";

function Area() {
  const phase = useExamine((state) => state.phase);
  const currentPainPointX = useExamine((state) => state.currentPainPointX);
  const currentPainPointY = useExamine((state) => state.currentPainPointY);
  const selectedPainPoint = useExamine((state) => state.selectedPainPoint);
  const backToArea = useExamine((state) => state.backToArea);
  const backToPoint = useExamine((state) => state.backToPoint);
  const navigate = useNavigate();

  const handleBack = () => {
    if (phase === "movement") {
      backToPoint();
      return;
    }

    if (phase === "areaToPoint" || phase === "point") {
      backToArea();
      return;
    }

    navigate(-1);
  };

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden px-4 py-3 md:px-6 md:py-4 lg:px-8">
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl">
        <ExamineProgress currentStep={2} />
      </div>

      <div className="mb-3 w-full max-w-md text-center md:max-w-2xl">
        <p className="text-xs font-semibold text-blue-600">
          팔 통증 위치
        </p>
        <h2 className="mt-1 text-xl font-bold leading-snug text-neutral-900 md:text-2xl">
          {phase === "movement"
            ? "어떤 움직임에서 아픈가요?"
            : phase === "area"
              ? "전신에서 아픈 부위를 먼저 선택해 주세요."
              : "통증이 느껴지는 지점을 선택해 주세요."}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-500 md:text-sm">
          {phase === "area"
            ? "이번 데모에서는 팔을 선택하면 정밀 위치 선택으로 이어집니다."
            : phase === "movement"
              ? "선택한 지점을 기준으로 통증이 생기는 동작을 확인합니다."
              : "이미지 위에서 가장 불편한 지점을 한 번 더 눌러 보정할 수 있습니다."}
        </p>
      </div>

      <div className="min-h-0 w-full max-w-md flex-1 md:max-w-4xl lg:max-w-5xl">
      {phase === "area" && <BodyAreaSelector />}
      {(phase === "areaToPoint" || phase === "point") && (
        <ElbowPainSelector />
      )}
      {phase === "movement" && <MovementOption />}
      </div>

      {(phase === "areaToPoint" || phase === "point") && (
        <button
          className="mt-3 w-full max-w-md rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:cursor-pointer hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:hover:bg-neutral-300 md:max-w-4xl lg:max-w-5xl"
          disabled={currentPainPointX < 0 || currentPainPointY < 0}
          onClick={(e) => {
            e.preventDefault();
            selectedPainPoint();
          }}
        >
          선택 완료 &rarr;
        </button>
      )}

      <button
        type="button"
        onClick={handleBack}
        className="mt-2 w-full max-w-md rounded-2xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-bold text-neutral-700 transition-colors active:bg-neutral-100 md:max-w-4xl lg:max-w-5xl"
      >
        이전
      </button>
    </div>
  );
}

export default Area;
