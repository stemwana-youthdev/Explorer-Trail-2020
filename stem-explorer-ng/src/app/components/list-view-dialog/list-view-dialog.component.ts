import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-list-view-dialog',
  templateUrl: './list-view-dialog.component.html',
  styleUrls: ['./list-view-dialog.component.scss']
})
export class ListViewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private router: Router) { }

  ngOnInit()  {
  }

  goToChallenge(id) {
    this.router.navigate(['challenge/' + id]);
  }

}
