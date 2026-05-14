import { useNavigate } from "react-router";
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

function MovementOption() {
  const currentPainMovement = useExamine((state) => state.currentPainMovement);
  const selectedCurrentPainMovement = useExamine(
    (state) => state.selectedCurrentPainMovement,
  );
  const completedPainMovement = useExamine(
    (state) => state.completedPainMovement,
  );

  const navigate = useNavigate();

  return (
    <div className="mt-3 flex w-full flex-col items-center">
      <div className="grid w-9/10 grid-cols-2 gap-1">
        {painMovementOptions.map((movement) => {
          const isSelected = currentPainMovement === movement;

          return (
            <button
              key={movement}
              type="button"
              onClick={() => selectedCurrentPainMovement(movement)}
              className={`
                rounded-2xl border px-3 py-2 text-center text-xs
                transition-all duration-200
                hover:cursor-pointer
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                }
              `}
            >
              {movement}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          completedPainMovement();
          navigate("/examine/others");
        }}
        className="
          mt-2 rounded-2xl bg-blue-600 px-4 py-2 text-white text-sm
          transition-colors
          hover:cursor-pointer hover:bg-blue-500
        "
      >
        선택 완료 &rarr;
      </button>
    </div>
  );
}

export default MovementOption;
