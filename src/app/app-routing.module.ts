/**
 * @packageDocumentation
 * @module Core/RoutingModule
 * @preferred
 *
 * @description
 * This module provides the routing module configuration for the application.
 * It integrates the route definitions with Angular's routing system.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

/**
 * Module that configures and provides routing functionality.
 *
 * @remarks
 * This module:
 * - Imports RouterModule with the application routes
 * - Exports RouterModule for use in other modules
 * - Configures root-level routing
 *
 * @public
 * @class
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
