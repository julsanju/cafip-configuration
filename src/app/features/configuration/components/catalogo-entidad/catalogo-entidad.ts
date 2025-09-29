import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { EntidadService } from './services/entidad.service';
import { EntidadesResponse, EntidadPublicaCreate } from './models/entidad-publica.model';
import { EntidadPrivada } from './models/entidad-privada.model';
import { DataTableComponent } from '../../../../shared/components/ui/data-table/data-table';
import { TableColumn } from '../../../../shared/components/ui/data-table/models/table-column';
import { DataModal, FieldConfig } from '../../../../shared/components/ui/data-modal/data-modal';
import { NotificationService } from '../../../../core/services/notification.service';
import { NotificationContainerComponent } from '../../../../shared/components/ui/notification/notification-container';
import { ConfirmationModalComponent, ConfirmationConfig } from '../../../../shared/components/ui/confirmation-modal/confirmation-modal';
import { FilterConfig, FilterField } from '../../../../shared/components/ui/filter-modal/filter-modal';

@Component({
  selector: 'app-catalogo-entidad',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableComponent, DataModal, NotificationContainerComponent, ConfirmationModalComponent],
  templateUrl: './catalogo-entidad.html',
  styleUrl: './catalogo-entidad.scss'
})
export class CatalogoEntidad implements OnInit, OnChanges {
  // Exponer Object para usar en el template
  protected readonly Object = Object;
  
  entidades: any[] = [];
  filteredEntidades: any[] = [];
  columns: TableColumn[] = [
    { key: 'municipio', label: 'Municipio' },
    { key: 'nitFse', label: 'NIT/FSE' },
    { key: 'nombreEstablecimiento', label: 'Nombre' },
    { key: 'email', label: 'Email' }
  ];

  // Modal
  showModal = false;
  modalTitle = 'Añadir Entidad Pública';
  modalMode: 'add' | 'edit' = 'add';
  entidadesPrivadas: any[] = [];
  modalFields: FieldConfig[] = [];
  editingEntity: any = null;

  // Confirmation Modal
  showConfirmation = false;
  confirmationConfig: ConfirmationConfig = {
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que quieres eliminar esta entidad?',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'danger',
    showIcon: true
  };
  entityToDelete: any = null;

  // Search and Filter
  searchTerm: string = '';
  showFilter = false;
  filterForm: FormGroup;
  activeFilters: { [key: string]: any } = {};

  // Filter Config
  filterConfig: FilterConfig = {
    fields: [
      {
        key: 'municipio',
        label: 'Municipio',
        type: 'text',
        placeholder: 'Buscar por municipio...'
      },
      {
        key: 'nitFse',
        label: 'NIT/FSE',
        type: 'text',
        placeholder: 'Buscar por NIT o FSE...'
      },
      {
        key: 'nombreEstablecimiento',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Buscar por nombre...'
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text',
        placeholder: 'Buscar por email...'
      }
    ],
    showReset: true,
    showApply: true,
    showCancel: true
  };

  constructor(
    private entidadService: EntidadService, 
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({});
  }

  ngOnInit() {
    this.obtenerEntidades();
    this.buildModalFields();
    this.buildFilterForm();
  }

  ngOnChanges() {
    this.buildFilterForm();
  }

  obtenerEntidades() {
    this.entidadService.getEntidades().subscribe((data: EntidadesResponse) => {
      const privadas = (data?.privadas ?? []).map(p => ({
        id: p.id,
        municipio: p.municipio,
        nitFse: p.nitFse,
        nombreEstablecimiento: p.nombreEstablecimiento,
        email: p.email,
        tipo: 'privada',
        canEdit: false,
        canDelete: false
      }));

      const publicas = (data?.publicas ?? []).map(pu => ({
        id: pu.id,
        municipio: pu.municipio,
        nitFse: pu.nitFse,
        nombreEstablecimiento: pu.nombreEstablecimiento,
        email: pu.email,
        dependeDeId: pu.dependeDeId,
        tipo: 'publica',
        canEdit: !!pu.habilitado,
        canDelete: !!pu.habilitado
      }));

      this.entidades = [...privadas, ...publicas];
      this.filteredEntidades = [...this.entidades];
      this.entidadesPrivadas = privadas; // Guardar entidades privadas para el select
      this.buildModalFields(); // Reconstruir campos del modal con las entidades privadas
      this.cdr.detectChanges();
    });
  }

  onEdit(row: any) {
    console.log('editar', row);
    this.editingEntity = row;
    this.modalMode = 'edit';
    this.modalTitle = 'Editar Entidad Pública';
    this.buildModalFields();
    this.showModal = true;
    
    // Establecer el valor del searchable select después de que se construya el modal
    setTimeout(() => {
      const entidadPrivada = this.entidadesPrivadas.find(privada => privada.id === row.dependeDeId);
      if (entidadPrivada) {
        const label = `${entidadPrivada.nombreEstablecimiento} (${entidadPrivada.municipio})`;
        // Aquí necesitaríamos acceso al modal component para establecer el valor
        // Por ahora, el defaultValue debería funcionar
      }
    }, 100);
  }

  onRemove(row: any) {
    console.log('eliminar', row);
    this.entityToDelete = row;
    this.confirmationConfig = {
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar "${row.nombreEstablecimiento}"?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'danger',
      showIcon: true
    };
    this.showConfirmation = true;
  }

  onConfirmDelete() {
    if (this.entityToDelete) {
      this.entidadService.deleteEntidadPublica(this.entityToDelete.id).subscribe({
        next: () => {
          console.log('Entidad eliminada exitosamente');
          this.obtenerEntidades(); // Recargar datos
          this.notificationService.success(
            'Entidad eliminada',
            `"${this.entityToDelete.nombreEstablecimiento}" ha sido eliminada exitosamente`,
            3000 // 3 segundos
          );
          this.closeConfirmation();
        },
        error: (error) => {
          console.error('Error al eliminar entidad:', error);
          this.notificationService.error(
            'Error al eliminar',
            'No se pudo eliminar la entidad. Por favor, inténtalo de nuevo.',
            5000 // 5 segundos
          );
          this.closeConfirmation();
        }
      });
    }
  }

  onCancelDelete() {
    this.closeConfirmation();
  }

  closeConfirmation() {
    this.showConfirmation = false;
    this.entityToDelete = null;
  }

  // Search and Filter Methods
  onSearch() {
    this.applyFilters();
    console.log('Búsqueda realizada:', this.searchTerm);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onApplyFilter() {
    const activeFilters = this.getActiveFilters();
    this.activeFilters = activeFilters;
    this.applyFilters();
    // Mantener el filtro visible después de aplicar
    console.log('Filtros aplicados:', activeFilters);
  }

  onResetFilter() {
    this.filterForm.reset();
    this.activeFilters = {};
    this.searchTerm = '';
    this.filteredEntidades = [...this.entidades];
    console.log('Filtros limpiados - Mostrando todas las entidades:', this.filteredEntidades.length);
  }

  private buildFilterForm() {
    const group: any = {};
    this.filterConfig.fields.forEach(field => {
      group[field.key] = [''];
    });
    this.filterForm = this.fb.group(group);
  }

  private getActiveFilters(): { [key: string]: any } {
    const activeFilters: { [key: string]: any } = {};
    const formValue = this.filterForm.value;
    
    Object.keys(formValue).forEach(key => {
      const value = formValue[key];
      if (value && value.toString().trim() !== '') {
        activeFilters[key] = value.toString().trim();
      }
    });

    return activeFilters;
  }

  private applyFilters() {
    let filtered = [...this.entidades];

    // Aplicar búsqueda global
    if (this.searchTerm && this.searchTerm.trim()) {
      filtered = filtered.filter(item => {
        return this.columns.some(col => {
          const value = item[col.key];
          if (!value) return false;
          return value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      });
    }

    // Aplicar filtros específicos
    if (Object.keys(this.activeFilters).length > 0) {
      filtered = filtered.filter(item => {
        return Object.keys(this.activeFilters).every(key => {
          const filterValue = this.activeFilters[key];
          const itemValue = item[key];
          
          if (!filterValue || filterValue === '') return true; // Si no hay filtro, no filtrar
          if (!itemValue) return false;
          
          return itemValue.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
        });
      });
    }

    this.filteredEntidades = filtered;
    console.log('Filtros aplicados:', {
      searchTerm: this.searchTerm,
      activeFilters: this.activeFilters,
      totalItems: this.entidades.length,
      filteredItems: filtered.length
    });
  }

  openAddModal() {
    this.editingEntity = null;
    this.modalMode = 'add';
    this.modalTitle = 'Añadir Entidad Pública';
    this.buildModalFields();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  buildModalFields() {
    this.modalFields = [
      { 
        name: 'municipio', 
        label: 'Municipio', 
        type: 'text', 
        required: true, 
        placeholder: 'Ingrese el municipio',
        defaultValue: this.editingEntity?.municipio || '',
        validation: {
          minLength: 2,
          maxLength: 100,
          pattern: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$'
        }
      },
      { 
        name: 'nitFse', 
        label: 'NIT/FSE', 
        type: 'text', 
        required: true, 
        placeholder: 'Ingrese el NIT o FSE',
        defaultValue: this.editingEntity?.nitFse || '',
        validation: {
          minLength: 6,
          maxLength: 20,
          pattern: '^[0-9]+$'
        }
      },
      { 
        name: 'nombreEstablecimiento', 
        label: 'Nombre del Establecimiento', 
        type: 'text', 
        required: true, 
        placeholder: 'Ingrese el nombre',
        defaultValue: this.editingEntity?.nombreEstablecimiento || '',
        validation: {
          minLength: 5,
          maxLength: 200
        }
      },
      { 
        name: 'email', 
        label: 'Email', 
        type: 'email', 
        required: true, 
        placeholder: 'Ingrese el email',
        defaultValue: this.editingEntity?.email || '',
        validation: {
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        }
      },
      { 
        name: 'dependeDeId', 
        label: 'Depende de Entidad Privada', 
        type: 'searchable-select', 
        required: true, 
        placeholder: 'Buscar entidad privada...',
        defaultValue: this.editingEntity?.dependeDeId || null,
        options: this.entidadesPrivadas.map(privada => ({
          value: privada.id,
          label: `${privada.nombreEstablecimiento} (${privada.municipio})`
        }))
      },
    ];
  }

  onModalSubmit(data: any) {
    console.log('Datos del modal:', data);
    
    if (this.modalMode === 'add') {
      this.createEntidadPublica(data);
    } else {
      this.updateEntidadPublica(data);
    }
  }

  private createEntidadPublica(data: any) {
    // Preparar datos para la petición POST
    const entidadPublicaData: EntidadPublicaCreate = {
      municipio: data.municipio,
      nitFse: data.nitFse,
      nombreEstablecimiento: data.nombreEstablecimiento,
      email: data.email,
      dependeDeId: data.dependeDeId, // ID de la entidad privada seleccionada
      habilitado: true // Por defecto habilitado
    };

    console.log('Datos para POST:', entidadPublicaData);
    
    // Llamar al servicio para crear la entidad pública
    this.entidadService.createEntidadPublica(entidadPublicaData).subscribe({
      next: (response) => {
        console.log('Entidad creada exitosamente:', response);
        this.obtenerEntidades(); // Recargar datos
        this.closeModal();
        this.notificationService.success(
          'Entidad creada',
          `"${entidadPublicaData.nombreEstablecimiento}" ha sido creada exitosamente`,
          3000 // 3 segundos
        );
      },
      error: (error) => {
        console.error('Error al crear entidad:', error);
        this.notificationService.error(
          'Error al crear',
          'No se pudo crear la entidad. Por favor, verifica los datos e inténtalo de nuevo.',
          5000 // 5 segundos
        );
      }
    });
  }

  private updateEntidadPublica(data: any) {
    // Preparar datos para la petición PATCH
    const entidadPublicaData = {
      municipio: data.municipio,
      nitFse: data.nitFse,
      nombreEstablecimiento: data.nombreEstablecimiento,
      email: data.email,
      dependeDeId: data.dependeDeId,
      habilitado: this.editingEntity?.habilitado || true // Mantener estado actual
    };

    console.log('Datos para PATCH:', entidadPublicaData);
    
    // Llamar al servicio para actualizar la entidad pública
    this.entidadService.updateEntidadPublica(this.editingEntity.id, entidadPublicaData).subscribe({
      next: (response) => {
        console.log('Entidad actualizada exitosamente:', response);
        this.obtenerEntidades(); // Recargar datos
        this.closeModal();
        this.notificationService.success(
          'Entidad actualizada',
          `"${entidadPublicaData.nombreEstablecimiento}" ha sido actualizada exitosamente`,
          3000 // 3 segundos
        );
      },
      error: (error) => {
        console.error('Error al actualizar entidad:', error);
        this.notificationService.error(
          'Error al actualizar',
          'No se pudo actualizar la entidad. Por favor, verifica los datos e inténtalo de nuevo.',
          5000 // 5 segundos
        );
      }
    });
  }

  
}
