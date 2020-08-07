import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';
import { StemColorsService } from '../../services/stem-colors.service';

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

  constructor(
    private stemColors: StemColorsService,
  ) { }

  get color() {
    return this.stemColors.getColor(this.category);
  }

}
