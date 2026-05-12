import { useMemo } from "react";
import { useParams } from "react-router";
import { examines } from "../../datas/examinesData";

function Examine() {
  const { examineId } = useParams<{ examineId?: string }>();

  const examine = useMemo(() => {
    if (!examineId) return null;
    const id = Number(examineId);
    return examines.find((item) => item.examineId === id);
  }, [examineId]);

  if (examineId && !examine) {
    return (
      <section className="border-rose-200 bg-rose-50 p-6 text-rose-700">
        검사 기록을 찾을 수 없습니다.
      </section>
    );
  }

  return (
    <section className="border-slate-200 bg-white p-6">

      {examine ? (
        <div className="mt-6 border-t border-slate-200 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">검사 상세 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">통증 부위</p>
              <p className="font-medium text-slate-900">{examine.painArea.join(", ")}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">통증 점수</p>
              <p className="font-medium text-slate-900">{examine.painScore}/10</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">통증 움직임</p>
              <p className="font-medium text-slate-900">{examine.painMovement.join(", ")}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-slate-500">통증 종류</p>
              <p className="font-medium text-slate-900">{examine.painType.join(", ")}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 md:col-span-2">
              <p className="text-slate-500">진료 상태</p>
              <p className="font-medium text-slate-900">
                {examine.isCompleted ? "✓ 완료" : "진행 중"}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Examine;
