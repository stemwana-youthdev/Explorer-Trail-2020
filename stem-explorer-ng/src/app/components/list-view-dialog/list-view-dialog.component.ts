import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-view-dialog',
  templateUrl: './list-view-dialog.component.html',
  styleUrls: ['./list-view-dialog.component.scss']
})
export class ListViewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit()  {
  }

}
