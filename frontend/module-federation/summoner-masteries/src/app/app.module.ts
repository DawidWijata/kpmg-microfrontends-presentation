import { NgModule } from '@angular/core';

import { MasteriesAppComponent } from './app.component';
import { MasteriesComponent } from './masteries/masteries.component';

@NgModule({
  declarations: [
    MasteriesAppComponent,
  ],
  imports: [ MasteriesComponent ],
  bootstrap: [ MasteriesAppComponent ]
})
export class MasteriesAppModule { }
