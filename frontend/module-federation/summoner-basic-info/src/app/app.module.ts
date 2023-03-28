import { NgModule } from '@angular/core';

import { BasicInfoAppComponent } from './app.component';
import { BasicInfoComponent } from './summoner-basic-info/summoner-basic-info.component';

@NgModule({
  declarations: [ BasicInfoAppComponent ],
  imports: [ BasicInfoComponent ],
  bootstrap: [ BasicInfoAppComponent ]
})
export class BasicInfoAppModule { }
