import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { Table } from '../../../app/shared/models/table.model';
import { ApiService } from '../../../app/shared/services/api.service';
import { ExternalContent } from '../../../app/shared/models/external-content.model';
import { ExternalContentTablesFactory } from 'src/external-content/factories/tables.factory';

@Component({
  selector: 'app-external-content',
  templateUrl: './external-content.component.html',
  styleUrls: ['./external-content.component.scss'],
})
export class ExternalContentComponent implements OnInit {
  externalContent: ExternalContent[];
  table: Table;

  topButtons: NavButton[] = [
    {
      label: 'Add Item',
      link: 'external-content/create',
      colour: 'pink'
    }
  ];

  constructor(
    private api: ApiService,
    readonly tableFactory: ExternalContentTablesFactory,
    private router: Router
  ) {
    this.table = this.tableFactory.externalContentTable();
  }

  ngOnInit(): void {
    this.getExternalContent();
  }

  getExternalContent(): void {
    this.api.getExternalContent().subscribe(res => {
      console.warn(res);
      this.externalContent = res;
    });
  }

  openExternalContentItem(item: ExternalContent): any {
    console.warn(item);
    return this.router.navigate([`external-content/${item.uid}`]);
  }
}
