import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Input() user: User;
  @Input() email: string;

  @Output() updateUser = new EventEmitter<User>();

  firstNameValue;
  lastNameValue;
  regionValue;
  homeTownValue;

  updatedUser: User;


  constructor() { }

  ngOnInit(): void {
    this.firstNameValue = this.user.firstName;
    this.lastNameValue = this.user.lastName;
    this.regionValue = this.user.region;
    this.homeTownValue = this.user.homeTown;
  }

  updateProfile(uid, firstname, lastname, r, town) {
    this.updatedUser = {id: uid, firstName: firstname, lastName: lastname, region: r, homeTown: town};
    this.updateUser.emit(this.updatedUser);
  }

}
