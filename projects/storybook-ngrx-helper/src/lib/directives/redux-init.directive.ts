import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { EStorybookActions } from '../model';

/**
 * A helper directive for a storybook that allows you to set the initial state of the store
 * before displaying stories
 */
@Directive({
  selector: '[reduxInit]',
})
export class ReduxInitDirective implements OnChanges {
  constructor(private store: Store<any>) {}

  @Input() reduxInit?: Record<string, unknown>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reduxInit && changes.reduxInit.currentValue) {
      this.store.dispatch({
        type: EStorybookActions.INIT,
        payload: changes.reduxInit.currentValue,
      });
    }
  }
}
