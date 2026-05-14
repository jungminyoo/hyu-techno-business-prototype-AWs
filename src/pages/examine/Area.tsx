import Anatomy from "../../components/anatomy/Anatomy";
import MovementOption from "../../components/area/MovementOption";
import useExamine from "../../stores/useExamine";

function Area() {
  const phase = useExamine((state) => state.phase);
  const currentPainPointX = useExamine((state) => state.currentPainPointX);
  const currentPainPointY = useExamine((state) => state.currentPainPointY);
  const selectedPainPoint = useExamine((state) => state.selectedPainPoint);

  return (
    <>
      <h2
        className={`text-center mb-10 font-bold text-2xl ${phase !== "area" && "hidden"}`}
      >
        아픈 부위를 선택해 주세요.
      </h2>
      <h2
        className={`text-center mb-10 font-bold text-2xl ${phase !== "areaToPoint" && phase !== "point" && "hidden"}`}
      >
        아픈 지점을 선택해 주세요.
      </h2>
      <h2
        className={`text-center mb-4 font-bold text-xl ${phase !== "movement" && "hidden"}`}
      >
        통증이 유발되는 움직임을 <br />
        선택해 주세요.
      </h2>

      <Anatomy />

      {(phase === "areaToPoint" || phase === "point") && (
        <button
          className={`px-4 py-2 mt-5 bg-blue-600 text-white rounded-2xl transition-colors hover:cursor-pointer hover:bg-blue-500 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed`}
          disabled={currentPainPointX < 0 || currentPainPointY < 0}
          onClick={(e) => {
            e.preventDefault();
            selectedPainPoint();
          }}
        >
          선택 완료 &rarr;
        </button>
      )}

      {phase === "movement" && <MovementOption />}
    </>
  );
}

export default Area;
