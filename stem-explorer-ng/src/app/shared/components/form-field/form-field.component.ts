import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';
import { StemColoursService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

  @Input() category: Categories;

  constructor(
    private stemColors: StemColoursService,
  ) {}

  get color() {
    return this.stemColors.getColour(this.category);
  }

}
