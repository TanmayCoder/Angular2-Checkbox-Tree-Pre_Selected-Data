import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { BootModule } from './boot';

enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(BootModule).then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));
