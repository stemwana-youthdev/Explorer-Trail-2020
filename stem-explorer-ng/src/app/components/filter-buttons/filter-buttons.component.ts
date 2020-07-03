import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-buttons',
  templateUrl: './filter-buttons.component.html',
  styleUrls: ['./filter-buttons.component.scss']
})
export class FilterButtonsComponent implements OnInit {

  @Output() data: EventEmitter<string[]> = new EventEmitter<string[]>();

  buttons = [
    {category: 'S', value: 0, colorClass: 'blue'},
    {category: 'T', value: 1, colorClass: 'green'},
    {category: 'E', value: 2, colorClass: 'orange'},
    {category: 'M', value: 3, colorClass: 'purple'}
    ];

  change(value) {
    this.data.emit(value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
