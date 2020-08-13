import { Injectable } from '@angular/core';
import { Categories } from '../enums/categories.enum';

@Injectable()
export class StemColoursService {
  colours = [
    { category: Categories.Science, colour: 'green' },
    { category: Categories.Technology, colour: 'blue' },
    { category: Categories.Engineering, colour: 'orange' },
    { category: Categories.Maths, colour: 'purple' },
  ];

  getColour(category: Categories) {
    return this.colours.find(l => l.category === category)?.colour;
  }
}