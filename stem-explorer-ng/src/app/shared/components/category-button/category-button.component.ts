import { Component, OnInit, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent {

  @Input() inverted: any;
  @Input() disabled: any;
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
