import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavButton } from '../../../app/shared/models/nav-button.model';
import { Table } from '../../../app/shared/models/table.model';
import { ApiService } from '../../../app/shared/services/api.service';
import { AdminsTablesFactory } from '../../factories/tables.factory';
import { FormsFactory } from '../../factories/forms.factory';
import { Admin } from '../../admin.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-external-content',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  admins: Admin[];
  table: Table;

  topButtons: NavButton[] = [];

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  newAdmin: Admin = { email: '' };

  constructor(
    private api: ApiService,
    tableFactory: AdminsTablesFactory,
    formsFactory: FormsFactory
  ) {
    this.table = tableFactory.adminsTable((item) => this.deleteAdmin(item));
    this.fields = formsFactory.adminForm();
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.api.getAdmins().subscribe((res) => {
      console.warn(res);
      this.admins = res.map((email) => ({ email }));
    });
  }

  async deleteAdmin(admin: Admin) {
    await this.api.deleteAdmin(admin.email).toPromise();

    this.admins = this.admins.filter((a) => a.email !== admin.email);
  }

  async addAdmin(admin: Admin) {
    await this.api.createAdmin(admin.email).toPromise();

    this.admins.push(admin);
    this.newAdmin = { email: '' };
  }
}
