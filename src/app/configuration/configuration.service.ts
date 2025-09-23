import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CafipConfiguration {
  apiUrl: string;
  appName: string;
  version: string;
  features: {
    darkMode: boolean;
    notifications: boolean;
    analytics: boolean;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configSubject = new BehaviorSubject<CafipConfiguration>(this.getDefaultConfig());
  
  constructor() {}

  /**
   * Obtiene la configuración actual como Observable
   */
  getConfiguration$(): Observable<CafipConfiguration> {
    return this.configSubject.asObservable();
  }

  /**
   * Obtiene la configuración actual de forma síncrona
   */
  getConfiguration(): CafipConfiguration {
    return this.configSubject.value;
  }

  /**
   * Actualiza la configuración
   */
  updateConfiguration(config: Partial<CafipConfiguration>): void {
    const currentConfig = this.configSubject.value;
    const updatedConfig = {
      ...currentConfig,
      ...config,
      features: { ...currentConfig.features, ...config.features },
      theme: { ...currentConfig.theme, ...config.theme }
    };
    this.configSubject.next(updatedConfig);
    this.saveToLocalStorage(updatedConfig);
  }

  /**
   * Carga configuración desde localStorage
   */
  loadFromLocalStorage(): void {
    const stored = localStorage.getItem('cafip-configuration');
    if (stored) {
      try {
        const config = JSON.parse(stored);
        this.configSubject.next({ ...this.getDefaultConfig(), ...config });
      } catch (error) {
        console.warn('Error loading configuration from localStorage:', error);
      }
    }
  }

  /**
   * Guarda configuración en localStorage
   */
  private saveToLocalStorage(config: CafipConfiguration): void {
    try {
      localStorage.setItem('cafip-configuration', JSON.stringify(config));
    } catch (error) {
      console.warn('Error saving configuration to localStorage:', error);
    }
  }

  /**
   * Resetea la configuración a valores por defecto
   */
  resetToDefault(): void {
    const defaultConfig = this.getDefaultConfig();
    this.configSubject.next(defaultConfig);
    this.saveToLocalStorage(defaultConfig);
  }

  /**
   * Configuración por defecto
   */
  private getDefaultConfig(): CafipConfiguration {
    return {
      apiUrl: 'https://api.cafip.com',
      appName: 'CAFIP Configuration',
      version: '1.0.0',
      features: {
        darkMode: false,
        notifications: true,
        analytics: false
      },
      theme: {
        primaryColor: '#1976d2',
        secondaryColor: '#424242',
        fontFamily: 'Roboto, sans-serif'
      }
    };
  }
}