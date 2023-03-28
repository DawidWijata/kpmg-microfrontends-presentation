import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent as BasicInfoAppComponent } from './app.component';
import { API_BASE_URL } from './services/api.service';

@NgModule({
  declarations: [
    BasicInfoAppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://localhost:7128'}
  ],
  bootstrap: [
    BasicInfoAppComponent
  ]
})
export class BasicInfoAppModule { }
