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

  constructor(private stemColors: StemColorsService) {}

  get colorClass() {
    return this.stemColors.getColor(this.category);
  }
}
