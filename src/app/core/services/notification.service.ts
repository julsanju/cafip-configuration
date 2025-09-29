import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationConfig } from '../../shared/components/ui/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<NotificationConfig[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private notificationIdCounter = 0;

  private generateId(): string {
    return `notification-${++this.notificationIdCounter}-${Date.now()}`;
  }

  private addNotification(config: Omit<NotificationConfig, 'id'>): string {
    const id = this.generateId();
    const notification: NotificationConfig = {
      id,
      showCloseButton: true,
      duration: 5000, // 5 segundos por defecto
      ...config
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    return id;
  }

  // Métodos de conveniencia
  success(title: string, message: string, duration?: number): string {
    return this.addNotification({
      type: 'success',
      title,
      message,
      duration
    });
  }

  error(title: string, message: string, duration?: number): string {
    return this.addNotification({
      type: 'error',
      title,
      message,
      duration: duration || 0 // Los errores no se cierran automáticamente por defecto
    });
  }

  warning(title: string, message: string, duration?: number): string {
    return this.addNotification({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  info(title: string, message: string, duration?: number): string {
    return this.addNotification({
      type: 'info',
      title,
      message,
      duration
    });
  }

  // Método genérico
  show(config: Omit<NotificationConfig, 'id'>): string {
    return this.addNotification(config);
  }

  // Remover notificación
  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  // Limpiar todas las notificaciones
  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  // Limpiar por tipo
  clearByType(type: NotificationConfig['type']): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.type !== type);
    this.notificationsSubject.next(filteredNotifications);
  }
}
