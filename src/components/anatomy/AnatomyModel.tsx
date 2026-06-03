import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import useExamine from "../../stores/useExamine";

const material = new THREE.MeshStandardMaterial({
  color: "#FFFFFF",
  roughness: 0.6,
  metalness: 0.0,
});

type AnatomyModelProps = ThreeElements["group"] & {
  animationMode?: "auto" | "angle";
};

export function AnatomyModel({
  animationMode = "auto",
  ...props
}: AnatomyModelProps) {
  const phase = useExamine((state) => state.phase);
  const currentPainMovement = useExamine((state) => state.currentPainMovement);
  const currentPainMovementAngle = useExamine(
    (state) => state.currentPainMovementAngle,
  );

  const model = useGLTF("./models/anatomy.glb");
  const animations = useAnimations(model.animations, model.scene);
  const angleActionRef = useRef<THREE.AnimationAction | null>(null);
  const angleRangeRef = useRef<{ min: number; max: number } | null>(null);
  const currentPainMovementAngleRef = useRef(currentPainMovementAngle);
  const targetActionTimeRef = useRef(0);

  useEffect(() => {
    currentPainMovementAngleRef.current = currentPainMovementAngle;
  }, [currentPainMovementAngle]);

  useEffect(() => {
    model.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.material = material;
      }
    });
  }, [model.scene]);

  useEffect(() => {
    angleActionRef.current = null;
    angleRangeRef.current = null;

    if (phase !== "movement") return;

    let action: THREE.AnimationAction | null;
    let angleRange: { min: number; max: number } | null = null;

    switch (currentPainMovement) {
      case "굽히기(굴곡)":
        action = animations.actions.flexion;
        angleRange = { min: 30, max: 140 };
        break;
      case "펴기(신전)":
        action = animations.actions.extension;
        angleRange = { min: 0, max: 60 };
        break;
      case "밀기":
        action = animations.actions.push;
        break;
      case "당기기":
        action = animations.actions.pull;
        break;
      case "손목 바깥쪽으로 돌리기(회외)":
        action = animations.actions.supination;
        break;
      case "손목 안쪽으로 돌리기(회내)":
        action = animations.actions.pronation;
        break;
      default:
        action = null;
    }

    if (action) {
      action.reset().fadeIn(0.2).play();

      if (angleRange && animationMode === "angle") {
        angleActionRef.current = action;
        angleRangeRef.current = angleRange;

        const normalized =
          (currentPainMovementAngleRef.current - angleRange.min) /
          (angleRange.max - angleRange.min);
        const clamped = THREE.MathUtils.clamp(normalized, 0, 1);

        action.paused = true;
        targetActionTimeRef.current = action.getClip().duration * clamped;
      } else {
        action.paused = false;
      }
    }

    return () => {
      if (action) {
        action.paused = false;
        action.fadeOut(0.2);
      }
    };
  }, [animationMode, animations.actions, currentPainMovement, phase]);

  useFrame((_, delta) => {
    const action = angleActionRef.current;
    const angleRange = angleRangeRef.current;

    if (!action || !angleRange) return;

    const normalized =
      (currentPainMovementAngle - angleRange.min) /
      (angleRange.max - angleRange.min);
    const clamped = THREE.MathUtils.clamp(normalized, 0, 1);
    const targetTime = action.getClip().duration * clamped;

    targetActionTimeRef.current = targetTime;
    action.time = THREE.MathUtils.damp(
      action.time,
      targetActionTimeRef.current,
      14,
      delta,
    );
  });

  return (
    <>
      <primitive object={model.scene} {...props} />
    </>
  );
}

useGLTF.preload("./models/anatomy.glb");

export default AnatomyModel;
