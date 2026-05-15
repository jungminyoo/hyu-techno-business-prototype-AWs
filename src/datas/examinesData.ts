export interface Examine {
  examineId: number;

  // 어떤 환자의 문진인지
  patientId: number;

  // 통증 부위
  painArea: PainArea[];

  // 통증 위치 (정규화 된 사진 상에서의 좌표, 각각 0.0 ~ 1.0 사이 값)
  painPointX: number;
  painPointY: number;

  // 통증이 유발되는 움직임
  painMovement: PainMovement[];

  // 통증 종류
  painType: PainType[];

  // 증상 시작 시점
  painStartedAt: Date;

  // 통증 정도 (1~10)
  painScore: number;

  // 진료 완료 여부
  isCompleted: boolean;

  createdAt: string;
}

export type PainArea =
  | "목"
  | "어깨"
  | "등"
  | "허리"
  | "무릎"
  | "발목"
  | "손목"
  | "팔꿈치";

export type PainMovement =
  | "굽히기(굴곡)"
  | "펴기(신전)"
  | "밀기"
  | "당기기"
  | "손목 바깥쪽으로 돌리기(회외)"
  | "손목 안쪽으로 돌리기(회내)"
  | "해당 부위를 누를 시 통증"
  | "정지 시에도 통증";

export type PainType =
  | "날카롭고, 찌르는 듯한 통증"
  | "둔하고 욱신거리는 통증"
  | "타는 듯한 통증"
  | "지릿하고, 전기가 오는 듯한 통증"
  | "모르겠음"
  | string;

export const examines: Examine[] = [
  {
    examineId: 1,
    patientId: 1,
    painArea: ["허리"],
    painPointX: 0.48,
    painPointY: 0.72,
    painMovement: ["굽히기(굴곡)", "정지 시에도 통증"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-04-29"),
    painScore: 7,
    isCompleted: true,
    createdAt: "2026-05-01T09:12:00",
  },
  {
    examineId: 2,
    patientId: 2,
    painArea: ["손목"],
    painPointX: 0.73,
    painPointY: 0.41,
    painMovement: ["손목 안쪽으로 돌리기(회내)"],
    painType: ["지릿하고, 전기가 오는 듯한 통증"],
    painStartedAt: new Date("2026-05-01"),
    painScore: 5,
    isCompleted: true,
    createdAt: "2026-05-02T11:30:00",
  },
  {
    examineId: 3,
    patientId: 3,
    painArea: ["무릎"],
    painPointX: 0.51,
    painPointY: 0.84,
    painMovement: ["굽히기(굴곡)", "해당 부위를 누를 시 통증"],
    painType: ["날카롭고, 찌르는 듯한 통증"],
    painStartedAt: new Date("2026-05-01"),
    painScore: 8,
    isCompleted: true,
    createdAt: "2026-05-03T14:00:00",
  },
  {
    examineId: 4,
    patientId: 4,
    painArea: ["목", "어깨"],
    painPointX: 0.42,
    painPointY: 0.18,
    painMovement: ["밀기"],
    painType: ["타는 듯한 통증"],
    painStartedAt: new Date("2026-05-02"),
    painScore: 4,
    isCompleted: true,
    createdAt: "2026-05-03T17:15:00",
  },
  {
    examineId: 5,
    patientId: 5,
    painArea: ["발목"],
    painPointX: 0.39,
    painPointY: 0.94,
    painMovement: ["당기기"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-05-03"),
    painScore: 6,
    isCompleted: true,
    createdAt: "2026-05-04T08:40:00",
  },
  {
    examineId: 6,
    patientId: 6,
    painArea: ["등"],
    painPointX: 0.52,
    painPointY: 0.44,
    painMovement: ["펴기(신전)"],
    painType: ["모르겠음"],
    painStartedAt: new Date("2026-05-02"),
    painScore: 3,
    isCompleted: false,
    createdAt: "2026-05-04T12:00:00",
  },
  {
    examineId: 7,
    patientId: 7,
    painArea: ["팔꿈치"],
    painPointX: 0.68,
    painPointY: 0.37,
    painMovement: ["밀기", "당기기"],
    painType: ["날카롭고, 찌르는 듯한 통증"],
    painStartedAt: new Date("2026-05-01"),
    painScore: 6,
    isCompleted: true,
    createdAt: "2026-05-05T10:22:00",
  },
  {
    examineId: 8,
    patientId: 8,
    painArea: ["손목"],
    painPointX: 0.27,
    painPointY: 0.43,
    painMovement: ["손목 바깥쪽으로 돌리기(회외)"],
    painType: ["지릿하고, 전기가 오는 듯한 통증"],
    painStartedAt: new Date("2026-05-04"),
    painScore: 7,
    isCompleted: true,
    createdAt: "2026-05-05T16:20:00",
  },
  {
    examineId: 9,
    patientId: 9,
    painArea: ["허리"],
    painPointX: 0.49,
    painPointY: 0.69,
    painMovement: ["굽히기(굴곡)"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-05-04"),
    painScore: 5,
    isCompleted: true,
    createdAt: "2026-05-06T09:10:00",
  },
  {
    examineId: 10,
    patientId: 10,
    painArea: ["목"],
    painPointX: 0.47,
    painPointY: 0.13,
    painMovement: ["정지 시에도 통증"],
    painType: ["타는 듯한 통증"],
    painStartedAt: new Date("2026-05-05"),
    painScore: 8,
    isCompleted: true,
    createdAt: "2026-05-06T13:55:00",
  },

  {
    examineId: 11,
    patientId: 11,
    painArea: ["어깨"],
    painPointX: 0.35,
    painPointY: 0.22,
    painMovement: ["밀기"],
    painType: ["날카롭고, 찌르는 듯한 통증"],
    painStartedAt: new Date("2026-05-06"),
    painScore: 6,
    isCompleted: true,
    createdAt: "2026-05-07T11:00:00",
  },
  {
    examineId: 12,
    patientId: 12,
    painArea: ["무릎"],
    painPointX: 0.58,
    painPointY: 0.83,
    painMovement: ["굽히기(굴곡)"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-05-05"),
    painScore: 4,
    isCompleted: false,
    createdAt: "2026-05-07T18:00:00",
  },
  {
    examineId: 13,
    patientId: 13,
    painArea: ["발목"],
    painPointX: 0.61,
    painPointY: 0.95,
    painMovement: ["당기기"],
    painType: ["타는 듯한 통증"],
    painStartedAt: new Date("2026-05-06"),
    painScore: 5,
    isCompleted: true,
    createdAt: "2026-05-08T09:40:00",
  },
  {
    examineId: 14,
    patientId: 14,
    painArea: ["등"],
    painPointX: 0.51,
    painPointY: 0.39,
    painMovement: ["펴기(신전)"],
    painType: ["모르겠음"],
    painStartedAt: new Date("2026-05-07"),
    painScore: 2,
    isCompleted: true,
    createdAt: "2026-05-08T15:10:00",
  },
  {
    examineId: 15,
    patientId: 15,
    painArea: ["손목"],
    painPointX: 0.75,
    painPointY: 0.46,
    painMovement: ["손목 안쪽으로 돌리기(회내)"],
    painType: ["지릿하고, 전기가 오는 듯한 통증"],
    painStartedAt: new Date("2026-05-06"),
    painScore: 9,
    isCompleted: true,
    createdAt: "2026-05-09T12:22:00",
  },
  {
    examineId: 16,
    patientId: 16,
    painArea: ["팔꿈치"],
    painPointX: 0.22,
    painPointY: 0.35,
    painMovement: ["밀기"],
    painType: ["날카롭고, 찌르는 듯한 통증"],
    painStartedAt: new Date("2026-05-08"),
    painScore: 5,
    isCompleted: true,
    createdAt: "2026-05-09T17:50:00",
  },
  {
    examineId: 17,
    patientId: 17,
    painArea: ["허리"],
    painPointX: 0.46,
    painPointY: 0.73,
    painMovement: ["굽히기(굴곡)", "정지 시에도 통증"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-05-08"),
    painScore: 7,
    isCompleted: true,
    createdAt: "2026-05-10T08:45:00",
  },
  {
    examineId: 18,
    patientId: 18,
    painArea: ["목"],
    painPointX: 0.44,
    painPointY: 0.12,
    painMovement: ["정지 시에도 통증"],
    painType: ["타는 듯한 통증"],
    painStartedAt: new Date("2026-05-09"),
    painScore: 6,
    isCompleted: true,
    createdAt: "2026-05-10T14:40:00",
  },
  {
    examineId: 19,
    patientId: 19,
    painArea: ["어깨"],
    painPointX: 0.31,
    painPointY: 0.24,
    painMovement: ["밀기", "당기기"],
    painType: ["날카롭고, 찌르는 듯한 통증"],
    painStartedAt: new Date("2026-05-09"),
    painScore: 8,
    isCompleted: true,
    createdAt: "2026-05-11T09:20:00",
  },
  {
    examineId: 20,
    patientId: 20,
    painArea: ["무릎"],
    painPointX: 0.54,
    painPointY: 0.81,
    painMovement: ["해당 부위를 누를 시 통증"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-05-10"),
    painScore: 5,
    isCompleted: false,
    createdAt: "2026-05-11T16:00:00",
  },

  {
    examineId: 21,
    patientId: 1,
    painArea: ["손목"],
    painPointX: 0.71,
    painPointY: 0.44,
    painMovement: ["손목 바깥쪽으로 돌리기(회외)"],
    painType: ["지릿하고, 전기가 오는 듯한 통증"],
    painStartedAt: new Date("2026-05-10"),
    painScore: 4,
    isCompleted: true,
    createdAt: "2026-05-12T11:00:00",
  },
  {
    examineId: 22,
    patientId: 3,
    painArea: ["허리", "등"],
    painPointX: 0.5,
    painPointY: 0.63,
    painMovement: ["펴기(신전)"],
    painType: ["타는 듯한 통증"],
    painStartedAt: new Date("2026-05-11"),
    painScore: 6,
    isCompleted: true,
    createdAt: "2026-05-12T15:22:00",
  },
  {
    examineId: 23,
    patientId: 5,
    painArea: ["발목"],
    painPointX: 0.36,
    painPointY: 0.93,
    painMovement: ["당기기"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-05-11"),
    painScore: 3,
    isCompleted: true,
    createdAt: "2026-05-13T09:33:00",
  },
  {
    examineId: 24,
    patientId: 7,
    painArea: ["팔꿈치"],
    painPointX: 0.66,
    painPointY: 0.39,
    painMovement: ["밀기"],
    painType: ["날카롭고, 찌르는 듯한 통증"],
    painStartedAt: new Date("2026-05-12"),
    painScore: 7,
    isCompleted: true,
    createdAt: "2026-05-13T13:00:00",
  },
  {
    examineId: 25,
    patientId: 9,
    painArea: ["목"],
    painPointX: 0.48,
    painPointY: 0.15,
    painMovement: ["정지 시에도 통증"],
    painType: ["모르겠음"],
    painStartedAt: new Date("2026-05-13"),
    painScore: 2,
    isCompleted: true,
    createdAt: "2026-05-14T10:10:00",
  },
  {
    examineId: 26,
    patientId: 11,
    painArea: ["어깨"],
    painPointX: 0.28,
    painPointY: 0.21,
    painMovement: ["당기기"],
    painType: ["타는 듯한 통증"],
    painStartedAt: new Date("2026-05-12"),
    painScore: 5,
    isCompleted: false,
    createdAt: "2026-05-14T18:44:00",
  },
  {
    examineId: 27,
    patientId: 14,
    painArea: ["손목"],
    painPointX: 0.24,
    painPointY: 0.45,
    painMovement: ["손목 안쪽으로 돌리기(회내)"],
    painType: ["지릿하고, 전기가 오는 듯한 통증"],
    painStartedAt: new Date("2026-05-14"),
    painScore: 8,
    isCompleted: true,
    createdAt: "2026-05-15T12:50:00",
  },
  {
    examineId: 28,
    patientId: 16,
    painArea: ["무릎"],
    painPointX: 0.57,
    painPointY: 0.86,
    painMovement: ["굽히기(굴곡)"],
    painType: ["둔하고 욱신거리는 통증"],
    painStartedAt: new Date("2026-05-13"),
    painScore: 4,
    isCompleted: true,
    createdAt: "2026-05-15T16:05:00",
  },
  {
    examineId: 29,
    patientId: 18,
    painArea: ["등"],
    painPointX: 0.49,
    painPointY: 0.42,
    painMovement: ["펴기(신전)", "정지 시에도 통증"],
    painType: ["타는 듯한 통증"],
    painStartedAt: new Date("2026-05-14"),
    painScore: 7,
    isCompleted: true,
    createdAt: "2026-05-16T09:18:00",
  },
  {
    examineId: 30,
    patientId: 20,
    painArea: ["허리"],
    painPointX: 0.47,
    painPointY: 0.74,
    painMovement: ["굽히기(굴곡)", "해당 부위를 누를 시 통증"],
    painType: ["날카롭고, 찌르는 듯한 통증"],
    painStartedAt: new Date("2026-05-15"),
    painScore: 9,
    isCompleted: true,
    createdAt: "2026-05-16T17:30:00",
  },
];
