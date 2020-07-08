import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Challenge } from '../../shared/models/challenge';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../shared/enums/categories.enum';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss']
})
export class ChallengeViewComponent implements OnInit {

  challenge = {} as Challenge;
  id: number;
  Categories: any = Categories;

  constructor(private service: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getChallenges();

    // Gets the id from the current route
    this.route.params.subscribe(params => {
      this.id = +params.id;
   });
  }


  /*
  * Gets an array of challenges in alphabetical order from the API service
  */
 getChallenges() {
  this.service.getChallenges().subscribe((res) => {
    // tslint:disable-next-line: no-string-literal
    this.challenge = res['challenges'].find(item => item.uid === this.id);
    });
}

}
