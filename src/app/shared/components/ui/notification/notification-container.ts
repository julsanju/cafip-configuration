import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';
import { NotificationConfig } from './notification';
import { NotificationComponent } from './notification';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './notification-container.html',
  styleUrls: ['./notification-container.scss']
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
  notifications: NotificationConfig[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }

  onClose(notificationId: string) {
    this.notificationService.removeNotification(notificationId);
  }
}
