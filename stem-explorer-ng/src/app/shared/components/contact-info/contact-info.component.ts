import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {

  @Input() category: number;
  @Input() link: string;
  @Input() icon: string;
  @Input() label: string;
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
