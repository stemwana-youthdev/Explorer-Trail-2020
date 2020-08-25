import { Component, Input } from '@angular/core';
import { StemColorsService } from 'src/app/shared/services/stem-colors.service';
import { Categories } from 'src/app/shared/enums/categories.enum';

export interface LevelProgress {
  difficulty: number;
  complete: boolean;
}

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-challenge-progress',
  templateUrl: './challenge-progress.component.html',
  styleUrls: ['./challenge-progress.component.scss'],
})
export class ChallengeProgressComponent {
  @Input() levels: LevelProgress[] = [];
  @Input() category: Categories;

  constructor(private stemColors: StemColorsService) {}

  get colorClass() {
    return this.stemColors.getColor(this.category);
  }
}
