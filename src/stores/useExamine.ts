import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { Examine, PainArea, PainMovement } from "../datas/examinesData";

export interface ExamineStoreType extends Examine {
  currentPainPointX: number;
  currentPainPointY: number;
  currentPainMovement: PainMovement;
  phase: "area" | "areaToPoint" | "point" | "movement";
  selectedArea: (area: PainArea) => void;
  completedAnimationToPoint: () => void;
  selectedCurrentPainPoint: (x: number, y: number) => void;
  selectedPainPoint: () => void;
  selectedCurrentPainMovement: (painMovement: PainMovement) => void;
  completedPainMovement: () => void;
}

const useExamine = create(
  subscribeWithSelector<ExamineStoreType>((set) => ({
    examineId: 0,
    patientId: 0,
    painArea: [],
    painPointX: 0,
    painPointY: 0,
    painMovement: [],
    painType: [],
    painStartedAt: new Date(),
    painScore: 0,
    isCompleted: false,
    createdAt: "",

    currentPainPointX: -10,
    currentPainPointY: -10,
    currentPainMovement: "당기기",
    phase: "area",

    selectedArea: (area: PainArea) =>
      set((state) => ({
        phase: "areaToPoint",
        painArea: [...state.painArea, area],
      })),
    completedAnimationToPoint: () => set({ phase: "point" }),

    selectedCurrentPainPoint: (x, y) =>
      set({ currentPainPointX: x, currentPainPointY: y }),

    selectedPainPoint: () =>
      set((state) => ({
        phase: "movement",
        painPointX: state.currentPainPointX,
        painPointY: state.currentPainPointY,
      })),

    selectedCurrentPainMovement: (painMovement) =>
      set({ currentPainMovement: painMovement }),
    completedPainMovement: () =>
      set((state) => ({ painMovement: [state.currentPainMovement] })),
  })),
);

export default useExamine;
