import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrentUserState } from 'src/app/store/current-user/current-user.state';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { UpdateUser } from 'src/app/store/current-user/current-user.actions';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Select(CurrentUserState.user) public user$: Observable<User>;

  currentUserEmail: string;

  constructor(
    private api: ApiService,
    private store: Store,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getEmail();
  }

  updateUser(user: User) {
    this.store.dispatch(new UpdateUser(user));
    this.api.updateCurrentUser(user);
  }

  async getEmail() {
    const email = await this.auth.currentUserEmail();
    this.currentUserEmail = email;
  }

}
