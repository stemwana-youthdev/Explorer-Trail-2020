import { Component, Input } from '@angular/core';
import { StemColorsService } from 'src/app/shared/services/stem-colors.service';
import { Categories } from 'src/app/shared/enums/categories.enum';

export interface LevelProgress {
  difficulty: number;
  complete: boolean;
}

// TODO: replace with api data
const exampleLevels = [
  {
    difficulty: 1,
    complete: true,
  },
  {
    difficulty: 2,
    complete: false,
  },
  {
    difficulty: 3,
    complete: false,
  },
  {
    difficulty: 4,
    complete: false,
  },
];

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-challenge-progress',
  templateUrl: './challenge-progress.component.html',
  styleUrls: ['./challenge-progress.component.scss'],
})
export class ChallengeProgressComponent {
  @Input() levels: LevelProgress[] = exampleLevels;
  @Input() category: Categories;

  constructor(private stemColors: StemColorsService) {}

  get colorClass() {
    return this.stemColors.getColor(this.category);
  }
}
