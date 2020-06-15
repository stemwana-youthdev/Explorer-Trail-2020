import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  challenges: any = [];

  constructor(public service: ApiService) {
    this.service.getChallenges().subscribe((res)=>{
      this.challenges = res
      });
   }

  ngOnInit() {
  }

}
