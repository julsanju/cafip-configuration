import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { Router } from '@angular/router';
import { ConfigurationComponent } from './app/configuration/configuration.component';

// Nota: este micro expondrá un componente standalone. No hay módulo raíz.

const lifecycles = singleSpaAngular({
  bootstrapFunction: async () => {
    if (typeof window !== 'undefined' && (window as any).ngProdMode === true) {
      enableProdMode();
    }
    const platform = platformBrowser([
      ...getSingleSpaExtraProviders(),
    ]);

    // Para standalone components, usamos `bootstrapApplication` internamente
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { provideRouter } = await import('@angular/router');

    return bootstrapApplication(ConfigurationComponent, {
      providers: [
        ...getSingleSpaExtraProviders(),
        provideRouter([
          { path: '', component: ConfigurationComponent },
        ]),
      ],
    });
  },
  template: '<app-configuration />',
  Router,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

