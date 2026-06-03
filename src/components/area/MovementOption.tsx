import { useNavigate } from "react-router";
import Anatomy from "../anatomy/Anatomy";
import type { PainMovement } from "../../datas/examinesData";
import useExamine from "../../stores/useExamine";

const painMovementOptions: PainMovement[] = [
  "굽히기(굴곡)",
  "펴기(신전)",
  "밀기",
  "당기기",
  "손목 바깥쪽으로 돌리기(회외)",
  "손목 안쪽으로 돌리기(회내)",
  "해당 부위를 누를 시 통증",
  "정지 시에도 통증",
];

const movementDescriptions: Record<PainMovement, string> = {
  "굽히기(굴곡)": "팔꿈치를 접을 때",
  "펴기(신전)": "팔을 끝까지 펼 때",
  밀기: "문을 밀거나 손바닥으로 누를 때",
  당기기: "물건을 끌어당길 때",
  "손목 바깥쪽으로 돌리기(회외)": "손바닥을 위로 돌릴 때",
  "손목 안쪽으로 돌리기(회내)": "손바닥을 아래로 돌릴 때",
  "해당 부위를 누를 시 통증": "직접 눌렀을 때",
  "정지 시에도 통증": "가만히 아플 때",
};

const movementLabels: Record<PainMovement, string> = {
  "굽히기(굴곡)": "굽히기",
  "펴기(신전)": "펴기",
  밀기: "밀기",
  당기기: "당기기",
  "손목 바깥쪽으로 돌리기(회외)": "손목 바깥 회전",
  "손목 안쪽으로 돌리기(회내)": "손목 안쪽 회전",
  "해당 부위를 누를 시 통증": "누르면 통증",
  "정지 시에도 통증": "정지 시 통증",
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

function MovementOption() {
  const currentPainMovement = useExamine((state) => state.currentPainMovement);
  const selectedCurrentPainMovement = useExamine(
    (state) => state.selectedCurrentPainMovement,
  );
  const selectedCurrentPainMovementAngle = useExamine(
    (state) => state.selectedCurrentPainMovementAngle,
  );
  const completedPainMovement = useExamine(
    (state) => state.completedPainMovement,
  );

  const navigate = useNavigate();
  const angleConfig = angleConfigs[currentPainMovement];

  return (
    <div className="grid h-full w-full grid-rows-[minmax(0,1fr)_auto] gap-2 rounded-3xl border border-neutral-200 bg-white p-2 shadow-lg md:gap-3 md:p-3 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[minmax(0,1fr)_auto] lg:p-4">
      <div className="relative min-h-0 overflow-hidden rounded-3xl bg-neutral-950">
        <Anatomy />

        <div className="pointer-events-none absolute left-3 right-3 top-3 z-20 rounded-2xl bg-white/92 px-3 py-2 shadow-lg backdrop-blur-sm md:left-4 md:right-auto md:w-72">
          <p className="text-[11px] font-semibold text-blue-600">
            유발 동작 미리보기
          </p>
          <p className="mt-1 text-sm font-bold leading-snug text-neutral-900">
            {currentPainMovement}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">
            {movementDescriptions[currentPainMovement]}
          </p>
          {angleConfig && (
            <p className="mt-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              다음 화면에서 통증 각도 선택
            </p>
          )}
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 rounded-2xl bg-neutral-950/70 px-3 py-2 text-white backdrop-blur-sm md:left-auto md:w-64">
          <p className="text-xs font-semibold text-blue-200">
            선택한 동작에 맞춰 모델이 움직입니다.
          </p>
        </div>
      </div>

      <div className="grid min-h-0 w-full grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-1">
        {painMovementOptions.map((movement) => {
          const isSelected = currentPainMovement === movement;

          return (
            <button
              key={movement}
              type="button"
              onClick={() => selectedCurrentPainMovement(movement)}
              className={`
                flex min-h-11 items-center justify-between gap-2 overflow-hidden rounded-2xl border px-2.5 py-1.5 text-left lg:min-h-0 lg:px-3 lg:py-1
                transition-all duration-200 hover:cursor-pointer
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-blue-300 hover:bg-blue-50"
                }
              `}
            >
              <span className="min-w-0 shrink-0 truncate text-[13px] font-bold leading-none lg:text-xs">
                {movementLabels[movement]}
              </span>
              <span
                className={`min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-right text-[10px] leading-none lg:text-[10px] ${
                  isSelected ? "text-blue-600" : "text-neutral-500"
                }`}
              >
                {movementDescriptions[movement]}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          if (angleConfig) {
            selectedCurrentPainMovementAngle(angleConfig.min);
            navigate("/examine/movement-angle");
            return;
          }

          completedPainMovement();
          navigate("/examine/others");
        }}
        className="
          w-full rounded-2xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white
          transition-colors
          hover:cursor-pointer hover:bg-blue-500
          lg:col-span-2
        "
      >
        {angleConfig ? "통증 각도 선택" : "다음 문진으로 이동"}
      </button>
    </div>
  );
}

export default MovementOption;
