export interface Table {
  columns: Column[];
}

export interface Column {
  columnDef: string;
  header: string;
  formatter: string;
}
