type ExamineProgressProps = {
  currentStep: number;
};

const steps = ["기본 정보", "통증 위치", "세부 문진", "요약 확인"];

function ExamineProgress({ currentStep }: ExamineProgressProps) {
  return (
    <div className="mb-6 w-full">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-neutral-500">
        <span>
          {currentStep}/{steps.length}
        </span>
        <span>{steps[currentStep - 1]}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default ExamineProgress;
