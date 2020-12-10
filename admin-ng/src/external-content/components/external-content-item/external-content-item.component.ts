import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../app/shared/services/api.service';
import { FormsFactory } from '../../factories/forms.factory';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ExternalContent } from 'src/app/shared/models/external-content.model';

@Component({
  selector: 'app-external-content-item',
  templateUrl: './external-content-item.component.html',
  styleUrls: ['./external-content-item.component.scss'],
})
export class ExternalContentItemComponent implements OnInit {
  item: ExternalContent;
  itemId: string;
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  deleteButton: NavButton = {
    label: 'Delete',
    onClick: () => this.deleteItem(),
    colour: 'pink'
  };

  topButtons: NavButton[] = [
    this.deleteButton,
    {
      label: 'Back to External Content',
      link: 'external-content',
      colour: 'light-blue'
    }
  ];

  get title(): string {
    return this.itemId ? this.item?.title : 'Create New External Content Item';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
    private formFactory: FormsFactory,
    private router: Router
  ) {
    this.itemId = this.activatedRoute.snapshot.params.id;
    this.fields = this.formFactory.locationForm();
  }

  ngOnInit(): void {
    if (this.itemId) {
      this.getItem();
    } else {
      this.item = {
        uid: undefined,
        title: '',
        url: '',
        order: 0,
      };
    }
  }

  saveItem(): void {
    if (this.item.order) {
      // Make sure that order is an int
      this.item.order = Math.round(this.item.order);
    }

    console.warn(this.item);
    if (this.itemId) {
      console.warn('has location');
      this.service.updateExternalContent(this.item).subscribe(res => {
        console.warn(res);
        // this.location = res;
      });
    } else {
      console.warn('new location');
      this.service.createExternalContent(this.item).subscribe(res => {
        this.item = res;
        this.router.navigate([`locations/${this.item.uid}`]);
      });
    }
  }

  private getItem(): void {
    this.service.getExternalContentItem(this.itemId).subscribe(res => {
      this.item = res;
    });
  }

  private deleteItem(): void {
    this.service.deleteExternalContent(this.itemId).subscribe(() => {
      this.router.navigate(['external-content']);
    });
  }
}
