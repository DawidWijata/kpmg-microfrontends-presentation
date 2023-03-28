import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent as MatchHistoryAppComponent } from './app.component';
import { ChampUrlNamePipe } from './pipes/champ-url-name.pipe';
import { API_BASE_URL } from './services/api.service';
import { HandleQueueIdPipe } from './pipes/handle-queue-id.pipe';
import { IconUrlPipe } from './pipes/icon-url.pipe';

@NgModule({
  declarations: [
    MatchHistoryAppComponent,
    ChampUrlNamePipe,
    HandleQueueIdPipe,
    IconUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://localhost:7128'}
  ],
  bootstrap: [
    MatchHistoryAppComponent
  ]
})
export class MatchHistoryAppModule { }
