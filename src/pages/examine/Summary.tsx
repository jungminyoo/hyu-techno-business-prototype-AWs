import { useMemo } from "react";
import { useNavigate } from "react-router";
import useExamine from "../../stores/useExamine";
import useFakeDB from "../../stores/useFakeDB";
import ExamineProgress from "./ExamineProgress";

function formatDate(date: Date) {
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function Summary() {
  const navigate = useNavigate();
  const patients = useFakeDB((state) => state.patients);
  const addExamine = useFakeDB((state) => state.addExamine);
  const examine = useExamine();
  const completedExamine = useExamine((state) => state.completedExamine);

  const patient = useMemo(
    () => patients.find((item) => item.patientId === examine.patientId),
    [examine.patientId, patients],
  );

  const hasRequiredAnswers =
    examine.patientId > 0 &&
    examine.painArea.length > 0 &&
    examine.painMovement.length > 0 &&
    examine.painType.length > 0;

  const handleSubmit = () => {
    if (!hasRequiredAnswers) return;

    const newExamine = completedExamine();

    addExamine({
      patientId: newExamine.patientId,
      painArea: newExamine.painArea,
      painPointX: newExamine.painPointX,
      painPointY: newExamine.painPointY,
      painMovement: newExamine.painMovement,
      painMovementAngle: newExamine.painMovementAngle,
      painType: newExamine.painType,
      painStartedAt: newExamine.painStartedAt,
      painScore: newExamine.painScore,
      isCompleted: newExamine.isCompleted,
    });

    navigate("/examine/complete");
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex min-h-full w-full justify-center px-4 py-3 md:px-6">
        <div className="w-full max-w-md rounded-3xl bg-white px-5 py-4 text-neutral-900 shadow-lg md:max-w-3xl md:px-6">
          <ExamineProgress currentStep={4} />

          <div className="mb-3 text-center">
            <p className="mb-2 text-xs font-medium text-blue-600">
              제출 전 확인
            </p>
            <h1 className="text-lg font-bold leading-snug text-neutral-900">
              입력한 문진 내용을
              <br />
              확인해 주세요.
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <section className="rounded-2xl bg-neutral-50 p-3">
              <p className="text-xs font-semibold text-neutral-500">환자</p>
              <p className="mt-1 text-sm font-bold text-neutral-900">
                {patient
                  ? `${patient.name} (${patient.birthDate}, ${patient.gender})`
                  : "환자 정보 없음"}
              </p>
            </section>

            <section className="rounded-2xl bg-neutral-50 p-3">
              <p className="text-xs font-semibold text-neutral-500">
                통증 위치
              </p>
              <p className="mt-1 text-sm font-bold text-neutral-900">
                {examine.painArea.join(", ") || "-"}
              </p>
            </section>

            <section className="rounded-2xl bg-neutral-50 p-3 md:col-span-2">
              <p className="text-xs font-semibold text-neutral-500">
                유발 움직임
              </p>
              <p className="mt-1 text-sm font-bold text-neutral-900">
                {examine.painMovement.join(", ") || "-"}
              </p>
              {examine.painMovementAngle !== undefined && (
                <p className="mt-2 text-xs font-semibold text-blue-600">
                  통증 발생 각도 {examine.painMovementAngle}°
                </p>
              )}
            </section>

            <section className="rounded-2xl bg-neutral-50 p-3 md:col-span-2">
              <p className="text-xs font-semibold text-neutral-500">
                통증 양상
              </p>
              <p className="mt-1 text-sm font-bold text-neutral-900">
                {examine.painType.join(", ") || "-"}
              </p>
            </section>

            <div className="grid grid-cols-2 gap-3 md:col-span-2">
              <section className="rounded-2xl bg-neutral-50 p-3">
                <p className="text-xs font-semibold text-neutral-500">
                  시작일
                </p>
                <p className="mt-1 text-sm font-bold text-neutral-900">
                  {formatDate(examine.painStartedAt)}
                </p>
              </section>

              <section className="rounded-2xl bg-neutral-900 p-3 text-white">
                <p className="text-xs font-semibold text-neutral-300">
                  통증 점수
                </p>
                <p className="mt-1 text-lg font-bold">{examine.painScore}/10</p>
              </section>
            </div>
          </div>

          {!hasRequiredAnswers && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium leading-relaxed text-red-600">
              문진 내용이 부족합니다. 이전 단계로 돌아가 다시 입력해 주세요.
            </p>
          )}

          <button
            type="button"
            disabled={!hasRequiredAnswers}
            onClick={handleSubmit}
            className="
              mt-3 w-full rounded-2xl bg-neutral-900 py-3 text-sm font-bold
              text-white transition-colors active:bg-neutral-700
              disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500
            "
          >
            제출하기
          </button>

          <button
            type="button"
            onClick={() => navigate("/examine/others")}
            className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white py-2.5 text-sm font-bold text-neutral-700 transition-colors active:bg-neutral-100"
          >
            이전
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
