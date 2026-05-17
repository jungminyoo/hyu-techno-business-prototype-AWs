import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useProgress } from "@react-three/drei";
import AnatomyModel from "./AnatomyModel";
import AreaPoints from "./AreaPoints";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useExamine from "../../stores/useExamine";
import Camera from "./Camera";

function Anatomy() {
  const progress = useProgress((state) => state.progress);

  const phase = useExamine((state) => state.phase);
  const currentPainPointX = useExamine((state) => state.currentPainPointX);
  const currentPainPointY = useExamine((state) => state.currentPainPointY);
  const selectedCurrentPainPoint = useExamine(
    (state) => state.selectedCurrentPainPoint,
  );

  const anatomyModelRef = useRef<THREE.Group>(null!);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [showAreaGuide, setShowAreaGuide] = useState(true);

  useEffect(() => {
    if (phase !== "area") return;
    if (progress < 100) return;

    const timer = window.setTimeout(() => {
      setShowAreaGuide(false);
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase, progress]);

  const handlePointClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== "point") return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    selectedCurrentPainPoint(x, y);
  };

  return (
    <div
      ref={canvasContainerRef}
      onClick={handlePointClick}
      className={`relative w-9/10 ${
        phase !== "area" ? "h-[90cqw]" : "h-3/4"
      } transition-all duration-2000 rounded-2xl overflow-hidden ${
        phase === "point" && "cursor-pointer"
      }`}
    >
      <Canvas
        className="absolute inset-0 h-full w-full"
        gl={{ preserveDrawingBuffer: true }}
      >
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

      <div
        className={`
        pointer-events-none absolute inset-0 z-40
        flex items-center justify-center bg-black text-center text-xl font-light text-white
        transition-opacity duration-500
        ${progress >= 100 ? "opacity-0" : "opacity-100"}
      `}
      >
        로딩 중...{Math.round(progress)}%
      </div>

      {phase === "point" &&
        currentPainPointX >= 0 &&
        currentPainPointY >= 0 && (
          <div
            className="
          pointer-events-none absolute z-50
          h-4 w-4 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-red-600 transition-all
        "
            style={{
              left: `${currentPainPointX * 100}%`,
              top: `${currentPainPointY * 100}%`,
            }}
          />
        )}

      {phase === "area" && progress >= 100 && (
        <div
          className={`
          pointer-events-none absolute top-1/2 left-1/2 z-20
          -translate-x-1/2 -translate-y-1/2
          rounded-full bg-black/70 px-4 py-2
          text-center text-sm font-medium text-white
          transition-all duration-500
          ${showAreaGuide ? "opacity-100" : "opacity-0 translate-y-[-60%]"}
        `}
        >
          모형을 돌리거나 확대해 보세요
        </div>
      )}
    </div>
  );
}

export default Anatomy;
