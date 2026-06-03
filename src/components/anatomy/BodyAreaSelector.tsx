import { useState } from "react";
import Anatomy from "./Anatomy";
import type { PainArea } from "../../datas/examinesData";
import useExamine from "../../stores/useExamine";

const bodyAreas: Array<{
  area: PainArea;
  label: string;
  description: string;
  enabled: boolean;
}> = [
  { area: "목", label: "목", description: "목 주변 통증", enabled: false },
  { area: "어깨", label: "어깨", description: "어깨 관절 통증", enabled: false },
  { area: "등", label: "등", description: "등과 견갑 주변", enabled: false },
  { area: "허리", label: "허리", description: "허리와 골반 주변", enabled: false },
  { area: "팔꿈치", label: "팔", description: "이번 데모 시연 부위", enabled: true },
  { area: "손목", label: "손목", description: "손목과 손 주변", enabled: false },
  { area: "무릎", label: "무릎", description: "무릎 관절 주변", enabled: false },
  { area: "발목", label: "발목", description: "발목과 발 주변", enabled: false },
];

function BodyAreaSelector() {
  const currentPainArea = useExamine((state) => state.currentPainArea);
  const selectedArea = useExamine((state) => state.selectedArea);
  const [pendingArea, setPendingArea] = useState<PainArea | null>(
    currentPainArea,
  );

  return (
    <section className="h-full w-full rounded-3xl border border-neutral-200 bg-white p-2 shadow-lg md:p-3 lg:p-4">
      <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        <div className="min-h-0 overflow-hidden rounded-3xl bg-neutral-950">
          <Anatomy selectedArea={pendingArea} onAreaSelect={setPendingArea} />
        </div>

        <aside className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-2 rounded-3xl bg-neutral-50 p-3 lg:p-4">
          <div>
            <p className="text-[11px] font-semibold text-blue-600">
              전신 대분류 선택
            </p>
            <h3 className="mt-1 text-base font-bold leading-snug text-neutral-900 lg:text-lg">
              먼저 통증이 있는 큰 부위를 선택합니다.
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 lg:text-sm">
              이번 프로토타입에서는 팔 문진 흐름을 시연합니다.
            </p>
          </div>

          <div className="grid min-h-0 grid-cols-2 gap-1.5 overflow-hidden lg:grid-cols-1">
            {bodyAreas.map((item) => {
              const isSelected = pendingArea === item.area;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPendingArea(item.area)}
                  className={`
                    min-h-0 rounded-xl border px-2.5 py-1 text-left transition active:scale-[0.98] lg:px-2.5 lg:py-1
                    ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                        : item.enabled
                          ? "border-blue-200 bg-white text-blue-700 hover:border-blue-400"
                          : "border-neutral-200 bg-white/80 text-neutral-600 hover:border-blue-200 hover:bg-white"
                    }
                  `}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-xs font-bold">
                      {item.label}
                    </span>
                    <span
                      className={`
                        shrink-0
                        rounded-full px-1.5 py-0.5 text-[9px] font-bold
                        ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : item.enabled
                              ? "bg-blue-50 text-blue-700"
                              : "bg-neutral-100 text-neutral-500"
                        }
                      `}
                    >
                      {isSelected ? "선택됨" : item.enabled ? "시연 가능" : "준비중"}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] leading-none">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!pendingArea}
            onClick={() => {
              if (!pendingArea) return;

              selectedArea(pendingArea);
            }}
            className="
              w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white
              transition-colors hover:bg-blue-500
              disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500
            "
          >
            선택한 부위 확인
          </button>
        </aside>
      </div>
    </section>
  );
}

export default BodyAreaSelector;
