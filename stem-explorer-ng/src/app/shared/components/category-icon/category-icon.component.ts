import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss']
})
export class CategoryIconComponent {

  @Input() category: Categories;

  images = {
    [Categories.Science]: 'assets/icons/CAT-science.svg',
    [Categories.Technology]: 'assets/icons/CAT-technology.svg',
    [Categories.Engineering]: 'assets/icons/CAT-engineering.svg',
    [Categories.Maths]: 'assets/icons/CAT-maths.svg',
  };

  Categories: any = Categories;

  constructor() { }

  get imageURL() {
    return this.images[this.category];
  }

}
