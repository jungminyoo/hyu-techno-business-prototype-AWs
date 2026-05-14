import { useState } from "react";
import useExamine from "../../stores/useExamine";
import { useNavigate } from "react-router";

const painTypeOptions = [
  "날카롭고, 찌르는 듯한 통증",
  "둔하고 욱신거리는 통증",
  "타는 듯한 통증",
  "지릿하고, 전기가 오는 듯한 통증",
  "기타",
  "모르겠음",
];

function Others() {
  const navigate = useNavigate();

  const completedExamine = useExamine((state) => state.completedExamine);

  const [selectedPainTypes, setSelectedPainTypes] = useState<string[]>([]);
  const [etcText, setEtcText] = useState("");
  const [painStartedAt, setPainStartedAt] = useState("");
  const [painScore, setPainScore] = useState(0);

  const togglePainType = (painType: string) => {
    setSelectedPainTypes((prev) => {
      if (prev.includes(painType)) {
        return prev.filter((type) => type !== painType);
      }

      return [...prev, painType];
    });
  };

  const handleSubmit = () => {
    if (!painStartedAt) return;

    const finalPainTypes = selectedPainTypes.map((type) => {
      if (type === "기타") {
        return etcText.trim() ? etcText.trim() : "기타";
      }

      return type;
    });

    const result = {
      painType: finalPainTypes,
      painStartedAt: new Date(painStartedAt),
      painScore,
    };

    completedExamine(result);
    navigate("/examine/complete");
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full justify-center px-4 py-6">
        <div className="w-full max-w-md rounded-3xl bg-white px-5 py-6 text-neutral-900 shadow-lg">
          <section>
            <h2 className="mb-1 text-base font-bold leading-snug">
              4. 통증의 종류를 선택해 주세요
            </h2>
            <p className="mb-4 text-xs text-neutral-500">
              해당되는 통증 양상을 모두 선택해 주세요.
            </p>

            <div className="flex flex-col gap-2">
              {painTypeOptions.map((option) => {
                const isSelected = selectedPainTypes.includes(option);
                const isEtc = option === "기타";

                return (
                  <div key={option} className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => togglePainType(option)}
                      className={`
                        flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5
                        text-left text-sm transition-all
                        ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-neutral-200 bg-neutral-50 text-neutral-700 active:bg-neutral-100"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex h-4 w-4 shrink-0 items-center justify-center rounded-md border
                          ${
                            isSelected
                              ? "border-blue-500 bg-blue-500"
                              : "border-neutral-300 bg-white"
                          }
                        `}
                      >
                        {isSelected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>

                      <span className="leading-snug">{option}</span>
                    </button>

                    {isEtc && isSelected && (
                      <input
                        type="text"
                        value={etcText}
                        onChange={(e) => setEtcText(e.target.value)}
                        placeholder="통증 양상을 입력해 주세요"
                        className="
                          ml-7 h-10 rounded-xl border border-neutral-200 bg-white px-3
                          text-sm outline-none transition placeholder:text-neutral-400
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                        "
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="mb-1 text-base font-bold leading-snug">
              5. 통증이 언제부터 시작되었나요?
            </h2>
            <p className="mb-3 text-xs text-neutral-500">
              통증이 처음 시작된 날짜를 선택해 주세요.
            </p>

            <input
              type="date"
              value={painStartedAt}
              onChange={(e) => setPainStartedAt(e.target.value)}
              className="
                h-11 w-3/4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4
                text-sm outline-none transition
                focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100
              "
            />
          </section>

          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="mb-1 text-base font-bold leading-snug">
                  6. 통증의 세기를 선택해 주세요
                </h2>
                <p className="text-xs text-neutral-500">
                  0은 통증 없음, 10은 가장 심한 통증입니다.
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-base font-bold text-white">
                {painScore}
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={painScore}
              onChange={(e) => setPainScore(Number(e.target.value))}
              className="w-full cursor-pointer accent-neutral-900"
            />

            <div className="mt-2 flex justify-between px-1 text-[11px] text-neutral-500">
              {Array.from({ length: 11 }, (_, index) => (
                <span key={index}>{index}</span>
              ))}
            </div>
          </section>

          <button
            type="button"
            disabled={!painStartedAt}
            onClick={handleSubmit}
            className="
              mt-8 w-full rounded-2xl bg-neutral-900 py-3.5 text-sm font-bold
              text-white transition-colors active:bg-neutral-700
              disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500
              cursor-pointer hover:bg-neutral-800
            "
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default Others;
