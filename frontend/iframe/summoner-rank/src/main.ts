import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RankAppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(RankAppModule)
  .catch(err => console.error(err));
