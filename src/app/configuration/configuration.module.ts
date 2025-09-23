import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { ConfigurationService } from './configuration.service';

// Rutas del módulo de configuración
const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ConfigurationComponent // Importamos el componente standalone
  ],
  providers: [
    ConfigurationService
  ],
  exports: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule { }

// Re-exportar para facilitar el uso desde otros microfrontends
export { ConfigurationComponent } from './configuration.component';
export { ConfigurationService } from './configuration.service';
export type { CafipConfiguration } from './configuration.service';