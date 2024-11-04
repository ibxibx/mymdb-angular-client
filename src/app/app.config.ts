/**
 * @packageDocumentation
 * @module Core/Config
 * @preferred
 *
 * @description
 * This module provides the core application configuration and provider setup.
 * It configures dependency injection, routing, and other application-wide services.
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * Application-wide configuration object that provides essential services.
 *
 * @remarks
 * This configuration includes:
 * - Zone.js change detection configuration
 * - Router provider setup
 * - HTTP client provider
 * - Animations provider
 *
 * @public
 * @constant
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
};
