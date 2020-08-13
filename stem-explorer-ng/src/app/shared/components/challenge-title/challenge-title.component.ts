import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';
import { StemColoursService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-challenge-title',
  templateUrl: './challenge-title.component.html',
  styleUrls: ['./challenge-title.component.scss']
})
export class ChallengeTitleComponent {

  @Input() category: Categories;

  constructor(
    private stemColors: StemColoursService,
  ) { }

  get color() {
    return this.stemColors.getColour(this.category);
  }

}
