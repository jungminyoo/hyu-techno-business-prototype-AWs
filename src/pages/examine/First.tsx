import { useState } from "react";
import { type Patient } from "../../datas/patientsData";
import { useNavigate } from "react-router";
import useFakeDB from "../../stores/useFakeDB";

type PatientForm = Pick<
  Patient,
  "name" | "birthDate" | "gender" | "phone" | "address"
>;

function First() {
  const addPatient = useFakeDB((state) => state.addPatient);
  const navigate = useNavigate();

  const [patientForm, setPatientForm] = useState<PatientForm>({
    name: "",
    birthDate: "",
    gender: "남성",
    phone: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setPatientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newPatient = addPatient({
      name: patientForm.name,
      birthDate: patientForm.birthDate,
      gender: patientForm.gender,
      phone: patientForm.phone,
      address: patientForm.address,
      diseases: [],
      pastDiseases: [],
      medications: [],
      pastMedications: [],
    });

    navigate(`/examine/first/${newPatient.patientId}/medical`);
  };

  const isDisabled =
    !patientForm.name.trim() ||
    !patientForm.birthDate.trim() ||
    !patientForm.phone.trim() ||
    !patientForm.address.trim();

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full justify-center px-4 py-6">
        <div className="flex w-full max-w-md flex-col justify-center rounded-3xl bg-white px-5 py-8 text-neutral-900 shadow-lg">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium text-blue-600">
              초진 문진 정보
            </p>

            <h1 className="text-lg font-bold leading-snug text-neutral-900">
              병원 접수와 처방을 위해
              <br />
              다음 정보를 입력해 주세요 ☺️
            </h1>

            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              입력하신 정보는 진료 목적으로만
              <br />
              안전하게 사용됩니다.
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
                  value={patientForm.name}
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
                  value={patientForm.birthDate}
                  onChange={handleChange}
                  placeholder="예: 990612"
                  className="
                    h-11 rounded-2xl border border-neutral-200 bg-white px-4
                    text-sm outline-none transition placeholder:text-neutral-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-neutral-800">성별</span>
                <select
                  name="gender"
                  value={patientForm.gender}
                  required
                  onChange={handleChange}
                  className="
                    h-11 rounded-2xl border border-neutral-200 bg-white px-4
                    text-sm outline-none transition
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                >
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-neutral-800">
                  전화번호
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  value={patientForm.phone}
                  onChange={handleChange}
                  placeholder="예: 01012345678"
                  className="
                    h-11 rounded-2xl border border-neutral-200 bg-white px-4
                    text-sm outline-none transition placeholder:text-neutral-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-neutral-800">주소</span>
                <textarea
                  name="address"
                  required
                  value={patientForm.address}
                  onChange={handleChange}
                  placeholder="주소를 입력해 주세요."
                  rows={3}
                  className="
                    resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3
                    text-sm outline-none transition placeholder:text-neutral-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                />
              </label>
            </div>

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

export default First;
