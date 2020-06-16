import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Categories } from '../../shared/enums/categories.enum';
import { Challenge } from '../../shared/models/challenge';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  challenges: Challenge[] = [];
  Categories : any = Categories;

  constructor(private service: ApiService) {
   }

  getChallenges() {
    this.service.getChallenges().subscribe((res)=>{
      this.challenges = res["challenges"]
      this.challenges.sort((a, b) => (a.title > b.title) ? 1 : -1)
      });
  }

  ngOnInit() {
    this.getChallenges();
  }

}
