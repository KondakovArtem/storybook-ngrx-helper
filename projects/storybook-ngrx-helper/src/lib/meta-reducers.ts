import { ActionReducer } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { merge } from 'lodash';

import { ActionType, EStorybookActions } from './model';

export function metaReducerForStorybook(reducer: ActionReducer<any>) {
  return (state: any, action: ActionType) => {
    if (action.type === EStorybookActions.INIT) {
      return reducer(merge(cloneDeep(state), action.payload), action);
    }
    return reducer(state, action);
  };
}
