import * as THREE from "three";
import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import useExamine from "../../stores/useExamine";

const material = new THREE.MeshStandardMaterial({
  color: "#FFFFFF",
  roughness: 0.6,
  metalness: 0.0,
});

export function AnatomyModel(props: ThreeElements["group"]) {
  const phase = useExamine((state) => state.phase);
  const currentPainMovement = useExamine((state) => state.currentPainMovement);

  const model = useGLTF("./models/anatomy.glb");
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    model.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.material = material;
      }
    });
  }, []);

  useEffect(() => {
    if (phase !== "movement") return;

    let action: THREE.AnimationAction | null;
    switch (currentPainMovement) {
      case "굽히기(굴곡)":
        action = animations.actions.flexion;
        break;
      case "펴기(신전)":
        action = animations.actions.extension;
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

    if (action) action.reset().fadeIn(0.2).play();

    return () => {
      if (action) action.fadeOut(0.2);
    };
  }, [phase, currentPainMovement]);

  return (
    <>
      <primitive object={model.scene} {...props} />
    </>
  );
}

useGLTF.preload("./models/anatomy.glb");

export default AnatomyModel;
