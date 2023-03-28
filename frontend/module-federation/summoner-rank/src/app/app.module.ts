import { NgModule } from '@angular/core';

import { RankAppComponent } from './app.component';
import { RankComponent } from './rank/rank.component';

@NgModule({
  declarations: [ RankAppComponent ],
  imports: [ RankComponent ],
  bootstrap: [ RankAppComponent ]
})
export class RankAppModule { }
