import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';

@Component({
  selector: 'app-challenge-title',
  templateUrl: './challenge-title.component.html',
  styleUrls: ['./challenge-title.component.scss']
})
export class ChallengeTitleComponent {

  @Input() category: number;
  colors = [
    {category: Categories.Science, color: 'green'},
    {category: Categories.Technology, color: 'blue'},
    {category: Categories.Engineering, color: 'orange'},
    {category: Categories.Maths, color: 'purple'}
  ];

  constructor() { }

  get color() {
    return this.colors.find(l => l.category === this.category)?.color;
  }

}
