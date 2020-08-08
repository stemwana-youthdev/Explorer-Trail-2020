import { User } from 'src/app/shared/models/user';

export class UpdateToken {
  public static type = 'UpdateToken';
  constructor(public token: string | null) { }
}

export class UpdateUser {
  public static type = 'UpdateUser';
  constructor(public user: User | null) { }
}
