import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SearchBarAppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(SearchBarAppModule)
  .catch(err => console.error(err));
