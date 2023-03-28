import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MatchHistoryAppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(MatchHistoryAppModule)
  .catch(err => console.error(err));
