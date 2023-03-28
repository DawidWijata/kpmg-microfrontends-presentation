import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent as RankAppComponent } from './app.component';
import { API_BASE_URL } from './services/api.service';

@NgModule({
  declarations: [
    RankAppComponent
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
    RankAppComponent
  ]
})
export class RankAppModule { }
