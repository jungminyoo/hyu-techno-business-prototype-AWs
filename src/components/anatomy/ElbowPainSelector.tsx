import { useEffect, useMemo, useState } from "react";
import elbowImg from "../../assets/img/muscles_elbow.jpeg";
import useExamine from "../../stores/useExamine";

const elbowZones = [
  {
    id: "outer",
    label: "바깥쪽",
    description: "테니스엘보가 자주 느껴지는 부위",
    x: 66,
    y: 43,
  },
  {
    id: "inner",
    label: "안쪽",
    description: "굽힘 동작에서 불편한 부위",
    x: 38,
    y: 43,
  },
  {
    id: "back",
    label: "뒤쪽",
    description: "펴거나 기대면 아픈 부위",
    x: 52,
    y: 31,
  },
  {
    id: "front",
    label: "앞쪽",
    description: "접히는 면 주변의 불편감",
    x: 51,
    y: 61,
  },
];

function ElbowPainSelector() {
  const phase = useExamine((state) => state.phase);
  const currentPainPointX = useExamine((state) => state.currentPainPointX);
  const currentPainPointY = useExamine((state) => state.currentPainPointY);
  const selectedArea = useExamine((state) => state.selectedArea);
  const completedAnimationToPoint = useExamine(
    (state) => state.completedAnimationToPoint,
  );
  const selectedCurrentPainPoint = useExamine(
    (state) => state.selectedCurrentPainPoint,
  );

  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const selectedZone = useMemo(
    () => elbowZones.find((zone) => zone.id === selectedZoneId),
    [selectedZoneId],
  );

  useEffect(() => {
    if (phase !== "areaToPoint") return;

    const timer = window.setTimeout(() => {
      completedAnimationToPoint();
    }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [completedAnimationToPoint, phase]);

  const handleZoneSelect = (zone: (typeof elbowZones)[number]) => {
    setSelectedZoneId(zone.id);
    selectedArea("팔꿈치");
    selectedCurrentPainPoint(zone.x / 100, zone.y / 100);
  };

  const handlePrecisePoint = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (phase !== "point") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    selectedCurrentPainPoint(x, y);
  };

  const markerVisible =
    currentPainPointX >= 0 && currentPainPointY >= 0 && phase !== "area";

  return (
    <section className="h-full w-full rounded-3xl border border-neutral-200 bg-white p-2 shadow-lg md:p-3 lg:p-4">
      <div className="mb-2 flex items-center justify-between gap-3 px-1 lg:px-2">
        <div>
          <p className="text-[11px] font-semibold text-blue-600">
            팔꿈치 전용 선택
          </p>
          <h3 className="mt-0.5 text-sm font-bold text-neutral-900 md:text-base">
            아픈 위치를 화면에서 직접 선택해 주세요.
          </h3>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">
          데모 모드
        </span>
      </div>

      <div className="grid h-[calc(100%-2.5rem)] min-h-0 gap-3 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] lg:items-stretch">
      <button
        type="button"
        onClick={handlePrecisePoint}
        className={`
          relative block h-full min-h-0 w-full overflow-hidden rounded-3xl
          border border-neutral-200 bg-neutral-950 text-left shadow-inner
          ${phase === "point" ? "cursor-crosshair" : "cursor-default"}
        `}
      >
        <img
          src={elbowImg}
          alt="팔꿈치 통증 위치 선택 이미지"
          className="
            h-full w-full object-cover opacity-95
            transition duration-700
          "
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_0%,transparent_46%,rgba(0,0,0,0.34)_100%)]" />

        {phase === "area" &&
          elbowZones.map((zone) => (
            <span
              key={zone.id}
              className="
                pointer-events-none absolute z-20 h-5 w-5
                -translate-x-1/2 -translate-y-1/2 rounded-full
                border-2 border-white bg-blue-500 shadow-[0_0_0_10px_rgba(37,99,235,0.18)]
              "
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            >
              <span className="absolute inset-0 rounded-full bg-blue-400 opacity-70 animate-ping" />
            </span>
          ))}

        {phase === "areaToPoint" && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-neutral-950/35 backdrop-blur-[2px]">
            <div className="rounded-2xl bg-white/95 px-4 py-3 text-center shadow-xl">
              <p className="text-xs font-semibold text-blue-600">
                팔꿈치 확대 중
              </p>
              <p className="mt-1 text-sm font-bold text-neutral-900">
                정확한 지점을 찍어 주세요.
              </p>
            </div>
          </div>
        )}

        {phase === "point" && (
          <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 rounded-2xl bg-white/92 px-4 py-3 shadow-lg">
            <p className="text-xs font-semibold text-blue-600">
              세부 위치 선택
            </p>
            <p className="mt-1 text-sm font-bold leading-snug text-neutral-900">
              가장 아픈 지점을 한 번 더 눌러 보정해 주세요.
            </p>
          </div>
        )}

        {markerVisible && (
          <span
            className="
              pointer-events-none absolute z-40 h-8 w-8
              -translate-x-1/2 -translate-y-1/2 rounded-full
              border-4 border-white bg-red-500 shadow-[0_0_0_8px_rgba(239,68,68,0.24)]
              transition-all duration-300
            "
            style={{
              left: `${currentPainPointX * 100}%`,
              top: `${currentPainPointY * 100}%`,
            }}
          >
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </span>
        )}
      </button>

      <div className="flex min-h-0 flex-col">
      {phase === "area" && (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-2">
          {elbowZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => handleZoneSelect(zone)}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-left transition active:scale-[0.98] active:bg-blue-50 lg:py-3"
            >
              <span className="block text-sm font-bold text-neutral-900">
                {zone.label}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-neutral-500">
                {zone.description}
              </span>
            </button>
          ))}
        </div>
      )}

      {phase !== "area" && (
        <div className="rounded-2xl bg-neutral-50 px-4 py-3 lg:flex-1 lg:p-4">
          <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start">
            <div>
              <p className="text-[11px] font-semibold text-neutral-500">
                선택 부위
              </p>
              <p className="mt-1 text-sm font-bold text-neutral-900">
                팔꿈치{selectedZone ? ` · ${selectedZone.label}` : ""}
              </p>
            </div>
            <div className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600">
              통증 지점 표시
            </div>
          </div>
          <div className="mt-4 hidden rounded-2xl border border-neutral-200 bg-white p-3 lg:block">
            <p className="text-xs font-semibold text-neutral-500">
              데모 안내
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              선택한 빨간 마커가 진료 화면과 문진 요약에 그대로 전달됩니다.
            </p>
          </div>
        </div>
      )}
      </div>
      </div>
    </section>
  );
}

export default ElbowPainSelector;
