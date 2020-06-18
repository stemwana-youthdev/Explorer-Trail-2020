import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Categories } from '../../shared/enums/categories.enum';
import { Challenge } from '../../shared/models/challenge';
import { MatDialog } from '@angular/material/dialog';
import { ListViewDialogComponent } from '../../components/list-view-dialog/list-view-dialog.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  challenges: Challenge[] = [];
  locations: any = [];
  Categories : any = Categories;

  constructor(private service: ApiService, public dialog: MatDialog) {
   }

  getChallenges() {
    this.service.getChallenges().subscribe((res)=>{
      this.challenges = res["challenges"]
      this.challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)
      });
  }

  getLocations() {
    this.service.getLocations().subscribe((res)=>{
      this.locations = res["location"]
      });
  }

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
