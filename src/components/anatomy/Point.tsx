import { Html } from "@react-three/drei";
import type { HtmlProps } from "@react-three/drei/web/Html";
import { useState } from "react";
import type { PainArea } from "../../datas/examinesData";
import useExamine from "../../stores/useExamine";

function Point(props: HtmlProps) {
  const selectedArea = useExamine((state) => state.selectedArea);

  const [selected, setSelected] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!selected) {
      event.currentTarget.focus();
      setSelected(true);
      return;
    }

    // clicked
    const area = props.children as PainArea;
    selectedArea(area);
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <Html {...props} wrapperClass="z-0" center occlude={props.occlude}>
      <button
        onClick={handleClick}
        onBlur={handleBlur}
        className="group appearance-none cursor-none text-white flex h-4 max-w-4 items-center justify-center overflow-hidden rounded-full bg-blue-500 px-0 transition-all delay-150 duration-200 ease-in-out hover:h-8 hover:max-w-48 hover:px-3 hover:delay-0 focus:h-8 focus:max-w-48 focus:px-3 focus:delay-0 focus:outline-none"
      >
        <span className="select-none whitespace-nowrap text-center text-lg text-white [-webkit-text-fill-color:white] opacity-0 transition-opacity delay-0 duration-100 ease-in-out group-hover:opacity-100 group-hover:delay-150 group-focus:opacity-100 group-focus:delay-150">
          {props.children}
        </span>
      </button>
    </Html>
  );
}

export default Point;
