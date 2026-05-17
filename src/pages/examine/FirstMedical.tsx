import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { type Disease, type Medication } from "../../datas/patientsData";
import useExamine from "../../stores/useExamine";
import useFakeDB from "../../stores/useFakeDB";

const diseaseOptions: Disease[] = ["고혈압", "당뇨", "심장병", "기타"];
const medicationOptions: Medication[] = [
  "혈압약",
  "당뇨약",
  "심장약",
  "아스피린",
  "기타",
];

type FirstMedicalForm = {
  diseases: Disease[];
  diseaseEtcText: string;
  medications: Medication[];
  medicationEtcText: string;
  hasAllergy: "예" | "아니요" | "";
  allergyDescription: string;
};

function FirstMedical() {
  const patients = useFakeDB((state) => state.patients);
  const updatePatient = useFakeDB((state) => state.updatePatient);

  const setPatientId = useExamine((state) => state.setPatientId);
  const navigate = useNavigate();
  const { patientId } = useParams();

  const [medicalForm, setMedicalForm] = useState<FirstMedicalForm>({
    diseases: [],
    diseaseEtcText: "",
    medications: [],
    medicationEtcText: "",
    hasAllergy: "",
    allergyDescription: "",
  });

  const toggleDisease = (disease: Disease) => {
    setMedicalForm((prev) => {
      const isSelected = prev.diseases.includes(disease);

      return {
        ...prev,
        diseases: isSelected
          ? prev.diseases.filter((item) => item !== disease)
          : [...prev.diseases, disease],
      };
    });
  };

  const toggleMedication = (medication: Medication) => {
    setMedicalForm((prev) => {
      const isSelected = prev.medications.includes(medication);

      return {
        ...prev,
        medications: isSelected
          ? prev.medications.filter((item) => item !== medication)
          : [...prev.medications, medication],
      };
    });
  };

  const handleAllergyChange = (value: "예" | "아니요") => {
    setMedicalForm((prev) => ({
      ...prev,
      hasAllergy: value,
      allergyDescription: value === "아니요" ? "" : prev.allergyDescription,
    }));
  };

  const handleSubmit = () => {
    if (!patientId) return;

    const targetPatient = patients.find(
      (patient) => patient.patientId === Number(patientId),
    );

    if (!targetPatient) return;

    const finalDiseases = medicalForm.diseases.map((disease) => {
      if (disease === "기타") {
        return medicalForm.diseaseEtcText.trim()
          ? medicalForm.diseaseEtcText.trim()
          : "기타";
      }

      return disease;
    });

    const finalMedications = medicalForm.medications.map((medication) => {
      if (medication === "기타") {
        return medicalForm.medicationEtcText.trim()
          ? medicalForm.medicationEtcText.trim()
          : "기타";
      }

      return medication;
    });

    updatePatient(targetPatient.patientId, {
      diseases: finalDiseases,
      medications: finalMedications,
      allergyDescription:
        medicalForm.hasAllergy === "예"
          ? medicalForm.allergyDescription.trim()
          : undefined,
    });

    setPatientId(Number(patientId));
    navigate("/examine/area");
  };

  const isDisabled =
    medicalForm.hasAllergy === "" ||
    (medicalForm.hasAllergy === "예" && !medicalForm.allergyDescription.trim());

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex min-h-full w-full justify-center px-4 py-6">
        <div className="flex w-full max-w-md flex-col justify-center rounded-3xl bg-white px-5 py-8 text-neutral-900 shadow-lg">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium text-blue-600">
              초진 추가 문진
            </p>

            <h1 className="text-lg font-bold leading-snug text-neutral-900">
              현재 건강 상태를
              <br />
              간단히 확인하겠습니다.
            </h1>

            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              기저질환, 복용약, 알레르기 정보를
              <br />
              선택해 주세요.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-5 shadow-sm">
            <section>
              <h2 className="mb-1 text-base font-bold leading-snug">
                1. 혈압이나 당뇨가 있으십니까?
              </h2>
              <p className="mb-4 text-xs text-neutral-500">
                해당되는 질환을 모두 선택해 주세요.
              </p>

              <div className="grid grid-cols-2 gap-2">
                {diseaseOptions.map((disease) => {
                  const isSelected = medicalForm.diseases.includes(disease);

                  return (
                    <button
                      key={disease}
                      type="button"
                      onClick={() => toggleDisease(disease)}
                      className={`
                        flex items-center gap-3 rounded-2xl border px-3 py-2.5
                        text-left text-sm transition-all
                        ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-neutral-200 bg-white text-neutral-700 active:bg-neutral-100"
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

                      <span>{disease}</span>
                    </button>
                  );
                })}
              </div>

              {medicalForm.diseases.includes("기타") && (
                <input
                  type="text"
                  value={medicalForm.diseaseEtcText}
                  onChange={(e) =>
                    setMedicalForm((prev) => ({
                      ...prev,
                      diseaseEtcText: e.target.value,
                    }))
                  }
                  placeholder="질환명을 입력해 주세요"
                  className="
                    mt-3 h-10 w-full rounded-xl border border-neutral-200 bg-white px-3
                    text-sm outline-none transition placeholder:text-neutral-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                />
              )}
            </section>

            <section className="mt-8">
              <h2 className="mb-1 text-base font-bold leading-snug">
                2. 현재 복용중인 약에 체크해 주세요.
              </h2>
              <p className="mb-4 text-xs text-neutral-500">
                해당되는 약을 모두 선택해 주세요.
              </p>

              <div className="grid grid-cols-2 gap-2">
                {medicationOptions.map((medication) => {
                  const isSelected =
                    medicalForm.medications.includes(medication);

                  return (
                    <button
                      key={medication}
                      type="button"
                      onClick={() => toggleMedication(medication)}
                      className={`
                        flex items-center gap-3 rounded-2xl border px-3 py-2.5
                        text-left text-sm transition-all
                        ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-neutral-200 bg-white text-neutral-700 active:bg-neutral-100"
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

                      <span>{medication}</span>
                    </button>
                  );
                })}
              </div>

              {medicalForm.medications.includes("기타") && (
                <input
                  type="text"
                  value={medicalForm.medicationEtcText}
                  onChange={(e) =>
                    setMedicalForm((prev) => ({
                      ...prev,
                      medicationEtcText: e.target.value,
                    }))
                  }
                  placeholder="복용중인 약을 입력해 주세요"
                  className="
                    mt-3 h-10 w-full rounded-xl border border-neutral-200 bg-white px-3
                    text-sm outline-none transition placeholder:text-neutral-400
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  "
                />
              )}
            </section>

            <section className="mt-8">
              <h2 className="mb-1 text-base font-bold leading-snug">
                3. 주사, 약물 알레르기 등 부작용을 경험한 적이 있으십니까?
              </h2>
              <p className="mb-4 text-xs text-neutral-500">
                해당 여부를 선택해 주세요.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleAllergyChange("예")}
                  className={`
                    flex items-center gap-3 rounded-2xl border px-3 py-2.5
                    text-left text-sm transition-all
                    ${
                      medicalForm.hasAllergy === "예"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-neutral-200 bg-white text-neutral-700 active:bg-neutral-100"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center rounded-md border
                      ${
                        medicalForm.hasAllergy === "예"
                          ? "border-blue-500 bg-blue-500"
                          : "border-neutral-300 bg-white"
                      }
                    `}
                  >
                    {medicalForm.hasAllergy === "예" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span>예</span>
                </button>

                {medicalForm.hasAllergy === "예" && (
                  <input
                    type="text"
                    value={medicalForm.allergyDescription}
                    onChange={(e) =>
                      setMedicalForm((prev) => ({
                        ...prev,
                        allergyDescription: e.target.value,
                      }))
                    }
                    placeholder="부작용 내용을 입력해 주세요"
                    className="
                      ml-7 h-10 rounded-xl border border-neutral-200 bg-white px-3
                      text-sm outline-none transition placeholder:text-neutral-400
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                    "
                  />
                )}

                <button
                  type="button"
                  onClick={() => handleAllergyChange("아니요")}
                  className={`
                    flex items-center gap-3 rounded-2xl border px-3 py-2.5
                    text-left text-sm transition-all
                    ${
                      medicalForm.hasAllergy === "아니요"
                        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-neutral-200 bg-white text-neutral-700 active:bg-neutral-100"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center rounded-md border
                      ${
                        medicalForm.hasAllergy === "아니요"
                          ? "border-blue-500 bg-blue-500"
                          : "border-neutral-300 bg-white"
                      }
                    `}
                  >
                    {medicalForm.hasAllergy === "아니요" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span>아니요</span>
                </button>
              </div>
            </section>

            <button
              type="button"
              disabled={isDisabled}
              onClick={handleSubmit}
              className="
                mt-8 w-full rounded-2xl bg-neutral-900 py-3.5 text-sm font-bold
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

export default FirstMedical;
