export class Table {
  columns: Column[];
}

export class Column {
  columnDef: string;
  header: string;
  type: string;
  icon?: string;
  onClick?: (item: any) => void;
}
