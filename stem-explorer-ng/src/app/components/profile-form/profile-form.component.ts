import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UpdateUser } from 'src/app/store/current-user/current-user.actions';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Input() user: User;

  // @Output() updateUser = new EventEmitter<UpdateUser>();

  constructor() { }

  ngOnInit(): void {
  }

}
