import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrentUserState } from 'src/app/store/current-user/current-user.state';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { UpdateUser } from 'src/app/store/current-user/current-user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Select(CurrentUserState.user) public user$: Observable<User>;

  constructor(
    private api: ApiService,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  updateUser(user: User) {
    console.log(user);
    this.store.dispatch(new UpdateUser(user));
    this.api.updateCurrentUser(user);
  }

}
