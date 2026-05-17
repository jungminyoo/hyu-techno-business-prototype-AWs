import Point from "./Point";
import * as THREE from "three";

function AreaPoints(props: { anatomyModelRef: React.RefObject<THREE.Group> }) {
  return (
    <>
      <Point occlude={[]} position={[0, 0.65, -0.05]}>
        목
      </Point>
      <Point occlude={[]} position={[0.2, 0.65, -0.05]}>
        어깨
      </Point>
      <Point occlude={[props.anatomyModelRef]} position={[0, 0.4, -0.15]}>
        등
      </Point>
      <Point occlude={[props.anatomyModelRef]} position={[0, 0.2, -0.1]}>
        허리
      </Point>
      <Point occlude={[props.anatomyModelRef]} position={[0.1, -0.38, 0.1]}>
        무릎
      </Point>
      <Point occlude={[props.anatomyModelRef]} position={[0.1, -0.8, 0.06]}>
        발목
      </Point>
      <Point occlude={[]} position={[0.45, 0.45, -0.05]}>
        팔꿈치
      </Point>
    </>
  );
}

export default AreaPoints;
