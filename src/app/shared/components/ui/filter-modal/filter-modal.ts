import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

export interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number';
  placeholder?: string;
  options?: { value: any; label: string }[];
}

export interface FilterConfig {
  title?: string;
  fields: FilterField[];
  showReset?: boolean;
  showApply?: boolean;
  showCancel?: boolean;
}

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-modal.html',
  styleUrls: ['./filter-modal.scss']
})
export class FilterModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() config: FilterConfig = {
    fields: [],
    showReset: true,
    showApply: true,
    showCancel: true
  };

  @Output() applied = new EventEmitter<any>();
  @Output() reset = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({});
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges() {
    this.buildForm();
  }

  private buildForm() {
    const group: any = {};
    this.config.fields.forEach(field => {
      group[field.key] = [''];
    });
    this.filterForm = this.fb.group(group);
  }

  onApply() {
    const activeFilters = this.getActiveFilters();
    this.applied.emit(activeFilters);
  }

  onReset() {
    this.filterForm.reset();
    this.reset.emit();
  }

  onClose() {
    this.closed.emit();
  }

  private getActiveFilters(): { [key: string]: any } {
    const activeFilters: { [key: string]: any } = {};
    const formValue = this.filterForm.value;
    
    Object.keys(formValue).forEach(key => {
      const value = formValue[key];
      if (value !== '' && value !== null && value !== undefined) {
        activeFilters[key] = value;
      }
    });

    return activeFilters;
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.getActiveFilters()).length > 0;
  }
}
