import { Component, OnInit } from '@angular/core';
import { Content } from '../../shared/models/content.model';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})
export class ContentItemComponent implements OnInit {
  content: Content;
  contentUid: string;

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    activatedRoute: ActivatedRoute
  ) {
    console.warn(activatedRoute)
    // tslint:disable-next-line: no-string-literal
    this.contentUid = activatedRoute.snapshot.params['id'];
    console.warn(this.contentUid)
  }

  ngOnInit() {
    if (this.contentUid) {
      this.getContent();
    }
    this.constructForm();
  }

  save(content: Content): Observable<Content> {
    const obs = this.api.putContent(content);
    obs.subscribe(res => {
      if (res) {
        console.warn('save success!');
        this.router.navigate(['content']);
      }
    });
    return obs;
  }

  private getContent() {
    this.api.getContentItem(this.contentUid).subscribe(res => {
      this.content = res;
    });
  }

  private constructForm() {
    this.fields = [
      {
        key: 'title',
        id: 'field_content_title',
        type: 'input',
        templateOptions: {
          placeholder: 'Custom Content Navigation Title',
          required: true,
          maxLength: 25
        }
      },
      {
        key: 'link',
        id: 'field_content_link',
        type: 'input',
        templateOptions: {
          placeholder: 'Custom Content Link',
          required: true
        }
      }
      /**
       * @todo add button here to show when link field has value to test link works.
       */
    ];
  }
}
