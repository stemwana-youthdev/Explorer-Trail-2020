import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeViewComponent } from './components/challenge-view/challenge-view.component';
import { HintDialogComponent } from './components/hint-dialog/hint-dialog.component';
import { AnswerDialogComponent } from './components/answer-dialog/answer-dialog.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChallengesRoutingModule
  ],
  declarations: [
    ChallengeViewComponent,
    HintDialogComponent,
    AnswerDialogComponent,
    ResultDialogComponent
  ],
  providers: [],
  entryComponents: []
})
export class ChallengesModule {}
