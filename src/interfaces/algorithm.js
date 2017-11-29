export interface Algorithm {
  key: string;
  value: string;
  hidden?: boolean;
}

export interface Algorithms {
  [key: string]: string;
}
