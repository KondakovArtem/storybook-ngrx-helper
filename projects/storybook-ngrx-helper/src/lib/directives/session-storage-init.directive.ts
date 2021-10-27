import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { each } from 'lodash';
import * as brickJson from 'brick.json';
import {compress, decompress} from 'lz-string';

/**
 * A helper directive for a storybook that allows you to set the initial state of the store
 * before displaying stories
 */
@Directive({
  selector: '[sessionStorageInit]',
})
export class SessionStorageInitDirective implements OnChanges {
  constructor(private store: Store<any>) {}

  @Input() sessionStorageInit?: Record<string, unknown>;
  @Input() compressed?: boolean;

  private parseItemValue(value?: string) {
    if (!value) return value;
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }

  private decompress(raw: string): any {
    if (!raw) return undefined;
    try {
      return brickJson.decompress(
        this.parseItemValue(decompress(raw) as string)
      );
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }

  private compress(obj: any): string {
    return compress(JSON.stringify(brickJson.compress(obj)));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sessionStorageInit && changes.sessionStorageInit.currentValue) {
      each(changes.sessionStorageInit.currentValue, (value, key) => {
        const newValue = this.compressed
          ? this.compress(value)
          : JSON.stringify(value);
        sessionStorage.setItem(key, newValue);
        window.dispatchEvent(
          new StorageEvent('storage', {
            newValue,
            key,
            storageArea: sessionStorage,
          })
        );
      });
    }
  }
}
