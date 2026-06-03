import Point from "./Point";
import * as THREE from "three";
import type { PainArea } from "../../datas/examinesData";

function AreaPoints(props: {
  anatomyModelRef: React.RefObject<THREE.Group>;
  selectedArea?: PainArea | null;
  onAreaSelect?: (area: PainArea) => void;
}) {
  return (
    <>
      <Point
        selectedArea={props.selectedArea}
        onAreaSelect={props.onAreaSelect}
        enabled={false}
        helperText="데모 준비중"
        occlude={[]}
        position={[0, 0.65, -0.05]}
      >
        목
      </Point>
      <Point
        selectedArea={props.selectedArea}
        onAreaSelect={props.onAreaSelect}
        enabled={false}
        helperText="데모 준비중"
        occlude={[]}
        position={[0.2, 0.65, -0.05]}
      >
        어깨
      </Point>
      <Point
        selectedArea={props.selectedArea}
        onAreaSelect={props.onAreaSelect}
        enabled={false}
        helperText="데모 준비중"
        occlude={[props.anatomyModelRef]}
        position={[0, 0.4, -0.15]}
      >
        등
      </Point>
      <Point
        selectedArea={props.selectedArea}
        onAreaSelect={props.onAreaSelect}
        enabled={false}
        helperText="데모 준비중"
        occlude={[props.anatomyModelRef]}
        position={[0, 0.2, -0.1]}
      >
        허리
      </Point>
      <Point
        selectedArea={props.selectedArea}
        onAreaSelect={props.onAreaSelect}
        enabled={false}
        helperText="데모 준비중"
        occlude={[props.anatomyModelRef]}
        position={[0.1, -0.38, 0.1]}
      >
        무릎
      </Point>
      <Point
        selectedArea={props.selectedArea}
        onAreaSelect={props.onAreaSelect}
        enabled={false}
        helperText="데모 준비중"
        occlude={[props.anatomyModelRef]}
        position={[0.1, -0.8, 0.06]}
      >
        발목
      </Point>
      <Point
        area="팔꿈치"
        selectedArea={props.selectedArea}
        onAreaSelect={props.onAreaSelect}
        occlude={[]}
        position={[0.45, 0.45, -0.05]}
      >
        팔
      </Point>
    </>
  );
}

export default AreaPoints;
