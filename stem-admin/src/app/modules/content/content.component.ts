import { Component, OnInit } from '@angular/core';
import { TableFactory } from '../../shared/factories/table.factory';
import { Content } from '../../shared/models/content.model';
import { ApiService } from '../../services/api/api.service';
import { Table } from '../../shared/models/table.model';
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
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getContent();
  }

  /**
   * Gets content from the api.
   * @todo connect when API is done.
   */
  getContent(): void {
    // temp until API completed
    this.content = CustomContent;
    // this.api.getAllContent().subscribe((res: any) => {
    //   this.content = res;
    // });
  }

  /**
   * @description opens content item dialog for editing existing and adding new content.
   * @param content content object from table. Nothing is passed if user has selected add new content.
   */
  contentDialog(content?): void {

    // when adding new content, nothing is passed through as content so need to make
    // sure it's an empty object.
    if (!content) {
      content = {};
    }

    const popup = this.dialog.open(ContentDialogComponent, {
      width: '500px',
      data: content
    });

    popup.afterClosed().subscribe(res => {
      /**
       * @todo add order no. for new content to add it to bottom of the list.
       */
    });
  }
}
