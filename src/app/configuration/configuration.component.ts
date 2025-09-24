import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService, CafipConfiguration } from './configuration.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly configurationService = inject(ConfigurationService);
  private readonly destroy$ = new Subject<void>();

  configForm!: FormGroup;
  configData: CafipConfiguration | null = null;

  ngOnInit(): void {
    this.configurationService.loadFromLocalStorage();

    this.configurationService.getConfiguration$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => {
        this.configData = config;
        this.initForm(config);
      });
  }

  private initForm(config: CafipConfiguration): void {
    this.configForm = this.fb.group({
      appName: [config.appName],
      apiUrl: [config.apiUrl],
      version: [config.version],
      features: this.fb.group({
        darkMode: [config.features.darkMode],
        notifications: [config.features.notifications],
        analytics: [config.features.analytics]
      }),
      theme: this.fb.group({
        primaryColor: [config.theme.primaryColor],
        secondaryColor: [config.theme.secondaryColor],
        fontFamily: [config.theme.fontFamily]
      })
    });

    this.configForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.configurationService.updateConfiguration(value));
  }

  resetToDefault(): void {
    this.configurationService.resetToDefault();
  }

  exportConfiguration(): void {
    if (this.configData) {
      const dataStr = JSON.stringify(this.configForm.value, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = 'cafip-configuration.json';
      link.click();
    }
  }

  getConfigJson(): string {
    return this.configForm?.value ? JSON.stringify(this.configForm.value, null, 2) : '{}';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
