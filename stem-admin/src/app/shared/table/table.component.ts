import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Columns, Table } from '../models/table.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  columns: Columns[] = [];

  /**
   * @description array of the data objects to show in the table.
   */
  @Input() dataSource: any[];
  @Input() table: Table;

  /**
   * @description sets whether the rows have drag and drop. Defaults to false.
   */
  @Input() canDrag = false;

  @Output() selectRow = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.setColumns();
  }

  /**
   * @description gets the columns from the table input; this is done in this component so we get the
   * whole table object incase there are other properties to add.
   * sets all the columnDef as an array of strings to displayedColumns.
   */
  private setColumns(): void {
    this.columns = this.table.columns;
    this.displayedColumns = this.columns.map((x => x.columnDef));
  }

  /**
   * @description emits action for when user clicks row, for main component to handle.
   * @todo add check for instances of table with no selectable rows.
   * @param row data object of the row
   */
  clickRow(row): void {
    this.selectRow.emit(row);
  }

  /**
   * @description on dropping row in new position, reordered the array of data objects and
   *  to be emitted to the main component to be saved to the API.
   * @param event the drag and drop event.
   */
  dropRow(event: CdkDragDrop<any>): void {
    const dataList = [...this.dataSource];
    moveItemInArray(dataList, event.previousIndex, event.currentIndex);
  }
}
