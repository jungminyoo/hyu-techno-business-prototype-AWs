import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import elbowImg from "../../assets/img/muscles_elbow.jpeg";
import useFakeDB from "../../stores/useFakeDB";

function formatDuration(startedAt: Date, createdAt: string) {
  const endDate = new Date(createdAt);
  if (Number.isNaN(startedAt.getTime()) || Number.isNaN(endDate.getTime())) {
    return "-";
  }

  const diffTime = endDate.getTime() - startedAt.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  return diffDays === 0 ? "당일" : `${diffDays}일`;
}

function Examine() {
  const examines = useFakeDB((state) => state.examines);
  const { examineId } = useParams<{ examineId?: string }>();

  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [pointPosition, setPointPosition] = useState({
    left: 0,
    top: 0,
  });

  const examine = useMemo(() => {
    if (!examineId) return null;
    const id = Number(examineId);
    return examines.find((item) => item.examineId === id);
  }, [examineId, examines]);

  useEffect(() => {
    if (!examine) return;

    const imageBox = imageBoxRef.current;
    const image = imageRef.current;

    if (!imageBox || !image) return;

    const updatePointPosition = () => {
      const boxRect = imageBox.getBoundingClientRect();

      const boxWidth = boxRect.width;
      const boxHeight = boxRect.height;

      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      if (!naturalWidth || !naturalHeight || !boxWidth || !boxHeight) return;

      const boxRatio = boxWidth / boxHeight;
      const imageRatio = naturalWidth / naturalHeight;

      // eslint-disable-next-line no-useless-assignment
      let renderedWidth = boxWidth;
      // eslint-disable-next-line no-useless-assignment
      let renderedHeight = boxHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > boxRatio) {
        renderedHeight = boxHeight;
        renderedWidth = boxHeight * imageRatio;
        offsetX = (boxWidth - renderedWidth) / 2;
      } else {
        renderedWidth = boxWidth;
        renderedHeight = boxWidth / imageRatio;
        offsetY = (boxHeight - renderedHeight) / 2;
      }

      setPointPosition({
        left: offsetX + examine.painPointX * renderedWidth,
        top: offsetY + examine.painPointY * renderedHeight,
      });
    };

    updatePointPosition();

    const resizeObserver = new ResizeObserver(updatePointPosition);
    resizeObserver.observe(imageBox);

    window.addEventListener("resize", updatePointPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePointPosition);
    };
  }, [examine]);

  if (examineId && !examine) {
    return (
      <section className="border-rose-200 bg-rose-50 p-6 text-rose-700">
        검사 기록을 찾을 수 없습니다.
      </section>
    );
  }

  return (
    <section className="bg-white p-6">
      {examine ? (
        <>
          <div
            ref={imageBoxRef}
            className="relative h-164 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
          >
            <img
              ref={imageRef}
              src={elbowImg}
              alt="팔꿈치 참고 이미지"
              onLoad={() => {
                const imageBox = imageBoxRef.current;
                const image = imageRef.current;

                if (!imageBox || !image) return;

                const boxRect = imageBox.getBoundingClientRect();

                const boxWidth = boxRect.width;
                const boxHeight = boxRect.height;

                const naturalWidth = image.naturalWidth;
                const naturalHeight = image.naturalHeight;

                const boxRatio = boxWidth / boxHeight;
                const imageRatio = naturalWidth / naturalHeight;

                // eslint-disable-next-line no-useless-assignment
                let renderedWidth = boxWidth;
                // eslint-disable-next-line no-useless-assignment
                let renderedHeight = boxHeight;
                let offsetX = 0;
                let offsetY = 0;

                if (imageRatio > boxRatio) {
                  renderedHeight = boxHeight;
                  renderedWidth = boxHeight * imageRatio;
                  offsetX = (boxWidth - renderedWidth) / 2;
                } else {
                  renderedWidth = boxWidth;
                  renderedHeight = boxWidth / imageRatio;
                  offsetY = (boxHeight - renderedHeight) / 2;
                }

                setPointPosition({
                  left: offsetX + examine.painPointX * renderedWidth,
                  top: offsetY + examine.painPointY * renderedHeight,
                });
              }}
              className="h-full w-full object-cover"
            />

            <div
              className="
                pointer-events-none absolute z-50
                h-4 w-4 -translate-x-1/2 -translate-y-1/2
                rounded-full bg-red-600 transition-all
              "
              style={{
                left: `${pointPosition.left}px`,
                top: `${pointPosition.top}px`,
              }}
            />
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              검사 상세 정보
            </h3>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500">통증 부위</p>
                <p className="font-medium text-slate-900">
                  {examine.painArea.join(", ")}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500">유발 동작</p>
                <p className="font-medium text-slate-900">
                  {examine.painMovement.join(", ")}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500">통증 유형</p>
                <p className="font-medium text-slate-900">
                  {examine.painType.join(", ")}
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-slate-500">지속 기간</p>
                <p className="font-medium text-slate-900">
                  {formatDuration(examine.painStartedAt, examine.createdAt)}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 md:col-span-4">
                <p className="text-slate-500 pb-5">통증 강도</p>
                <div className="w-full rounded-full bg-slate-200">
                  <div
                    className="flex h-4 items-center justify-center rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-white"
                    style={{ width: `${examine.painScore * 10}%` }}
                  >
                    {examine.painScore}/10
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-emerald-800">
                  진료 완료
                </p>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  {examine.isCompleted ? "완료" : "진행중"}
                </span>
              </div>
              <p className="mb-4 text-xs text-emerald-700/80">
                진료 기록을 완료 상태로 확정합니다.
              </p>
              <button
                type="button"
                className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                disabled={examine.isCompleted}
              >
                {examine.isCompleted ? "완료됨" : "완료 처리"}
              </button>
            </div>

            <div className="rounded-xl border border-blue-200 bg-linear-to-br from-blue-50 to-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-blue-800">
                  진료실 호출
                </p>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  빠른 호출
                </span>
              </div>
              <p className="mb-4 text-xs text-blue-700/80">
                현재 환자를 진료실로 즉시 호출합니다.
              </p>
              <button
                type="button"
                className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                호출하기
              </button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default Examine;
