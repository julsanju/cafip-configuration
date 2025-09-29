import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DataTableComponent } from '../../../../shared/components/ui/data-table/data-table';
import { TableColumn } from '../../../../shared/components/ui/data-table/models/table-column';
import { DataModal, FieldConfig } from '../../../../shared/components/ui/data-modal/data-modal';
import { NotificationService } from '../../../../core/services/notification.service';
import { NotificationContainerComponent } from '../../../../shared/components/ui/notification/notification-container';
import { ConfirmationModalComponent, ConfirmationConfig } from '../../../../shared/components/ui/confirmation-modal/confirmation-modal';
import { FilterConfig } from '../../../../shared/components/ui/filter-modal/filter-modal';
import { BienesServiciosService } from './services/bienes-servicios.service';
import { BienesServiciosResponse, BienServicioPrivado, BienServicioPublicoCreate } from './models/bienes-servicios.model';

@Component({
  selector: 'app-catalogo-bienes-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableComponent, DataModal, NotificationContainerComponent, ConfirmationModalComponent],
  templateUrl: './catalogo-bienes-servicios.html',
  styleUrls: ['./catalogo-bienes-servicios.scss']
})
export class CatalogoBienesServicios implements OnInit {
  protected readonly Object = Object;

  columns: TableColumn[] = [
    { key: 'grupo', label: 'Grupo' },
    { key: 'codigoSegmento', label: 'Seg. (código)' },
    { key: 'nombreSegmento', label: 'Segmento' },
    { key: 'codigoFamilia', label: 'Fam. (código)' },
    { key: 'nombreFamilia', label: 'Familia' },
    { key: 'codigoClase', label: 'Clase (código)' },
    { key: 'nombreClase', label: 'Clase' },
    { key: 'codigoProducto', label: 'Prod. (código)' },
    { key: 'nombreProducto', label: 'Producto' }
  ];

  // Datos
  items: any[] = [];
  filteredItems: any[] = [];
  privadas: BienServicioPrivado[] = [];

  // Modal
  showModal = false;
  modalTitle = 'Añadir Bien/Servicio';
  modalMode: 'add' | 'edit' = 'add';
  modalFields: FieldConfig[] = [];
  editingItem: any = null;

  // Confirmación
  showConfirmation = false;
  confirmationConfig: ConfirmationConfig = {
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que quieres eliminar este registro?',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'danger',
    showIcon: true
  };
  itemToDelete: any = null;

  // Búsqueda/Filtros
  searchTerm = '';
  showFilter = false;
  filterForm: FormGroup;
  activeFilters: { [key: string]: any } = {};
  filterConfig: FilterConfig = {
    fields: [
      { key: 'grupo', label: 'Grupo', type: 'text', placeholder: 'Buscar por grupo...' },
      { key: 'nombreSegmento', label: 'Segmento', type: 'text', placeholder: 'Buscar por segmento...' },
      { key: 'nombreFamilia', label: 'Familia', type: 'text', placeholder: 'Buscar por familia...' },
      { key: 'nombreClase', label: 'Clase', type: 'text', placeholder: 'Buscar por clase...' }
    ],
    showReset: true,
    showApply: true,
    showCancel: true
  };

  // Paginación backend
  page = 1;
  limit = 4;
  totalPages = 1;
  totalItems = 0;

  constructor(
    private service: BienesServiciosService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.filterForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.fetchData();
    this.buildFilterForm();
  }

  fetchData() {
    this.service.list(this.page, this.limit).subscribe((resp: BienesServiciosResponse) => {
      const privadas = (resp?.privadas ?? []).map(p => ({ ...p, tipo: 'privada', canEdit: false, canDelete: false }));
      const publicas = (resp?.publicas ?? []).map(pu => ({ ...pu, tipo: 'publica', canEdit: !!pu.habilitado, canDelete: !!pu.habilitado }));
      this.items = [...privadas, ...publicas];
      this.filteredItems = [...this.items];
      this.privadas = privadas;
      this.totalPages = resp?.meta?.pagesPrivadas || 1;
      this.totalItems = resp?.meta?.totalPrivadas || this.items.length;
      this.buildModalFields();
      this.cdr.detectChanges();
    });
  }

  // UI actions
  onSearch() { this.applyFilters(); }
  toggleFilter() { this.showFilter = !this.showFilter; }
  onApplyFilter() { this.activeFilters = this.getActiveFilters(); this.applyFilters(); }
  onResetFilter() { this.filterForm.reset(); this.activeFilters = {}; this.searchTerm = ''; this.filteredItems = [...this.items]; }

  private buildFilterForm() {
    const group: any = {};
    this.filterConfig.fields.forEach(f => group[f.key] = ['']);
    this.filterForm = this.fb.group(group);
  }

  private getActiveFilters(): { [key: string]: any } {
    const active: { [key: string]: any } = {};
    const formValue = this.filterForm.value;
    Object.keys(formValue).forEach(key => {
      const value = formValue[key];
      if (value && value.toString().trim() !== '') active[key] = value.toString().trim();
    });
    return active;
  }

  private applyFilters() {
    let filtered = [...this.items];
    if (this.searchTerm && this.searchTerm.trim()) {
      filtered = filtered.filter(item => this.columns.some(col => item[col.key]?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())));
    }
    if (Object.keys(this.activeFilters).length > 0) {
      filtered = filtered.filter(item => Object.keys(this.activeFilters).every(key => {
        const fv = this.activeFilters[key];
        const iv = item[key];
        if (!fv) return true;
        if (!iv) return false;
        return iv.toString().toLowerCase().includes(fv.toString().toLowerCase());
      }));
    }
    this.filteredItems = filtered;
  }

  // Modal
  openAddModal() {
    this.editingItem = null;
    this.modalMode = 'add';
    this.modalTitle = 'Añadir Bien/Servicio';
    this.buildModalFields();
    this.showModal = true;
  }

  onEdit(row: any) {
    this.editingItem = row;
    this.modalMode = 'edit';
    this.modalTitle = 'Editar Bien/Servicio';
    this.buildModalFields();
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  buildModalFields() {
    this.modalFields = [
      { name: 'grupo', label: 'Grupo', type: 'text', required: true, placeholder: 'Ingrese el grupo', defaultValue: this.editingItem?.grupo || '' },
      { name: 'codigoSegmento', label: 'Código Segmento', type: 'text', required: true, placeholder: 'Código del segmento', defaultValue: this.editingItem?.codigoSegmento || '' },
      { name: 'nombreSegmento', label: 'Nombre Segmento', type: 'text', required: true, placeholder: 'Nombre del segmento', defaultValue: this.editingItem?.nombreSegmento || '' },
      { name: 'codigoFamilia', label: 'Código Familia', type: 'text', required: true, placeholder: 'Código de la familia', defaultValue: this.editingItem?.codigoFamilia || '' },
      { name: 'nombreFamilia', label: 'Nombre Familia', type: 'text', required: true, placeholder: 'Nombre de la familia', defaultValue: this.editingItem?.nombreFamilia || '' },
      { name: 'codigoClase', label: 'Código Clase', type: 'text', required: true, placeholder: 'Código de la clase', defaultValue: this.editingItem?.codigoClase || '' },
      { name: 'nombreClase', label: 'Nombre Clase', type: 'text', required: true, placeholder: 'Nombre de la clase', defaultValue: this.editingItem?.nombreClase || '' },
      { name: 'codigoProducto', label: 'Código Producto', type: 'text', required: true, placeholder: 'Código del producto', defaultValue: this.editingItem?.codigoProducto || '' },
      { name: 'nombreProducto', label: 'Nombre Producto', type: 'text', required: true, placeholder: 'Nombre del producto', defaultValue: this.editingItem?.nombreProducto || '' },
      {
        name: 'dependeDeId',
        label: 'Depende de (privado)',
        type: 'searchable-select',
        required: true,
        placeholder: 'Buscar registro privado...',
        defaultValue: this.editingItem?.dependeDeId || null,
        options: this.privadas.map(p => ({ value: p.id, label: `${p.nombreProducto} (${p.codigoProducto})` }))
      }
    ];
  }

  onModalSubmit(data: any) {
    if (this.modalMode === 'add') {
      const payload: BienServicioPublicoCreate = {
        grupo: data.grupo,
        codigoSegmento: data.codigoSegmento,
        nombreSegmento: data.nombreSegmento,
        codigoFamilia: data.codigoFamilia,
        nombreFamilia: data.nombreFamilia,
        codigoClase: data.codigoClase,
        nombreClase: data.nombreClase,
        codigoProducto: data.codigoProducto,
        nombreProducto: data.nombreProducto,
        dependeDeId: data.dependeDeId,
        habilitado: true
      };
      this.service.create(payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Creado', 'Registro creado correctamente', 3000); });
    } else {
      const id = this.editingItem.id;
      const payload = {
        grupo: data.grupo,
        codigoSegmento: data.codigoSegmento,
        nombreSegmento: data.nombreSegmento,
        codigoFamilia: data.codigoFamilia,
        nombreFamilia: data.nombreFamilia,
        codigoClase: data.codigoClase,
        nombreClase: data.nombreClase,
        codigoProducto: data.codigoProducto,
        nombreProducto: data.nombreProducto,
        dependeDeId: data.dependeDeId,
        habilitado: this.editingItem?.habilitado ?? true
      };
      this.service.update(id, payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Actualizado', 'Registro actualizado correctamente', 3000); });
    }
  }

  // Eliminar
  onRemove(row: any) {
    this.itemToDelete = row;
    this.confirmationConfig = { title: 'Confirmar eliminación', message: `¿Eliminar "${row.nombreProducto}"?`, confirmText: 'Eliminar', cancelText: 'Cancelar', type: 'danger', showIcon: true };
    this.showConfirmation = true;
  }
  onConfirmDelete() { if (this.itemToDelete) { this.service.delete(this.itemToDelete.id).subscribe(() => { this.fetchData(); this.notificationService.success('Eliminado', 'Registro eliminado', 3000); this.closeConfirmation(); }); } }
  onCancelDelete() { this.closeConfirmation(); }
  closeConfirmation() { this.showConfirmation = false; this.itemToDelete = null; }

  // Controles de paginación (backend)
  canPrev(): boolean { return this.page > 1; }
  canNext(): boolean { return this.page < this.totalPages; }
  prevPage() { if (this.canPrev()) { this.page--; this.fetchData(); } }
  nextPage() { if (this.canNext()) { this.page++; this.fetchData(); } }
  goToPage(page: number) {
    const p = Math.max(1, Math.min(this.totalPages, page));
    if (p !== this.page) { this.page = p; this.fetchData(); }
  }
  changeLimit(newLimit: number) {
    this.limit = newLimit;
    this.page = 1;
    this.fetchData();
  }
}
