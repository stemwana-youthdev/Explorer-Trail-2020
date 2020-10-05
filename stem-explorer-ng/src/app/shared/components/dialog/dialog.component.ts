import { Component, OnInit, Input } from '@angular/core';
import { Categories } from '../../enums/categories.enum';
import { StemColorsService } from '../../services/stem-colors.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() inverted: any;
  @Input() color?: 'green'|'blue'|'orange'|'purple'|'pink'|'red';
  @Input() category?: Categories;

  constructor(
    private stemColors: StemColorsService,
  ) {}

  ngOnInit(): void {
  }

  get colorClass() {
    return this.stemColors.getColor(this.category) ?? this.color ?? 'pink';
  }

}
