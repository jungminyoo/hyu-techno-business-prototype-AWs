import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import AnatomyModel from "./AnatomyModel";
import AreaPoints from "./AreaPoints";
import { useRef } from "react";
import * as THREE from "three";
import useExamine from "../../stores/useExamine";
import Camera from "./Camera";

function Anatomy() {
  const phase = useExamine((state) => state.phase);
  const currentPainPointX = useExamine((state) => state.currentPainPointX);
  const currentPainPointY = useExamine((state) => state.currentPainPointY);
  const selectedCurrentPainPoint = useExamine(
    (state) => state.selectedCurrentPainPoint,
  );
  const anatomyModelRef = useRef<THREE.Group>(null!);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handlePointClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== "point") return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    selectedCurrentPainPoint(x, y);
  };

  return (
    <div
      ref={canvasContainerRef}
      onClick={handlePointClick}
      className={`w-9/10 ${phase !== "area" ? "h-[90cqw]" : "h-3/4"} transition-all duration-2000 rounded-2xl overflow-hidden relative ${phase === "point" && "cursor-pointer"}`}
    >
      <Canvas>
        <color args={["#1b1b1b"]} attach="background" />

        <Environment
          preset="studio"
          environmentIntensity={0.3}
          resolution={64}
        />

        <Camera />

        <AnatomyModel ref={anatomyModelRef} position={[0, -0.9, 0]} />
        {phase === "area" && (
          <>
            <OrbitControls enablePan={false} />
            <AreaPoints anatomyModelRef={anatomyModelRef} />
          </>
        )}
      </Canvas>

      {phase === "point" && (
        <div
          className={`
        pointer-events-none
        absolute z-50
        h-4 w-4
        rounded-full bg-red-600 transition-all`}
          style={{
            left: `${currentPainPointX}px`,
            top: `${currentPainPointY}px`,
          }}
        />
      )}
    </div>
  );
}

export default Anatomy;
