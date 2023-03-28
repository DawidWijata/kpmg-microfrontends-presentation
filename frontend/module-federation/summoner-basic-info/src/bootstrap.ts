import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BasicInfoAppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(BasicInfoAppModule)
  .catch(err => console.error(err));
