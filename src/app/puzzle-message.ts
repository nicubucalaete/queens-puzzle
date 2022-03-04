export enum PuzzleMessageType {
  CONFLICTING_QUEENS,
  PARTIAL_SOLUTION,
  FINAL_SOLUTION
}

export type QueenPozition =
  {
    row: number;
    column: number;
  }

export interface PuzzleMessage {
  type: PuzzleMessageType;
  queen1Poz?: QueenPozition;
  queen2Poz?: QueenPozition;
  solution?: number[];
}
