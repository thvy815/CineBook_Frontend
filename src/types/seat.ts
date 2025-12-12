export type Seat = {
  id: string;
  row: string;
  col: number;
  type: "single" | "double";
  block: "left" | "right" | "center";
  status: "available" | "locked";
};
