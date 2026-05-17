import { useMemo } from "react";
import { NavLink, Outlet, useParams } from "react-router";
import PatientInfo from "./PatientInfo";
import type { Examine } from "../../datas/examinesData";
import useFakeDB from "../../stores/useFakeDB";

function ExamRecordsSidebar() {
  const patients = useFakeDB((state) => state.patients);
  const examines = useFakeDB((state) => state.examines);

  const { patientId } = useParams<{ patientId: string }>();
  const resolvedPatientId = patientId ? Number(patientId) : NaN;

  const patient = useMemo(() => {
    if (Number.isNaN(resolvedPatientId)) return undefined;
    return patients.find((item) => item.patientId === resolvedPatientId);
  }, [resolvedPatientId, patients]);

  const patientExamines = useMemo(() => {
    if (Number.isNaN(resolvedPatientId)) return [];
    return examines.filter((exam) => exam.patientId === resolvedPatientId);
  }, [resolvedPatientId, examines]);

  return (
    <div className="h-full flex min-h-0">
      <aside className="relative w-56 h-full border-r border-slate-200 bg-white overflow-y-auto no-scrollbar">
        {patient ? (
          <PatientInfo patient={patient} />
        ) : (
          <p className="text-sm text-slate-500">환자를 선택해주세요.</p>
        )}

        <div className="border-t border-slate-200 mx-4" />

        <div className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-900">
            검사 기록
          </h3>
          <nav className="flex flex-col gap-0.5">
            {patientExamines.length > 0 ? (
              patientExamines.map((exam: Examine) => (
                <NavLink
                  key={exam.examineId}
                  to={`./exam/${exam.examineId}`}
                  className={({ isActive }) =>
                    `group px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate leading-snug">
                      {exam.painArea.join(", ")}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 text-[10px] text-slate-400">
                      <span>
                        {(() => {
                          const date = new Date(exam.createdAt);
                          return `${date.getMonth() + 1}/${date.getDate()}`;
                        })()}
                      </span>
                      {exam.isCompleted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="size-3.5 text-emerald-500"
                          aria-label="완료"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      ) : (
                        <span className="text-amber-400">●</span>
                      )}
                    </div>
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    통증 {exam.painScore}점
                  </p>
                </NavLink>
              ))
            ) : (
              <p className="px-3 py-2 text-xs text-slate-400">
                검사 기록이 없습니다.
              </p>
            )}
          </nav>
        </div>
      </aside>
      <main className="flex-1 min-w-0 h-full overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ExamRecordsSidebar;
