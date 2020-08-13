import { Component, OnInit, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';
import { StemColoursService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() inverted: any;
  @Input() color?: 'green'|'blue'|'orange'|'purple'|'pink';
  @Input() category?: Categories;

  constructor(
    private stemColors: StemColoursService,
  ) { }

  ngOnInit(): void {
  }

  get colorClass() {
    return this.stemColors.getColour(this.category) ?? this.color ?? 'pink';
  }

}
