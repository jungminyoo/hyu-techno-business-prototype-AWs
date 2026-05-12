import { useMemo } from "react";
import { NavLink, useParams } from "react-router";
import { patients } from "../../datas/patientsData";
import { examines } from "../../datas/examinesData";
import PatientInfo from "./PatientInfo";
import type { Examine } from "../../datas/examinesData";

function ExamRecordsSidebar() {
  const { patientId } = useParams<{ patientId: string }>();

  const patient = useMemo(() => {
    const id = Number(patientId);
    return patients.find((item) => item.patientId === id);
  }, [patientId]);

  const patientExamines = useMemo(() => {
    const id = Number(patientId);
    return examines.filter((exam) => exam.patientId === id);
  }, [patientId]);

  if (!patient) {
    return (
      <aside className="w-56 h-full border-r border-slate-200 bg-white p-4 flex items-center justify-center">
        <p className="text-sm text-slate-500">환자 정보를 찾을 수 없습니다.</p>
      </aside>
    );
  }

  return (
    <aside className="relative w-56 h-full border-r border-slate-200 bg-white p-4 overflow-y-auto no-scrollbar">
      <PatientInfo patient={patient} />

      <div className="mt-4 border-t border-slate-200 pt-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">검사 기록</h3>
        <nav className="flex flex-col gap-1">
          {patientExamines.length > 0 ? (
            patientExamines.map((exam: Examine) => (
              <NavLink
                key={exam.examineId}
                to={`/manage/${patientId}/exam/${exam.examineId}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-xs font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {exam.painArea.join(", ")} - {exam.painScore}점
              </NavLink>
            ))
          ) : (
            <p className="text-xs text-slate-500">검사 기록이 없습니다.</p>
          )}
        </nav>
      </div>
    </aside>
  );
}

export default ExamRecordsSidebar;
