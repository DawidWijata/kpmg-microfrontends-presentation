import { NgModule } from '@angular/core';
import { MatchHistoryAppComponent } from './app.component';
import { MatchHistoryComponent } from './match-history/match-history.component';

@NgModule({
  declarations: [ MatchHistoryAppComponent ],
  imports: [ MatchHistoryComponent ],
  bootstrap: [ MatchHistoryAppComponent ]
})
export class MatchHistoryAppModule { }
