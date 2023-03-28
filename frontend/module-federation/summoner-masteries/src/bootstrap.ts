import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MasteriesAppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(MasteriesAppModule)
  .catch(err => console.error(err));
