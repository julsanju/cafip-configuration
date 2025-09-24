import { enableProdMode, NgZone } from '@angular/core';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { Router } from '@angular/router';
import { App } from './app/app';
import { platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

// Microfrontend Angular standalone con componente raíz App y enrutamiento provisto en appConfig.

const lifecycles = singleSpaAngular({
  bootstrapFunction: async () => {
    // Logs de diagnóstico
    // eslint-disable-next-line no-console
    console.log('[MFE configuration] bootstrapFunction start');
    if (typeof window !== 'undefined' && (window as any).ngProdMode === true) {
      enableProdMode();
    }
    // platformBrowser no es necesario aquí; bootstrapApplication maneja el arranque

    // Para standalone components, usamos `bootstrapApplication` internamente
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { provideRouter, withInMemoryScrolling } = await import('@angular/router');

    const appRef = await bootstrapApplication(App, {
      providers: [
        ...getSingleSpaExtraProviders(),
        // Nota: mantener las rutas internas del micro sin cambiar el URL global
        // Usamos solo ruta vacía para evitar replaceState en el navegador
        provideRouter([
          { path: '', loadComponent: () => import('./app/configuration/configuration.component').then(m => m.ConfigurationComponent) },
          { path: '**', redirectTo: '' },
        ], withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
      ],
    });
    // eslint-disable-next-line no-console
    console.log('[MFE configuration] bootstrapApplication done', appRef);
    return appRef;
  },
  template: '<app-root />',
  Router,
  NgZone,
  domElementGetter: () => {
    // eslint-disable-next-line no-console
    console.log('[MFE configuration] domElementGetter called');
    // Forzar que siempre use el contenedor del host, no el body
    let container = document.getElementById('single-spa-application:cafip-configuration');
    
    if (!container) {
      // Si no existe, crearlo dentro del contenido principal del host
      const mainContent = document.querySelector('main') || document.querySelector('#main-content');
      if (mainContent) {
        container = document.createElement('div');
        container.id = 'single-spa-application:cafip-configuration';
        container.style.cssText = 'position: static !important; z-index: 1 !important; width: 100% !important;';
        mainContent.appendChild(container);
      } else {
        // Último recurso: crear en body pero con estilos que no interfieran
        container = document.createElement('div');
        container.id = 'single-spa-application:cafip-configuration';
        container.style.cssText = 'position: static !important; z-index: 1 !important; width: 100% !important;';
        document.body.appendChild(container);
      }
    }
    
    // eslint-disable-next-line no-console
    console.log('[MFE configuration] using container', container);
    return container;
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

      // Asegurar que existe un contenedor dentro del host si está disponible
      const preferredId = 'single-spa-application:cafip-configuration';
      let container = document.getElementById(preferredId) || document.getElementById('cafip-configuration-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'cafip-configuration-container';
        document.body.appendChild(container);
      }
      if (!container.querySelector('app-root')) {
        container.appendChild(document.createElement('app-root'));
      }

      await bootstrapApplication(App, {
        providers: [
          ...getSingleSpaExtraProviders(),
          provideRouter([
            { path: '', loadComponent: () => import('./app/configuration/configuration.component').then(m => m.ConfigurationComponent) },
            { path: '**', redirectTo: '' },
          ], withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
        ],
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error bootstrapping standalone microfrontend:', err);
    }
  })();
}

