export interface Patient {
  patientId: number;
  name: string;
  birthDate: string; // YYMMDD
  gender: "남성" | "여성";
  phone: string; // 01012345678
  address: string;

  // 현재 기저질환
  diseases?: Disease[];
  // 과거 기저질환 (현재는 없지만 과거에 있었던 질환)
  pastDiseases?: Disease[];

  // 현재 복용 약
  medications?: Medication[];
  // 과거 복용 약 (현재는 없지만 과거에 있었던 약)
  pastMedications?: Medication[];

  // 현재 알레르기 여부
  allergyDescription?: string;
  // 과거 알레르기 여부
  pastAllergyDescription?: string;

  createdAt: string;
}

export type Disease = "고혈압" | "당뇨" | "심장병" | string;

export type Medication = "혈압약" | "당뇨약" | "심장약" | "아스피린" | string;

export const patients: Patient[] = [
  {
    patientId: 1,
    name: "김민수",
    birthDate: "900612",
    gender: "남성",
    phone: "01012345678",
    address: "서울특별시 광진구",
    diseases: ["고혈압"],
    medications: ["혈압약"],
    createdAt: "2026-03-02T09:12:00",
  },
  {
    patientId: 2,
    name: "이지은",
    birthDate: "950321",
    gender: "여성",
    phone: "01023456789",
    address: "서울특별시 송파구",
    diseases: ["당뇨"],
    medications: ["당뇨약"],
    allergyDescription: "페니실린 알레르기",
    createdAt: "2026-03-05T14:20:00",
  },
  {
    patientId: 3,
    name: "박서준",
    birthDate: "881102",
    gender: "남성",
    phone: "01034567890",
    address: "경기도 성남시",
    diseases: ["심장병"],
    medications: ["심장약", "아스피린"],
    createdAt: "2026-03-11T10:42:00",
  },
  {
    patientId: 4,
    name: "최유진",
    birthDate: "010715",
    gender: "여성",
    phone: "01045678901",
    address: "인천광역시 연수구",
    diseases: [],
    medications: [],
    createdAt: "2026-03-14T16:08:00",
  },
  {
    patientId: 5,
    name: "정현우",
    birthDate: "930108",
    gender: "남성",
    phone: "01056789012",
    address: "부산광역시 해운대구",
    diseases: ["고혈압", "당뇨"],
    medications: ["혈압약", "당뇨약"],
    allergyDescription: "진통제 복용 후 두드러기",
    createdAt: "2026-03-18T11:35:00",
  },
  {
    patientId: 6,
    name: "한소희",
    birthDate: "980917",
    gender: "여성",
    phone: "01067890123",
    address: "대전광역시 유성구",
    diseases: [],
    medications: [],
    createdAt: "2026-03-20T13:14:00",
  },
  {
    patientId: 7,
    name: "오지훈",
    birthDate: "871230",
    gender: "남성",
    phone: "01078901234",
    address: "광주광역시 북구",
    diseases: ["고지혈증"],
    medications: ["고지혈증 약"],
    createdAt: "2026-03-25T08:50:00",
  },
  {
    patientId: 8,
    name: "윤아린",
    birthDate: "000511",
    gender: "여성",
    phone: "01089012345",
    address: "울산광역시 남구",
    diseases: [],
    medications: [],
    allergyDescription: "조영제 알레르기",
    createdAt: "2026-03-27T15:27:00",
  },
  {
    patientId: 9,
    name: "서강민",
    birthDate: "910225",
    gender: "남성",
    phone: "01090123456",
    address: "서울특별시 강남구",
    diseases: ["당뇨"],
    medications: ["당뇨약"],
    createdAt: "2026-04-01T09:45:00",
  },
  {
    patientId: 10,
    name: "배수지",
    birthDate: "971019",
    gender: "여성",
    phone: "01011223344",
    address: "경기도 수원시",
    diseases: ["갑상선 질환"],
    medications: ["갑상선 약"],
    createdAt: "2026-04-03T17:11:00",
  },
  {
    patientId: 11,
    name: "임도윤",
    birthDate: "850803",
    gender: "남성",
    phone: "01022334455",
    address: "충청북도 청주시",
    diseases: ["심장병"],
    medications: ["심장약"],
    allergyDescription: "항생제 알레르기",
    createdAt: "2026-04-08T10:19:00",
  },
  {
    patientId: 12,
    name: "강채원",
    birthDate: "990414",
    gender: "여성",
    phone: "01033445566",
    address: "전라북도 전주시",
    diseases: [],
    medications: ["아스피린"],
    createdAt: "2026-04-12T12:31:00",
  },
  {
    patientId: 13,
    name: "조태양",
    birthDate: "920629",
    gender: "남성",
    phone: "01044556677",
    address: "강원도 춘천시",
    diseases: ["고혈압"],
    medications: ["혈압약"],
    createdAt: "2026-04-16T14:52:00",
  },
  {
    patientId: 14,
    name: "문가영",
    birthDate: "960127",
    gender: "여성",
    phone: "01055667788",
    address: "제주특별자치도 제주시",
    diseases: [],
    medications: [],
    allergyDescription: "마취약 부작용 경험",
    createdAt: "2026-04-19T11:06:00",
  },
  {
    patientId: 15,
    name: "신재호",
    birthDate: "890309",
    gender: "남성",
    phone: "01066778899",
    address: "경상북도 포항시",
    diseases: ["통풍"],
    medications: ["통풍 약"],
    createdAt: "2026-04-24T16:40:00",
  },
  {
    patientId: 16,
    name: "유나경",
    birthDate: "021201",
    gender: "여성",
    phone: "01077889900",
    address: "대구광역시 수성구",
    diseases: [],
    medications: [],
    createdAt: "2026-04-28T09:58:00",
  },
  {
    patientId: 17,
    name: "백승현",
    birthDate: "940707",
    gender: "남성",
    phone: "01088990011",
    address: "세종특별자치시",
    diseases: ["당뇨", "고혈압"],
    medications: ["당뇨약", "혈압약"],
    createdAt: "2026-05-01T13:47:00",
  },
  {
    patientId: 18,
    name: "송하린",
    birthDate: "981123",
    gender: "여성",
    phone: "01099001122",
    address: "경기도 고양시",
    diseases: [],
    medications: ["비타민D"],
    createdAt: "2026-05-04T15:33:00",
  },
  {
    patientId: 19,
    name: "노준혁",
    birthDate: "860918",
    gender: "남성",
    phone: "01013572468",
    address: "충청남도 천안시",
    diseases: ["천식"],
    medications: ["흡입기"],
    allergyDescription: "해산물 알레르기",
    createdAt: "2026-05-07T10:04:00",
  },
  {
    patientId: 20,
    name: "진서연",
    birthDate: "970213",
    gender: "여성",
    phone: "01024681357",
    address: "서울특별시 마포구",
    diseases: ["빈혈"],
    medications: ["철분제"],
    createdAt: "2026-05-10T18:22:00",
  },
];
