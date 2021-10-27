import { NgModule } from '@angular/core';
import { ReduxInitDirective } from './redux-init.directive';
import { RouterInitDirective } from './router-init.directive';
import { SessionStorageInitDirective } from './session-storage-init.directive';

@NgModule({
  declarations: [ReduxInitDirective, SessionStorageInitDirective, RouterInitDirective],
  exports: [ReduxInitDirective, SessionStorageInitDirective, RouterInitDirective],
})
export class StorybookHelperModule {}
