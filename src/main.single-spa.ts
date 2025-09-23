import { enableProdMode, NgZone } from '@angular/core';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { Router } from '@angular/router';
import { App } from './app/app';

// Nota: este micro expondrá un componente standalone. No hay módulo raíz.

const lifecycles = singleSpaAngular({
  bootstrapFunction: async () => {
    if (typeof window !== 'undefined' && (window as any).ngProdMode === true) {
      enableProdMode();
    }
    // platformBrowser no es necesario aquí; bootstrapApplication maneja el arranque

    // Para standalone components, usamos `bootstrapApplication` internamente
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { provideRouter, withInMemoryScrolling } = await import('@angular/router');

    return bootstrapApplication(App, {
      providers: [
        ...getSingleSpaExtraProviders(),
        provideRouter([
          { path: '', redirectTo: 'configuration', pathMatch: 'full' },
          { path: 'configuration', loadComponent: () => import('./app/configuration/configuration.component').then(m => m.ConfigurationComponent) },
          { path: '**', redirectTo: 'configuration' },
        ], withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
      ],
    });
  },
  template: '<app-root />',
  Router,
  NgZone,
  domElementGetter: () => {
    let el = document.getElementById('cafip-configuration-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cafip-configuration-container';
      document.body.appendChild(el);
    }
    return el;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

// Auto-montaje en local cuando no estamos dentro de single-spa (dev standalone)
if (typeof window !== 'undefined' && !(window as any).singleSpaNavigate) {
  (async () => {
    try {
      const { bootstrapApplication } = await import('@angular/platform-browser');
      const { provideRouter, withInMemoryScrolling } = await import('@angular/router');
      await bootstrapApplication(App, {
        providers: [
          ...getSingleSpaExtraProviders(),
          provideRouter([
            { path: '', redirectTo: 'configuration', pathMatch: 'full' },
            { path: 'configuration', loadComponent: () => import('./app/configuration/configuration.component').then(m => m.ConfigurationComponent) },
            { path: '**', redirectTo: 'configuration' },
          ], withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
        ],
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error bootstrapping standalone microfrontend:', err);
    }
  })();
}

