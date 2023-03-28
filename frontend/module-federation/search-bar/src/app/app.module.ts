import { NgModule } from '@angular/core';

import { SearchBarAppComponent } from './app.component';
import { API_BASE_URL } from './services/api.service';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [ SearchBarAppComponent ],
  imports: [ SearchBarComponent ],
  bootstrap: [ SearchBarAppComponent ]
})
export class SearchBarAppModule { }
