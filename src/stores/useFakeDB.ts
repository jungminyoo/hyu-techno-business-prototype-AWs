import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  patients as initialPatients,
  type Patient,
} from "../datas/patientsData";
import {
  examines as initialExamines,
  type Examine,
} from "../datas/examinesData";

type FakeDBStoreType = {
  patients: Patient[];
  examines: Examine[];

  addPatient: (patient: Omit<Patient, "patientId" | "createdAt">) => Patient;
  updatePatient: (patientId: number, data: Partial<Patient>) => void;
  addExamine: (examine: Omit<Examine, "examineId" | "createdAt">) => Examine;
  updateExamine: (examineId: number, data: Partial<Examine>) => void;
};

const reviveExamines = (examines: Examine[]) =>
  examines.map((exam) => ({
    ...exam,
    painStartedAt: new Date(exam.painStartedAt),
  }));

const getNextId = <T>(items: T[], getId: (item: T) => number) =>
  Math.max(0, ...items.map(getId)) + 1;

const useFakeDB = create<FakeDBStoreType>()(
  persist(
    (set, get) => ({
      patients: initialPatients,
      examines: initialExamines,

      addPatient: (patientData) => {
        const newPatient: Patient = {
          ...patientData,
          patientId: getNextId(get().patients, (patient) => patient.patientId),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          patients: [...state.patients, newPatient],
        }));

        return newPatient;
      },

      updatePatient: (patientId, data) => {
        set((state) => ({
          patients: state.patients.map((patient) =>
            patient.patientId === patientId ? { ...patient, ...data } : patient,
          ),
        }));
      },

      addExamine: (examineData) => {
        const newExamine: Examine = {
          ...examineData,
          examineId: getNextId(get().examines, (examine) => examine.examineId),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          examines: [...state.examines, newExamine],
        }));

        return newExamine;
      },

      updateExamine: (examineId, data) => {
        set((state) => ({
          examines: state.examines.map((examine) =>
            examine.examineId === examineId
              ? { ...examine, ...data }
              : examine,
          ),
        }));
      },
    }),
    {
      name: "aws-orthopedics-fake-db",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.examines = reviveExamines(state.examines);
        }
      },
    },
  ),
);

export default useFakeDB;
