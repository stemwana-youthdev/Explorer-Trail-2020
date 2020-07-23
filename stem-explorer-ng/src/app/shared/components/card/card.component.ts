import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';
import { StemColorsService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() category: Categories;

  constructor(
    private stemColors: StemColorsService,
  ) { }

  get color() {
    return this.stemColors.getColor(this.category);
  }

}
