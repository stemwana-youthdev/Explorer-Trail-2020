import { Injectable } from '@angular/core';
import { Categories } from '../enums/categories.enum';

@Injectable()
export class StemColorsService {
  colors = [
    { category: Categories.Science, color: 'green' },
    { category: Categories.Technology, color: 'blue' },
    { category: Categories.Engineering, color: 'orange' },
    { category: Categories.Maths, color: 'purple' },
  ];

  getColor(category: Categories) {
    return this.colors.find(l => l.category === category)?.color;
  }
}
