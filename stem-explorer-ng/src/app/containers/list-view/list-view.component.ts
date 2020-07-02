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
  allChallenges: Challenge[] = [];
  locations: Location[] = [];
  Categories: any = Categories;

  buttons = [
    {category: 'S', value: 0, colorClass: 'blue'},
    {category: 'T', value: 1, colorClass: 'green'},
    {category: 'E', value: 2, colorClass: 'orange'},
    {category: 'M', value: 3, colorClass: 'purple'}
    ];

  constructor(private service: ApiService, public dialog: MatDialog) {
   }

  /*
  * Gets an array of challenges in alphabetical order from the API service
  */
  getChallenges() {
    this.service.getChallenges().subscribe((res) => {
      // tslint:disable-next-line: no-string-literal
      this.allChallenges = res['challenges'];
      this.allChallenges.sort((a, b) => (a.title > b.title) ? 1 : -1);
      this.challenges = this.allChallenges;
      });
  }

  /*
  * Gets an array of locations from the API service
  */
  getLocations() {
    this.service.getLocations().subscribe((res) => {
      // tslint:disable-next-line: no-string-literal
      this.locations = res['location'];
      });
  }

  /*
  * Filters challenges based on the selected stem filters
  */
  filterChallenges(value) {
    value = value.map(Number);
    this.challenges = this.allChallenges.filter(challenge => value.includes(challenge.category));
  }


  /*
  * Opens the dialog for the given challenge
  */
  openDialog(challenge) {
    this.dialog.open(ListViewDialogComponent, {
      data: {
        title: challenge.title,
        category: Categories[challenge.category],
        description: challenge.description,
        name: this.locations[challenge.uid - 1].name,
        link: this.locations[challenge.uid - 1].link
      }
    });
  }

  ngOnInit() {
    this.getChallenges();
    this.getLocations();
  }

}
