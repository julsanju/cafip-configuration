import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface FieldConfig {
  name: string;
  label: string;
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'textarea'
    | 'select'
    | 'searchable-select'
    | 'checkbox'
    | 'date'
    | 'file';
  placeholder?: string;
  required?: boolean;
  options?: { value: any; label: string }[]; // para select
  defaultValue?: any;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

@Component({
  selector: 'app-data-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './data-modal.html',
  styleUrls: ['./data-modal.scss'],
})
export class DataModal implements OnChanges {
  @Input() isOpen = false;
  @Input() title = 'Formulario';
  @Input() description?: string;
  @Input() fields: FieldConfig[] = [];

  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  form: FormGroup;
  
  // Para searchable select
  searchTerms: { [key: string]: string } = {};
  filteredOptions: { [key: string]: { value: any; label: string }[] } = {};
  showDropdown: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges() {
    if (this.fields?.length) {
      this.buildForm();
      this.initializeSearchableSelects();
    }
  }

  private buildForm() {
    const group: any = {};
    this.fields.forEach((field) => {
      const validators = [];
      
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.validation) {
        if (field.validation.minLength) {
          validators.push(Validators.minLength(field.validation.minLength));
        }
        if (field.validation.maxLength) {
          validators.push(Validators.maxLength(field.validation.maxLength));
        }
        if (field.validation.pattern) {
          validators.push(Validators.pattern(field.validation.pattern));
        }
        if (field.validation.min) {
          validators.push(Validators.min(field.validation.min));
        }
        if (field.validation.max) {
          validators.push(Validators.max(field.validation.max));
        }
      }
      
      group[field.name] = [
        field.defaultValue || (field.type === 'checkbox' ? false : ''),
        validators.length > 0 ? Validators.compose(validators) : []
      ];
    });
    this.form = this.fb.group(group);
  }

  handleFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    this.form.patchValue({ [fieldName]: file });
    this.form.get(fieldName)?.updateValueAndValidity();
  }

  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
      this.close();
    }
  }

  close() {
    this.closed.emit();
  }

  private initializeSearchableSelects() {
    this.fields.forEach(field => {
      if (field.type === 'searchable-select' && field.options) {
        this.searchTerms[field.name] = '';
        this.filteredOptions[field.name] = field.options;
        this.showDropdown[field.name] = false;
      }
    });
  }

  onSearchableSelectSearch(fieldName: string, searchTerm: string) {
    this.searchTerms[fieldName] = searchTerm;
    const field = this.fields.find(f => f.name === fieldName);
    if (field?.options) {
      this.filteredOptions[fieldName] = field.options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.showDropdown[fieldName] = true;
  }

  onSearchableSelectSelect(fieldName: string, option: { value: any; label: string }) {
    this.form.patchValue({ [fieldName]: option.value });
    this.searchTerms[fieldName] = option.label;
    this.showDropdown[fieldName] = false;
  }

  // Método para establecer el valor del searchable select desde el componente padre
  setSearchableSelectValue(fieldName: string, value: any, label: string) {
    this.form.patchValue({ [fieldName]: value });
    this.searchTerms[fieldName] = label;
  }

  onSearchableSelectFocus(fieldName: string) {
    this.showDropdown[fieldName] = true;
  }

  onSearchableSelectBlur(fieldName: string) {
    // Delay para permitir click en opciones
    setTimeout(() => {
      this.showDropdown[fieldName] = false;
    }, 200);
  }
}
