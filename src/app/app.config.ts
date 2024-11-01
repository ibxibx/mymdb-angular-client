/**
 * @fileoverview Application configuration and provider setup
 * @module AppConfig
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * @constant {ApplicationConfig} appConfig
 * @description Application-wide configuration object
 * @property {Provider[]} providers - Array of application providers
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Add this
    provideAnimationsAsync(), // Remove duplicates, only need one
  ],
};
