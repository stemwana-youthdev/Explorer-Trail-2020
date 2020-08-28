import { Component, OnInit } from '@angular/core';
import { TableFactory } from '../../shared/factories/table.factory';
import { Content } from '../../shared/models/content.model';
import { ApiService } from '../../services/api/api.service';
import { Table } from '../../shared/models/table.model';
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from './content-dialog/content-dialog.component';
import { CustomContent } from './custom-content';
import { Store, Select } from '@ngxs/store';
import { AddContentItem, SetContent } from './content-state/content.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentState } from './content-state/content.state';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [TableFactory]
})
export class ContentComponent implements OnInit {
  content: Content[] = [];
  table: Table = this.tableFactory.contentTable();

  @Select(ContentState.getContent) allContent$;

  state$: Observable<ContentState>;

  // @Select(ContentState.getContent) content$;

  constructor(
    readonly tableFactory: TableFactory,
    private api: ApiService,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.state$ = this.store.select(state => state);
    console.warn(this.allContent$)
  }

  ngOnInit() {
    this.getContent();
  }

  /**
   * Gets content from the api.
   * @todo connect when API is done.
   */
  getContent(): void {
    console.warn('get content!')
    this.content = CustomContent;
    this.store.dispatch([
      new SetContent(this.content)
    ]);
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
      this.store.dispatch([
        new AddContentItem(res)
      ]);
    });
  }
}
