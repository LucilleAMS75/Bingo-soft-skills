export interface BingoCase {
  id: string;
  text: string;
  points: number;
  color: string;
}

export interface Competence {
  id: string;
  title: string;
  cases: BingoCase[];
}

export type Screen = 'instructions' | 'bingo' | 'results';
