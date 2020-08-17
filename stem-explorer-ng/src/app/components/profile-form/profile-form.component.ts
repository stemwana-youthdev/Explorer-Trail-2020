import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CurrentUserState } from 'src/app/store/current-user/current-user.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Select(CurrentUserState.isLoggedIn) public isLoggedIn$: Observable<boolean>;

  @Input() user: User;
  @Input() email: string;

  @Output() updateUser = new EventEmitter<User>();

  updatedUser: User;


  constructor() { }

  ngOnInit(): void {
  }

  updateProfile(uid, firstname, lastname, r, town) {
    this.updatedUser = {id: uid, firstName: firstname, lastName: lastname, region: r, homeTown: town};
    this.updateUser.emit(this.updatedUser);
  }

}
