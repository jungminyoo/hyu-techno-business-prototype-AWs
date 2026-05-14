import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useExamine from "../../stores/useExamine";
import { useMemo, useState } from "react";
import * as THREE from "three";

function Camera() {
  const phase = useExamine((state) => state.phase);
  const completedAnimationToPoint = useExamine(
    (state) => state.completedAnimationToPoint,
  );

  const [pointPosition] = useState(() => new THREE.Vector3(0.8, 0.5, 0.3));
  const [movementPosition] = useState(() => new THREE.Vector3(1, 1, 1));
  const [currentPosition] = useState(() => new THREE.Vector3(0, 1, 2.8));

  const pointQuaternion = useMemo(() => {
    const tempCamera = new THREE.Camera();
    tempCamera.position.copy(pointPosition);
    tempCamera.lookAt(new THREE.Vector3(0.45, 0.45, -0.05));
    return tempCamera.quaternion;
  }, [pointPosition]);
  const movementQuaternion = useMemo(() => {
    const tempCamera = new THREE.Camera();
    tempCamera.position.copy(movementPosition);
    tempCamera.lookAt(new THREE.Vector3(0.45, 0.45, -0.05));
    return tempCamera.quaternion;
  }, [movementPosition]);
  const [currentQuaternion] = useState(() => new THREE.Quaternion());

  useFrame((state, delta) => {
    switch (phase) {
      case "area":
        currentPosition.copy(state.camera.position);
        currentQuaternion.copy(state.camera.quaternion);
        return;

      case "areaToPoint":
        state.camera.position.lerp(pointPosition, delta * 2);
        state.camera.quaternion.slerp(pointQuaternion, delta * 2);
        if (state.camera.position.distanceTo(pointPosition) < 0.01)
          completedAnimationToPoint();
        return;

      case "movement":
        state.camera.position.lerp(movementPosition, delta * 2);
        state.camera.quaternion.slerp(movementQuaternion, delta * 2);
        return;
    }
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        near={0.1}
        far={10}
        position={[currentPosition.x, currentPosition.y, currentPosition.z]}
      />
    </>
  );
}

export default Camera;
