import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent as MasteriesAppComponent } from './app.component';
import { API_BASE_URL } from './services/api.service';
import { ChampUrlNamePipe } from './pipes/champ-url-name.pipe';

@NgModule({
  declarations: [
    MasteriesAppComponent,
    ChampUrlNamePipe
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
    MasteriesAppComponent
  ]
})
export class MasteriesAppModule { }
