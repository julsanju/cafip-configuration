import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DataTableComponent } from '../../../../shared/components/ui/data-table/data-table';
import { TableColumn } from '../../../../shared/components/ui/data-table/models/table-column';
import { DataModal, FieldConfig } from '../../../../shared/components/ui/data-modal/data-modal';
import { NotificationContainerComponent } from '../../../../shared/components/ui/notification/notification-container';
import { NotificationService } from '../../../../core/services/notification.service';
import { ConfirmationModalComponent, ConfirmationConfig } from '../../../../shared/components/ui/confirmation-modal/confirmation-modal';
import { FilterConfig } from '../../../../shared/components/ui/filter-modal/filter-modal';
import { PresupuestoService } from './services/presupuesto.service';
import { PresupuestoResponse, PresupuestoPrivado, PresupuestoPublicoCreate } from './models/presupuesto.model';

@Component({
  selector: 'app-catalogo-presupuesto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableComponent, DataModal, NotificationContainerComponent, ConfirmationModalComponent],
  templateUrl: './catalogo-presupuesto.html',
  styleUrls: ['./catalogo-presupuesto.scss']
})
export class CatalogoPresupuesto implements OnInit {
  protected readonly Object = Object;

  columns: TableColumn[] = [
    { key: 'cuenta', label: 'Cuenta' },
    { key: 'concepto', label: 'Concepto' },
    { key: 'nivel', label: 'Nivel' },
    { key: 'clase', label: 'Clase' }
  ];

  items: any[] = [];
  filteredItems: any[] = [];
  privadas: PresupuestoPrivado[] = [];

  // UI state
  itemsPerPage = 4;
  searchTerm = '';
  showFilter = false;
  filterForm: FormGroup;
  activeFilters: { [key: string]: any } = {};
  filterConfig: FilterConfig = {
    fields: [
      { key: 'cuenta', label: 'Cuenta', type: 'text', placeholder: 'Buscar por cuenta...' },
      { key: 'concepto', label: 'Concepto', type: 'text', placeholder: 'Buscar por concepto...' },
      { key: 'clase', label: 'Clase', type: 'text', placeholder: 'Buscar por clase...' },
      { key: 'nivel', label: 'Nivel', type: 'number', placeholder: 'Buscar por nivel...' }
    ],
    showApply: true,
    showCancel: true,
    showReset: true
  };

  // Modal
  showModal = false;
  modalTitle = 'Añadir Presupuesto';
  modalMode: 'add' | 'edit' = 'add';
  modalFields: FieldConfig[] = [];
  editingItem: any = null;

  // Confirmación
  showConfirmation = false;
  confirmationConfig: ConfirmationConfig = {
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de eliminar este registro?',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'danger',
    showIcon: true
  };
  itemToDelete: any = null;

  constructor(
    private service: PresupuestoService,
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
    this.service.list(1, this.itemsPerPage).subscribe((resp: PresupuestoResponse) => {
      const privadas = (resp?.privadas ?? []).map(p => ({ ...p, tipo: 'privada', canEdit: false, canDelete: false }));
      const publicas = (resp?.publicas ?? []).map(pu => ({ ...pu, tipo: 'publica', canEdit: !!pu.habilitado, canDelete: !!pu.habilitado }));
      this.items = [...privadas, ...publicas];
      this.filteredItems = [...this.items];
      this.privadas = privadas;
      this.buildModalFields();
      this.cdr.detectChanges();
    });
  }

  // Filtro/búsqueda
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
      if (value !== '' && value !== null && value !== undefined) active[key] = value.toString().trim();
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
    this.modalTitle = 'Añadir Presupuesto';
    this.buildModalFields();
    this.showModal = true;
  }

  onEdit(row: any) {
    this.editingItem = row;
    this.modalMode = 'edit';
    this.modalTitle = 'Editar Presupuesto';
    this.buildModalFields();
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  buildModalFields() {
    this.modalFields = [
      { name: 'cuenta', label: 'Cuenta', type: 'text', required: true, placeholder: 'Ej: 2.1.1.1.01', defaultValue: this.editingItem?.cuenta || '' },
      { name: 'concepto', label: 'Concepto', type: 'text', required: true, placeholder: 'Ej: Jornales', defaultValue: this.editingItem?.concepto || '' },
      { name: 'nivel', label: 'Nivel', type: 'number', required: true, placeholder: 'Ej: 5', defaultValue: this.editingItem?.nivel ?? 0 },
      { name: 'clase', label: 'Clase', type: 'text', required: true, placeholder: 'Ej: GASTOS', defaultValue: this.editingItem?.clase || '' },
      {
        name: 'depende_de', label: 'Depende de (privada)', type: 'searchable-select', required: true, placeholder: 'Buscar cuenta privada...',
        defaultValue: this.editingItem?.depende_de || null,
        options: this.privadas.map(p => ({ value: p.id, label: `${p.cuenta} - ${p.concepto}` }))
      }
    ];
  }

  onModalSubmit(data: any) {
    if (this.modalMode === 'add') {
      const payload: PresupuestoPublicoCreate = {
        cuenta: data.cuenta,
        concepto: data.concepto,
        nivel: Number(data.nivel),
        clase: data.clase,
        depende_de: data.depende_de,
        habilitado: true
      };
      this.service.create(payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Creado', 'Registro creado', 3000); });
    } else {
      const id = this.editingItem.id;
      const payload = {
        cuenta: data.cuenta,
        concepto: data.concepto,
        nivel: Number(data.nivel),
        clase: data.clase,
        depende_de: data.depende_de,
        habilitado: this.editingItem?.habilitado ?? true
      };
      this.service.update(id, payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Actualizado', 'Registro actualizado', 3000); });
    }
  }

  // Eliminar
  onRemove(row: any) {
    this.itemToDelete = row;
    this.confirmationConfig = { title: 'Confirmar eliminación', message: `¿Eliminar "${row.concepto}"?`, confirmText: 'Eliminar', cancelText: 'Cancelar', type: 'danger', showIcon: true };
    this.showConfirmation = true;
  }
  onConfirmDelete() { if (this.itemToDelete) { this.service.delete(this.itemToDelete.id).subscribe(() => { this.fetchData(); this.notificationService.success('Eliminado', 'Registro eliminado', 3000); this.closeConfirmation(); }); } }
  onCancelDelete() { this.closeConfirmation(); }
  closeConfirmation() { this.showConfirmation = false; this.itemToDelete = null; }
}
