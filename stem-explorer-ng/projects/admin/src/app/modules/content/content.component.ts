import { Component, OnInit } from '@angular/core';
import { TableFactory } from '../../shared/factories/table.factory';
import { Content } from '../../shared/models/content.model';
import { ApiService } from '../../services/api/api.service';
import { Table } from '../../shared/models/table.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from './content-dialog/content-dialog.component';
import { CustomContent } from './custom-content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [TableFactory]
})
export class ContentComponent implements OnInit {
  content: Content[] = [];
  table: Table = this.tableFactory.contentTable();

  constructor(
    readonly tableFactory: TableFactory,
    private api: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getContent();
  }

  getContent(): void {
    // temp until API completed
    this.content = CustomContent;
    // this.api.getAllContent().subscribe((res: any) => {
    //   this.content = res;
    // });
  }

  goToContent(content: Content): void {
    this.router.navigate([`content/${content.uid}`]);
  }

  newContent() {
    const popup = this.dialog.open(ContentDialogComponent, {
      width: '400px',
      data: {}
    });

    popup.afterClosed().subscribe(res => {
      console.warn(res);
    });
  }
}
