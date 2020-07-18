import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() color: 'green'|'blue'|'orange'|'purple'|'pink';

  constructor() { }

  ngOnInit(): void {
  }

}
