import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import {
  type Examine,
  type PainArea,
  type PainMovement,
  type PainType,
} from "../datas/examinesData";

export interface ExamineStoreType extends Examine {
  currentPainPointX: number;
  currentPainPointY: number;
  currentPainArea: PainArea | null;
  currentPainMovement: PainMovement;
  currentPainMovementAngle: number;
  phase: "area" | "areaToPoint" | "point" | "movement";
  setPatientId: (patientId: number) => void;
  startAreaSelection: () => void;
  selectedCurrentPainArea: (area: PainArea) => void;
  confirmCurrentPainArea: () => void;
  selectedArea: (area: PainArea) => void;
  completedAnimationToPoint: () => void;
  selectedCurrentPainPoint: (x: number, y: number) => void;
  selectedPainPoint: () => void;
  selectedCurrentPainMovement: (painMovement: PainMovement) => void;
  selectedCurrentPainMovementAngle: (angle: number) => void;
  completedPainMovement: () => void;
  setOtherAnswers: (answers: Pick<Examine, "painType" | "painStartedAt" | "painScore">) => void;
  backToArea: () => void;
  backToPoint: () => void;
  resetExamine: () => void;
  completedExamine: () => Examine;
}

const initialExamine: Examine & {
  currentPainPointX: number;
  currentPainPointY: number;
  currentPainArea: PainArea | null;
  currentPainMovement: PainMovement;
  currentPainMovementAngle: number;
  phase: "area" | "areaToPoint" | "point" | "movement";
} = {
  examineId: 0,
  patientId: 0,
  painArea: [],
  painPointX: 0,
  painPointY: 0,
  painMovement: [],
  painMovementAngle: undefined,
  painType: [] as PainType[],
  painStartedAt: new Date(),
  painScore: 0,
  isCompleted: false,
  createdAt: "",

  currentPainPointX: -10,
  currentPainPointY: -10,
  currentPainArea: null,
  currentPainMovement: "굽히기(굴곡)",
  currentPainMovementAngle: 90,
  phase: "area",
};

const supportsAngleSelection = (movement: PainMovement) =>
  movement === "굽히기(굴곡)" || movement === "펴기(신전)";

const getDefaultMovementAngle = (movement: PainMovement) =>
  movement === "펴기(신전)" ? 20 : 90;

const clampMovementAngle = (movement: PainMovement, angle: number) => {
  if (movement === "굽히기(굴곡)") return Math.min(140, Math.max(30, angle));
  if (movement === "펴기(신전)") return Math.min(60, Math.max(0, angle));
  return getDefaultMovementAngle(movement);
};

const reviveExamine = (state: ExamineStoreType) => {
  state.painStartedAt = new Date(state.painStartedAt);
};

const useExamine = create<ExamineStoreType>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...initialExamine,

        setPatientId: (patientId) => set({ patientId }),

        startAreaSelection: () =>
          set({
            phase: "area",
            currentPainArea: null,
            painArea: [],
            currentPainPointX: -10,
            currentPainPointY: -10,
            painPointX: 0,
            painPointY: 0,
            painMovement: [],
            painMovementAngle: undefined,
          }),

        selectedCurrentPainArea: (area: PainArea) =>
          set({ currentPainArea: area }),

        confirmCurrentPainArea: () => {
          const area = get().currentPainArea;

          if (!area) return;

          get().selectedArea(area);
        },

        selectedArea: (area: PainArea) =>
          set({
            phase: "areaToPoint",
            currentPainArea: area,
            painArea: [area],
            currentPainPointX: -10,
            currentPainPointY: -10,
            painPointX: 0,
            painPointY: 0,
            painMovement: [],
            painMovementAngle: undefined,
          }),
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
          set((state) => ({
            currentPainMovement: painMovement,
            currentPainMovementAngle: supportsAngleSelection(painMovement)
              ? clampMovementAngle(
                  painMovement,
                  state.currentPainMovementAngle,
                )
              : getDefaultMovementAngle(painMovement),
          })),
        selectedCurrentPainMovementAngle: (angle) =>
          set({ currentPainMovementAngle: angle }),
        completedPainMovement: () =>
          set((state) => ({
            painMovement: [state.currentPainMovement],
            painMovementAngle: supportsAngleSelection(
              state.currentPainMovement,
            )
              ? state.currentPainMovementAngle
              : undefined,
          })),

        setOtherAnswers: (answers) => set({ ...answers }),

        backToArea: () =>
          set({
            phase: "area",
            currentPainArea: null,
            painArea: [],
            currentPainPointX: -10,
            currentPainPointY: -10,
            painPointX: 0,
            painPointY: 0,
            painMovement: [],
            painMovementAngle: undefined,
          }),

        backToPoint: () =>
          set({
            phase: "point",
            painMovement: [],
            painMovementAngle: undefined,
          }),

        resetExamine: () => set({ ...initialExamine }),

        completedExamine: () => {
          const state = get();

          const newExamine: Examine = {
            examineId: 0,
            patientId: state.patientId,
            painArea: state.painArea,
            painPointX: state.painPointX,
            painPointY: state.painPointY,
            painMovement: state.painMovement,
            painMovementAngle: state.painMovementAngle,
            painType: state.painType,
            painStartedAt: state.painStartedAt,
            painScore: state.painScore,
            isCompleted: false,
            createdAt: new Date().toISOString(),
          };

          set({ ...initialExamine });

          return newExamine;
        },
      }),
      {
        name: "aws-orthopedics-current-examine",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          examineId: state.examineId,
          patientId: state.patientId,
          painArea: state.painArea,
          painPointX: state.painPointX,
          painPointY: state.painPointY,
          painMovement: state.painMovement,
          painMovementAngle: state.painMovementAngle,
          painType: state.painType,
          painStartedAt: state.painStartedAt,
          painScore: state.painScore,
          isCompleted: state.isCompleted,
          createdAt: state.createdAt,
          currentPainPointX: state.currentPainPointX,
          currentPainPointY: state.currentPainPointY,
          currentPainArea: state.currentPainArea,
          currentPainMovement: state.currentPainMovement,
          currentPainMovementAngle: state.currentPainMovementAngle,
          phase: state.phase,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            reviveExamine(state);
          }
        },
      },
    ),
  ),
);

export default useExamine;
