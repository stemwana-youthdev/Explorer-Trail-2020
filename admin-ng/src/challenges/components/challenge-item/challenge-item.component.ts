import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Challenge } from '../../../app/shared/models/challenges.model';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { ChallengeFormsFactory } from '../../factories/forms.factory';

@Component({
  selector: 'app-challenge-item',
  templateUrl: './challenge-item.component.html',
  styleUrls: ['./challenge-item.component.scss']
})
export class ChallengeItemComponent implements OnInit {
  challenge: Challenge;
  challengeId: string;

  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  topButtons: NavButton[] = [
    {
      label: 'Back to Challenges',
      link: 'challenges',
      colour: 'light-blue'
    }
  ];

  get title(): string {
    return this.challengeId ? this.challenge?.title : 'Create New Challenge';
  }

  constructor(
    activatedRoute: ActivatedRoute,
    formsFactory: ChallengeFormsFactory,
    private service: ApiService,
    private router: Router
  ) {
    this.challengeId = activatedRoute.snapshot.params['id'];
    this.fields = formsFactory.challengeForm();
  }

  ngOnInit(): void {
    if (this.challengeId) {
      this.getChallenge();
    } else {
      this.challenge = {
        id: null,
        title: '',
        description: '',
        category: null
      };
    }
  }

  saveChallenge(): void {
    if (this.challengeId) {
      this.service.updateChallenge(this.challenge).subscribe();
    } else {
      this.service.createChallenge(this.challenge).subscribe(res => {
        this.router.navigate([`challenges/${res.id}`]);
      });
    }
  }

  private getChallenge(): void {
    this.service.getChallenge(this.challengeId).subscribe(res => {
      this.challenge = res;
    });
  }
}
