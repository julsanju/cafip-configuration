import { Routes } from '@angular/router';
import { ConfigurationComponent } from './features/configuration/configuration.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'configuration',
    pathMatch: 'full',
  },
  {
    path: 'configuration',
    component: ConfigurationComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];


