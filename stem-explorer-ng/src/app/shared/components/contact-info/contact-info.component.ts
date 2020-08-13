import { Component, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';
import { StemColoursService } from '../../services/stem-colors.service';

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
    private stemColors: StemColoursService,
  ) { }

  get color() {
    return this.stemColors.getColour(this.category);
  }

}
