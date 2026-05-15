import type { Patient } from "../../datas/patientsData";

function formatBirthDate(value: string) {
  if (value.length !== 6) {
    return value;
  }

  return `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 6)}`;
}

function formatPhone(value: string) {
  if (value.length !== 11) {
    return value;
  }

  return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
        active ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
      }`}
    >
      {active ? "ACTIVE" : "INACTIVE"}
    </span>
  );
} 

function PatientInfo({ patient }: { patient: Patient }) {
  return (
    <>
      <div className="sticky top-0 z-100 flex items-center gap-4 border-b p-4 border-slate-200 bg-white">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-amber-200 text-lg font-semibold text-slate-900"> {/* patientImg */}
          {patient.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-black text-slate-950">{patient.name}</h2>
          <p className="mt-1 text-sm font-medium text-slate-400">{formatBirthDate(patient.birthDate)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 text-sm">
        <div className="rounded-lg bg-slate-50 p-3 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
          </svg>
          <p className="font-medium text-slate-900">{formatBirthDate(patient.birthDate)}</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <p className="font-medium text-slate-900">{patient.gender}</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          <p className="font-medium text-slate-900">{formatPhone(patient.phone)}</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <p className="font-medium text-slate-900">{patient.address}</p>
        </div>

        <div className="border-t border-slate-200" />

        <details className="rounded-lg bg-slate-50 p-3 group" open>
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-slate-900">
            기저질환
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-blue-500 transition-transform duration-200 group-open:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
              />
            </svg>
          </summary>
          <div className="mt-3 space-y-3">
            {(patient.diseases?.length || 0) > 0 ? (
              patient.diseases!.map((disease, index) => (
                <div key={`${disease}-${index}`} className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{disease}</p>
                  <StatusBadge active={true} />
                </div>
              ))
            ) : patient.pastDiseases && patient.pastDiseases.length > 0 ? (
              patient.pastDiseases.map((disease, index) => (
                <div key={`${disease}-${index}`} className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{disease}</p>
                  <StatusBadge active={false} />
                </div>
              ))
            ) : (
              <div className="space-y-1">
                <p className="font-medium text-slate-500">없음</p>
              </div>
            )}
          </div>
        </details>

        <details className="rounded-lg bg-slate-50 p-3 group" open>
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-slate-900">
            복용약
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-blue-500 transition-transform duration-200 group-open:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
              />
            </svg>
          </summary>
          <div className="mt-3 space-y-3">
            {(patient.medications?.length || 0) > 0 ? (
              patient.medications!.map((medication, index) => (
                <div key={`${medication}-${index}`} className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{medication}</p>
                  <StatusBadge active={true} />
                </div>
              ))
            ) : patient.pastMedications && patient.pastMedications.length > 0 ? (
              patient.pastMedications.map((medication, index) => (
                <div key={`${medication}-${index}`} className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{medication}</p>
                  <StatusBadge active={false} />
                </div>
              ))
            ) : (
              <div className="space-y-1">
                <p className="font-medium text-slate-500">없음</p>
              </div>
            )}
          </div>
        </details>

        <details className="rounded-lg bg-slate-50 p-3 group" open>
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-slate-900">
            알레르기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-blue-500 transition-transform duration-200 group-open:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
              />
            </svg>
          </summary>
          <div className="mt-3">
            {patient.allergyDescription ? (
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-slate-900">
                  {patient.allergyDescription}
                </p>
                <StatusBadge active={true} />
              </div>
            ) : patient.pastAllergyDescription ? (
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-slate-900">
                  {patient.pastAllergyDescription}
                </p>
                <StatusBadge active={false} />
              </div>
            ) : (
              <p className="font-medium text-slate-500">없음</p>
            )}
          </div>
        </details>
      </div>
    </>
  );
}

export default PatientInfo;
