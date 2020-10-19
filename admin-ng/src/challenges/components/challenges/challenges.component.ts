import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from 'src/app/shared/models/challenges.model';
import { NavButton } from 'src/app/shared/models/nav-button.model';
import { Table } from 'src/app/shared/models/table.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { ChallengesTablesFactory } from '../../factories/tables.factory';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
  providers: [ ChallengesTablesFactory ]
})
export class ChallengesComponent implements OnInit{
  challenges: Challenge[];
  table: Table;

  topButtons: NavButton[] = [
    {
      label: 'Add Challenge',
      link: 'challenges/create',
      colour: 'pink'
    }
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    readonly tableFactory: ChallengesTablesFactory
  ) {
    this.table = this.tableFactory.challengesTable();
  }

  ngOnInit(): void {
    this.getChallenges();
  }

  openChallenge(challenge: Challenge): any {
    return this.router.navigate([`challenges/${challenge.id}`]);
  }

  private getChallenges(): void {
    this.api.getChallenges().subscribe(res => {
      console.warn(res);
      this.challenges = res;
    });
  }
}
