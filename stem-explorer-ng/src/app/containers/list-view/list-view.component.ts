import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Categories } from '../../shared/enums/categories.enum';
import { Challenge } from '../../shared/models/challenge';
import { MatDialog } from '@angular/material/dialog';
import { ListViewDialogComponent } from '../../components/list-view-dialog/list-view-dialog.component';
import { Location } from '../../shared/models/location';

/*
* Component to show the challenges in a list view
*/
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  challenges: Challenge[] = [];
  Categories: any = Categories;

  constructor(private service: ApiService, public dialog: MatDialog) {
   }

  /*
  * Gets an array of challenges in alphabetical order from the API service
  */
  getChallenges() {
    this.service.getChallenges().subscribe((res) => {
      this.challenges = res;
      this.challenges.sort((a, b) => (a.title > b.title) ? 1 : -1);
      });
  }

  /*
  * Opens the dialog for the given challenge
  */
  openDialog(challenge: Challenge) {
    this.dialog.open(ListViewDialogComponent, {
      data: {
        title: challenge.title,
        category: Categories[challenge.category],
        description: challenge.description,
        name: challenge.location.name,
        link: challenge.location.link
      }
    });
  }

  ngOnInit() {
    this.getChallenges();
  }

}
