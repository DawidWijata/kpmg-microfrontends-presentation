import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { RankAppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { API_BASE_URL } from './services/api.service';

@NgModule({
  declarations: [
    RankAppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '**', component: EmptyRouteComponent }])
  ],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://localhost:7128'},
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [
    RankAppComponent
  ]
})
export class RankAppModule { }
