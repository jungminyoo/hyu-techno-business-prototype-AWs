import { Html } from "@react-three/drei";
import type { HtmlProps } from "@react-three/drei/web/Html";
import type { PainArea } from "../../datas/examinesData";
import useExamine from "../../stores/useExamine";

type PointProps = HtmlProps & {
  area?: PainArea;
  enabled?: boolean;
  helperText?: string;
  selectedArea?: PainArea | null;
  onAreaSelect?: (area: PainArea) => void;
};

function Point(props: PointProps) {
  const currentPainArea = useExamine((state) => state.currentPainArea);
  const selectedCurrentPainArea = useExamine(
    (state) => state.selectedCurrentPainArea,
  );
  const enabled = props.enabled ?? true;
  const area = props.area ?? (props.children as PainArea);
  const selectedArea = props.selectedArea ?? currentPainArea;
  const isSelected = selectedArea === area;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (props.onAreaSelect) {
      props.onAreaSelect(area);
      return;
    }

    selectedCurrentPainArea(area);
  };

  return (
    <Html {...props} wrapperClass="z-0" center occlude={props.occlude}>
      <button
        onClick={handleClick}
        className={`
          group flex h-5 max-w-5 appearance-none items-center justify-center
          overflow-hidden rounded-full border-2 border-white px-0 text-white shadow-lg
          transition-all delay-150 duration-200 ease-in-out
          hover:h-9 hover:max-w-56 hover:px-3 hover:delay-0
          focus:h-9 focus:max-w-56 focus:px-3 focus:delay-0 focus:outline-none
          ${
            isSelected
              ? "h-9 max-w-56 cursor-pointer bg-blue-600 px-3 delay-0"
              : enabled
                ? "cursor-pointer bg-blue-500"
                : "cursor-pointer bg-neutral-500/80"
          }
        `}
      >
        <span
          className={`
            select-none whitespace-nowrap text-center text-sm font-bold text-white [-webkit-text-fill-color:white]
            transition-opacity delay-0 duration-100 ease-in-out group-hover:opacity-100 group-hover:delay-150 group-focus:opacity-100 group-focus:delay-150
            ${isSelected ? "opacity-100" : "opacity-0"}
          `}
        >
          {props.children}
          {!enabled && isSelected && (
            <span className="ml-2 text-xs font-medium text-white/80">
              {props.helperText ?? "준비중"}
            </span>
          )}
        </span>
      </button>
    </Html>
  );
}

export default Point;
