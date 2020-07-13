import { Content } from 'src/app/shared/models/content.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SetContent, AddContentItem } from './content.actions';

export interface ContentStateModel {
  content: Content[];
}

@State<ContentStateModel>({
  name: 'content',
  defaults: {
    content: []
  }
})
export class ContentState {

  @Selector()
  static getContent(state: ContentStateModel) {
    return state;
  }

  @Action(SetContent)
  setContent({ patchState }: StateContext<ContentStateModel>, { payload }: SetContent) {
    patchState({ content: payload });
  }

  @Action(AddContentItem)
  addContent(context: StateContext<ContentStateModel>, action: AddContentItem) {
    const current = context.getState();
    const newList = [...current.content, action.payload];

    context.patchState({
      content: newList
    });
  }
}
