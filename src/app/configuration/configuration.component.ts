import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService, CafipConfiguration } from './configuration.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  config: CafipConfiguration | null = null;
  private destroy$ = new Subject<void>();

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    // Cargar configuración desde localStorage al inicializar
    this.configurationService.loadFromLocalStorage();
    
    // Suscribirse a cambios de configuración
    this.configurationService.getConfiguration$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => {
        this.config = config;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateConfig(): void {
    if (this.config) {
      this.configurationService.updateConfiguration(this.config);
    }
  }

  resetToDefault(): void {
    this.configurationService.resetToDefault();
  }

  exportConfiguration(): void {
    if (this.config) {
      const dataStr = JSON.stringify(this.config, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = 'cafip-configuration.json';
      link.click();
    }
  }

  getConfigJson(): string {
    return this.config ? JSON.stringify(this.config, null, 2) : '{}';
  }
}