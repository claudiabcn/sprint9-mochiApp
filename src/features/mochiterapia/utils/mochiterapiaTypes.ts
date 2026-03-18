export interface MotivationalPhrase {
  id: number;
  phrase: string;
  created_at: string;
}

export type MochiterapiaState =
  | { status: "loading" }
  | { status: "success"; phrase: string; photoIndex: number }
  | { status: "error"; message: string };
