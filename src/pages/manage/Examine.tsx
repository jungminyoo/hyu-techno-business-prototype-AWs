import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { patients } from "../../datas/patientsData";

type DetailTab = "info";

function formatBirthDate(value: string) {
  if (value.length !== 6) {
    return value;
  }

  return `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4, 6)}`;
}

function Examine() {
  const { patientId } = useParams<{ patientId: string }>();
  const [activeTab, setActiveTab] = useState<DetailTab>("info");

  const patient = useMemo(() => {
    const id = Number(patientId);
    return patients.find((item) => item.patientId === id);
  }, [patientId]);

  if (!patient) {
    return (
      <section className=" border-rose-200 bg-rose-50 p-6 text-rose-700">
        환자를 찾을 수 없습니다.
      </section>
    );
  }

  return (
    <section className=" border-slate-200 bg-white p-6">
      <header className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">{patient.name}</h2>
        <span className="text-sm text-slate-500">ID #{patient.patientId}</span>
      </header>

      <div className="mb-5 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            activeTab === "info"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Info
        </button>
      </div>

      {activeTab === "info" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">생년월일</p>
            <p className="font-medium text-slate-900">{formatBirthDate(patient.birthDate)}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">성별</p>
            <p className="font-medium text-slate-900">{patient.gender}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">전화번호</p>
            <p className="font-medium text-slate-900">{patient.phone}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">주소</p>
            <p className="font-medium text-slate-900">{patient.address}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">기저질환</p>
            <p className="font-medium text-slate-900">
              {patient.diseases.length > 0 ? patient.diseases.join(", ") : "없음"}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-slate-500">복용약</p>
            <p className="font-medium text-slate-900">
              {patient.medications.length > 0
                ? patient.medications.join(", ")
                : "없음"}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 md:col-span-2">
            <p className="text-slate-500">알레르기</p>
            <p className="font-medium text-slate-900">
              {patient.hasAllergy
                ? patient.allergyDescription || "알레르기 있음"
                : "없음"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Examine;
