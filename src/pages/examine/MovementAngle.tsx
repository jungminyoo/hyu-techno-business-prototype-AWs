import { useNavigate } from "react-router";
import { useEffect } from "react";
import Anatomy from "../../components/anatomy/Anatomy";
import type { PainMovement } from "../../datas/examinesData";
import useExamine from "../../stores/useExamine";
import ExamineProgress from "./ExamineProgress";

const movementDescriptions: Record<PainMovement, string> = {
  "굽히기(굴곡)": "팔꿈치를 접을 때",
  "펴기(신전)": "팔을 끝까지 펼 때",
  밀기: "문을 밀거나 손바닥으로 누를 때",
  당기기: "물건을 끌어당길 때",
  "손목 바깥쪽으로 돌리기(회외)": "손바닥을 위로 돌릴 때",
  "손목 안쪽으로 돌리기(회내)": "손바닥을 아래로 돌릴 때",
  "해당 부위를 누를 시 통증": "직접 눌렀을 때",
  "정지 시에도 통증": "가만히 있어도 아플 때",
};

const angleConfigs: Partial<
  Record<
    PainMovement,
    {
      min: number;
      max: number;
      step: number;
      lowLabel: string;
      highLabel: string;
    }
  >
> = {
  "굽히기(굴곡)": {
    min: 30,
    max: 140,
    step: 1,
    lowLabel: "최대로 편 상태",
    highLabel: "많이 굽힘",
  },
  "펴기(신전)": {
    min: 0,
    max: 60,
    step: 1,
    lowLabel: "최대로 굽힌 상태",
    highLabel: "펴지는 구간",
  },
};

function MovementAngle() {
  const navigate = useNavigate();
  const currentPainMovement = useExamine((state) => state.currentPainMovement);
  const currentPainMovementAngle = useExamine(
    (state) => state.currentPainMovementAngle,
  );
  const selectedCurrentPainMovementAngle = useExamine(
    (state) => state.selectedCurrentPainMovementAngle,
  );
  const completedPainMovement = useExamine(
    (state) => state.completedPainMovement,
  );

  const angleConfig = angleConfigs[currentPainMovement];

  useEffect(() => {
    if (!angleConfig) return;

    selectedCurrentPainMovementAngle(angleConfig.min);
  }, [angleConfig, selectedCurrentPainMovementAngle]);

  if (!angleConfig) {
    return (
      <div className="flex h-full w-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-lg">
          <p className="text-sm font-bold text-neutral-900">
            각도 선택이 필요 없는 동작입니다.
          </p>
          <button
            type="button"
            onClick={() => navigate("/examine/area")}
            className="mt-4 w-full rounded-2xl bg-neutral-900 py-3 text-sm font-bold text-white"
          >
            움직임 선택으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden px-4 py-3 md:px-6 md:py-4 lg:px-8">
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl">
        <ExamineProgress currentStep={2} />
      </div>

      <div className="mb-3 w-full max-w-md text-center md:max-w-2xl">
        <p className="text-xs font-semibold text-blue-600">
          통증 발생 각도
        </p>
        <h2 className="mt-1 text-xl font-bold leading-snug text-neutral-900 md:text-2xl">
          어느 각도에서 통증이 시작되나요?
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-500 md:text-sm">
          슬라이더를 움직이면 3D 자세가 해당 각도로 부드럽게 이어집니다.
        </p>
      </div>

      <section className="grid min-h-0 w-full max-w-md flex-1 grid-rows-[minmax(0,1fr)_auto] gap-2 rounded-3xl border border-neutral-200 bg-white p-2 shadow-lg md:max-w-4xl md:gap-3 md:p-3 lg:max-w-5xl lg:grid-cols-[1.25fr_0.75fr] lg:grid-rows-1 lg:p-4">
        <div className="relative min-h-0 overflow-hidden rounded-3xl bg-neutral-950">
          <Anatomy animationMode="angle" />

          <div className="pointer-events-none absolute left-3 right-3 top-3 z-20 rounded-2xl bg-white/92 px-3 py-2 shadow-lg backdrop-blur-sm md:left-4 md:right-auto md:w-72">
            <p className="text-[11px] font-semibold text-blue-600">
              {currentPainMovement}
            </p>
            <p className="mt-1 text-sm font-bold leading-snug text-neutral-900">
              {movementDescriptions[currentPainMovement]}
            </p>
            <p className="mt-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              현재 {currentPainMovementAngle}°
            </p>
          </div>
        </div>

        <aside className="flex min-h-0 flex-col justify-between rounded-3xl bg-blue-50 p-4">
          <div>
            <p className="text-[11px] font-semibold text-blue-600">
              각도 조절
            </p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-neutral-900">
                  통증이 시작되는 각도
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  환자가 통증을 느끼는 순간의 팔꿈치 각도를 선택합니다.
                </p>
              </div>
              <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-600 text-2xl font-bold text-white shadow-sm">
                {currentPainMovementAngle}°
              </div>
            </div>

            <input
              type="range"
              min={angleConfig.min}
              max={angleConfig.max}
              step={angleConfig.step}
              value={currentPainMovementAngle}
              onChange={(event) =>
                selectedCurrentPainMovementAngle(Number(event.target.value))
              }
              className="mt-6 w-full cursor-pointer accent-blue-600"
            />

            <div className="mt-2 flex justify-between text-[11px] font-semibold text-blue-700/80">
              <span>
                {angleConfig.lowLabel} · {angleConfig.min}°
              </span>
              <span>
                {angleConfig.highLabel} · {angleConfig.max}°
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={() => {
                completedPainMovement();
                navigate("/examine/others");
              }}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
            >
              각도 저장 후 다음
            </button>
            <button
              type="button"
              onClick={() => navigate("/examine/area")}
              className="w-full rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition-colors active:bg-blue-50"
            >
              움직임 다시 선택
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default MovementAngle;
