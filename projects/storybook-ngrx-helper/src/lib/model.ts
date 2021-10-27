import { Action } from '@ngrx/store';

export enum EStorybookActions {
  INIT = '@storybook/redux-init',
}

export interface ActionType extends Action {
  payload: any;
}
