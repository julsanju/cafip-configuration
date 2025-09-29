import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from './shared/components/ui/breadcrumb/breadcrumb.component';
import { LoadingSpinnerComponent } from './shared/components/ui/loading-spinner/loading-spinner';
import { NotificationContainerComponent } from './shared/components/ui/notification/notification-container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbComponent, LoadingSpinnerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('cafip-configuration');
}
