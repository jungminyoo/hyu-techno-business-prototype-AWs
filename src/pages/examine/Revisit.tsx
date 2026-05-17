import { useState } from "react";
import { useNavigate } from "react-router";
import useExamine from "../../stores/useExamine";
import useFakeDB from "../../stores/useFakeDB";

type RevisitForm = {
  name: string;
  birthDate: string;
};

function Revisit() {
  const patients = useFakeDB((state) => state.patients);
  const setPatientId = useExamine((state) => state.setPatientId);
  const navigate = useNavigate();

  const [revisitForm, setRevisitForm] = useState<RevisitForm>({
    name: "",
    birthDate: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRevisitForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = () => {
    const name = revisitForm.name.trim();
    const birthDate = revisitForm.birthDate.trim();

    const foundPatient = patients.find(
      (patient) => patient.name === name && patient.birthDate === birthDate,
    );

    if (!foundPatient) {
      setErrorMessage("입력하신 정보와 일치하는 환자 정보를 찾을 수 없습니다.");
      return;
    }

    setPatientId(foundPatient.patientId);
    navigate(`/examine/area`);
  };

  const isDisabled = !revisitForm.name.trim() || !revisitForm.birthDate.trim();

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full justify-center px-4 py-6">
        <div className="flex w-full max-w-md flex-col justify-center rounded-3xl bg-white px-5 py-8 text-neutral-900 shadow-lg">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium text-blue-600">
              재진 문진 정보
            </p>

            <h1 className="text-lg font-bold leading-snug text-neutral-900">
              오늘도 저희 병원을
              <br />
              찾아주셔서 감사합니다.
            </h1>

            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              환자 확인을 위해
              <br />
              이름과 생년월일을 입력해 주세요 ☺️
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-5 shadow-sm">
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-neutral-800">이름</span>
                <input
                  name="name"
                  type="text"
                  required
                  value={revisitForm.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해 주세요."
                  className="
                    h-11 rounded-2xl border border-neutral-200 bg-white px-4
                    text-sm outline-none transition placeholder:text-neutral-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-neutral-800">
                  생년월일
                </span>
                <input
                  name="birthDate"
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={revisitForm.birthDate}
                  onChange={handleChange}
                  placeholder="예: 990612"
                  className="
                    h-11 rounded-2xl border border-neutral-200 bg-white px-4
                    text-sm outline-none transition placeholder:text-neutral-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                />
              </label>
            </div>

            {errorMessage && (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium leading-relaxed text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              disabled={isDisabled}
              onClick={handleSubmit}
              className="
                mt-7 w-full rounded-2xl bg-neutral-900 py-3.5 text-sm font-bold
                text-white transition-colors active:bg-neutral-700 cursor-pointer
                disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500
              "
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revisit;
