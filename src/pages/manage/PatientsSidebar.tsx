import { useMemo, useState } from "react";
import { NavLink, Outlet } from "react-router";
import logoImage from "../../assets/img/152a15a6bf3756c63c9f5b2effa70bc6.png";
import useFakeDB from "../../stores/useFakeDB";

function PatientsSidebar() {
  const patients = useFakeDB((state) => state.patients);
  const examines = useFakeDB((state) => state.examines);
  const [keyword, setKeyword] = useState("");

  const hasOngoingExamByPatient = (patientId: number) => {
    return examines.some(
      (exam) => exam.patientId === patientId && !exam.isCompleted,
    );
  };

  const filteredPatients = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return patients
      .filter((patient) => {
        if (!normalizedKeyword) return true;

        return [patient.name, patient.birthDate, patient.phone, patient.address]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedKeyword));
      })
      .sort((a, b) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return bDate - aDate;
      });
  }, [keyword, patients]);

  const getLatestExamSummary = (patientId: number) => {
    const latestExam = examines
      .filter((exam) => exam.patientId === patientId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0];

    if (!latestExam) return "문진 기록 없음";

    return `${latestExam.painArea.join(", ")} · ${latestExam.painScore}점`;
  };

  return (
    <div className="flex h-full min-h-0 overflow-x-auto md:overflow-hidden">
      <aside className="relative w-60 shrink-0 overflow-hidden border-r border-slate-200 bg-white p-4 lg:w-72">
        <img
          src={logoImage}
          alt="Logo"
          className="absolute top-4 left-4 w-8 h-8 object-contain"
        />
        <h2 className="mt-10  mb-3 text-sm font-semibold text-slate-900">
          Patients
        </h2>

        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="이름, 생년월일, 전화 검색"
          className="mb-3 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />

        <p className="mb-2 text-[11px] font-medium text-slate-400">
          {filteredPatients.length}명
        </p>

        <nav className="flex flex-col gap-2 overflow-auto max-h-[calc(100vh-10rem)] pr-1">
          {filteredPatients.map((patient) => (
            <NavLink
              key={patient.patientId}
              to={`./${patient.patientId}`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center justify-between gap-2">
                    <span>{patient.name}</span>
                    {hasOngoingExamByPatient(patient.patientId) && (
                      <span
                        className={
                          isActive ? "text-amber-200" : "text-amber-400"
                        }
                      >
                        ●
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 block truncate text-[10px] ${
                      isActive ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {getLatestExamSummary(patient.patientId)}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="h-full min-w-[620px] flex-1 md:min-w-0">
        <Outlet />
      </div>
    </div>
  );
}

export default PatientsSidebar;
