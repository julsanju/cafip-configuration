import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfigurationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cafip-configuration');
}
