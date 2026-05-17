import { create } from "zustand";
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
};

const useFakeDB = create<FakeDBStoreType>((set, get) => ({
  patients: initialPatients,
  examines: initialExamines,

  addPatient: (patientData) => {
    const newPatient: Patient = {
      ...patientData,
      patientId: get().patients.length + 1,
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
      examineId: get().examines.length + 1,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      examines: [...state.examines, newExamine],
    }));

    return newExamine;
  },
}));

export default useFakeDB;
