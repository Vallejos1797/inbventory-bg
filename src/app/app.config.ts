import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimización de detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Rutas de la app
    provideRouter(routes),

    // Hydration (SSR y optimización)
    provideClientHydration(),

    // Cliente HTTP global
    provideHttpClient(),

    // Animaciones de Angular
    provideAnimationsAsync(),

    provideHttpClient(withFetch()),
    // Configuración global de PrimeNG
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
