import { State } from '@ngxs/store';

export interface AppStateModel {
  username: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    username: ''
  }
})
export class AppState {
  constructor() {}
}
