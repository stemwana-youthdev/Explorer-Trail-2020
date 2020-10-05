import { Component, Input } from '@angular/core';
import { StemColorsService } from 'src/app/shared/services/stem-colors.service';
import { Categories } from 'src/app/shared/enums/categories.enum';
import { LocationLevel } from 'src/locations/models/location';

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-challenge-progress',
  templateUrl: './challenge-progress.component.html',
  styleUrls: ['./challenge-progress.component.scss'],
})
export class ChallengeProgressComponent {
  @Input() levels: LocationLevel[] = [];
  @Input() category: Categories;
  @Input() shownCount = 5;

  constructor(private stemColors: StemColorsService) {}

  get colorClass() {
    return this.stemColors.getColor(this.category);
  }

  get shownLevels() {
    const firstUnfinishedIndex = this.levels.findIndex(
      (level) => !level.complete
    );
    const maxStartIndex = this.levels.length - this.shownCount;
    const startIndex = Math.min(
      Math.max(firstUnfinishedIndex - 1, 0),
      maxStartIndex
    );
    return this.levels.slice(startIndex, startIndex + this.shownCount);
  }
}
