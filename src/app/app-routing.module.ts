/**
 * @fileoverview Application routing module configuration
 * @module AppRoutingModule
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

/**
 * @class AppRoutingModule
 * @description Module for configuring the application's routing
 * @extends {NgModule}
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
