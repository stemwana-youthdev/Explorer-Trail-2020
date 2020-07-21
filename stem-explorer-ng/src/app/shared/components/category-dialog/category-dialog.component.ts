import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {

  @Input() inverted: any;
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
