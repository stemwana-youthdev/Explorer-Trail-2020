export interface Table {
  columns: Columns[];
}

export interface Columns {
  columnDef: string;
  header: string;
  formatter: string;
}
