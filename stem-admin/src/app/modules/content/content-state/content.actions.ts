import { Content } from 'src/app/shared/models/content.model';

export class SetContent {
  static readonly type = '[content] set content';
  constructor(public payload: Content[]) {}
}

export class AddContentItem {
  static readonly type = '[content] add content';
  constructor(public payload: Content) {}
}
