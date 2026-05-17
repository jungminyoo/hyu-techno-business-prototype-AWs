import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {
  examines,
  type Examine,
  type PainArea,
  type PainMovement,
} from "../datas/examinesData";

export interface ExamineStoreType extends Examine {
  currentPainPointX: number;
  currentPainPointY: number;
  currentPainMovement: PainMovement;
  phase: "area" | "areaToPoint" | "point" | "movement";
  setPatientId: (patientId: number) => void;
  selectedArea: (area: PainArea) => void;
  completedAnimationToPoint: () => void;
  selectedCurrentPainPoint: (x: number, y: number) => void;
  selectedPainPoint: () => void;
  selectedCurrentPainMovement: (painMovement: PainMovement) => void;
  completedPainMovement: () => void;
  completedExamine: (
    othersResult: Pick<Examine, "painType" | "painStartedAt" | "painScore">,
  ) => Examine;
}

const initialExamine: Examine & {
  currentPainPointX: number;
  currentPainPointY: number;
  currentPainMovement: PainMovement;
  phase: "area" | "areaToPoint" | "point" | "movement";
} = {
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
  currentPainMovement: "굽히기(굴곡)",
  phase: "area",
};

const useExamine = create(
  subscribeWithSelector<ExamineStoreType>((set, get) => ({
    ...initialExamine,

    setPatientId: (patientId) => set({ patientId }),

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

    completedExamine: (othersResult) => {
      const state = get();

      const newExamine: Examine = {
        examineId: examines.length + 1,
        patientId: state.patientId,
        painArea: state.painArea,
        painPointX: state.painPointX,
        painPointY: state.painPointY,
        painMovement: state.painMovement,
        painType: othersResult.painType,
        painStartedAt: othersResult.painStartedAt,
        painScore: othersResult.painScore,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };

      set({ ...initialExamine }); // reset

      return newExamine;
    },
  })),
);

export default useExamine;
