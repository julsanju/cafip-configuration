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
import { CiudadesDepartamentosService } from './services/ciudades-departamentos.service';
import { CiudadesDepartamentosResponse, CiudadDepartamentoPrivada, CiudadDepartamentoPublicaCreate } from './models/ciudades-departamentos.model';

@Component({
  selector: 'app-catalogo-departamento-ciudades',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableComponent, DataModal, NotificationContainerComponent, ConfirmationModalComponent],
  templateUrl: './catalogo-departamento-ciudades.html',
  styleUrls: ['./catalogo-departamento-ciudades.scss']
})
export class CatalogoDepartamentoCiudades implements OnInit {
  protected readonly Object = Object;

  columns: TableColumn[] = [
    { key: 'departamento', label: 'Departamento' },
    { key: 'codigo_municipio', label: 'Código', align: 'center' },
    { key: 'nombre_municipio', label: 'Municipio' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'total', label: 'Total', align: 'center' }
  ];

  items: any[] = [];
  filteredItems: any[] = [];
  privadas: CiudadDepartamentoPrivada[] = [];
  itemsPerPage = 4;

  // Filtros
  searchTerm = '';
  showFilter = false;
  filterForm: FormGroup;
  activeFilters: { [key: string]: any } = {};
  filterConfig: FilterConfig = {
    fields: [
      { key: 'departamento', label: 'Departamento', type: 'text', placeholder: 'Buscar por departamento...' },
      { key: 'nombre_municipio', label: 'Municipio', type: 'text', placeholder: 'Buscar por municipio...' },
      { key: 'codigo_municipio', label: 'Código', type: 'text', placeholder: 'Buscar por código...' }
    ],
    showApply: true,
    showCancel: true,
    showReset: true
  };

  // Modal
  showModal = false;
  modalTitle = 'Añadir Ciudad/Municipio';
  modalMode: 'add' | 'edit' = 'add';
  modalFields: FieldConfig[] = [];
  editingItem: any = null;

  // Confirmación
  showConfirmation = false;
  confirmationConfig: ConfirmationConfig = { title: 'Confirmar eliminación', message: '¿Eliminar registro?', confirmText: 'Eliminar', cancelText: 'Cancelar', type: 'danger', showIcon: true };
  itemToDelete: any = null;

  constructor(
    private service: CiudadesDepartamentosService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { this.filterForm = this.fb.group({}); }

  ngOnInit(): void {
    this.fetchData();
    this.buildFilterForm();
  }

  fetchData() {
    this.service.list(1, this.itemsPerPage).subscribe((resp: CiudadesDepartamentosResponse) => {
      const privadas = (resp?.privadas ?? []).map(p => ({ ...p, tipo: 'privada', canEdit: false, canDelete: false }));
      const publicas = (resp?.publicas ?? []).map(pu => ({ ...pu, tipo: 'publica', canEdit: !!pu.habilitado, canDelete: !!pu.habilitado }));
      this.items = [...privadas, ...publicas];
      this.filteredItems = [...this.items];
      this.privadas = privadas;
      this.buildModalFields();
      this.cdr.detectChanges();
    });
  }

  // Filtros
  onSearch() { this.applyFilters(); }
  toggleFilter() { this.showFilter = !this.showFilter; }
  onApplyFilter() { this.activeFilters = this.getActiveFilters(); this.applyFilters(); }
  onResetFilter() { this.filterForm.reset(); this.activeFilters = {}; this.searchTerm = ''; this.filteredItems = [...this.items]; }
  private buildFilterForm() { const g: any = {}; this.filterConfig.fields.forEach(f => g[f.key] = ['']); this.filterForm = this.fb.group(g); }
  private getActiveFilters() { const active: any = {}; const v = this.filterForm.value; Object.keys(v).forEach(k => { const val = v[k]; if (val) active[k] = val.toString().trim(); }); return active; }
  private applyFilters() { let filtered = [...this.items]; if (this.searchTerm?.trim()) filtered = filtered.filter(i => this.columns.some(c => i[c.key]?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))); if (Object.keys(this.activeFilters).length) filtered = filtered.filter(i => Object.keys(this.activeFilters).every(k => i[k]?.toString().toLowerCase().includes(this.activeFilters[k].toLowerCase()))); this.filteredItems = filtered; }

  // Modal
  openAddModal() { this.editingItem = null; this.modalMode = 'add'; this.modalTitle = 'Añadir Ciudad/Municipio'; this.buildModalFields(); this.showModal = true; }
  onEdit(row: any) { this.editingItem = row; this.modalMode = 'edit'; this.modalTitle = 'Editar Ciudad/Municipio'; this.buildModalFields(); this.showModal = true; }
  closeModal() { this.showModal = false; }
  buildModalFields() {
    this.modalFields = [
      { name: 'departamento', label: 'Departamento', type: 'text', required: true, placeholder: 'Departamento', defaultValue: this.editingItem?.departamento || '' },
      { name: 'ciudades', label: 'Ciudad', type: 'text', required: true, placeholder: 'Ciudad', defaultValue: this.editingItem?.ciudades || '' },
      { name: 'provincia', label: 'Provincia', type: 'text', required: true, placeholder: 'Provincia', defaultValue: this.editingItem?.provincia || '' },
      { name: 'codigo_municipio', label: 'Código', type: 'text', required: true, placeholder: 'Código municipio', defaultValue: this.editingItem?.codigo_municipio || '' },
      { name: 'nombre_municipio', label: 'Nombre Municipio', type: 'text', required: true, placeholder: 'Nombre municipio', defaultValue: this.editingItem?.nombre_municipio || '' },
      { name: 'nombre', label: 'Nombre', type: 'text', required: true, placeholder: 'Nombre', defaultValue: this.editingItem?.nombre || '' },
      { name: 'total', label: 'Total', type: 'number', required: true, placeholder: 'Total', defaultValue: this.editingItem?.total ?? 0 },
      { name: 'dependeDeId', label: 'Depende de (privado)', type: 'searchable-select', required: true, placeholder: 'Buscar privado...', defaultValue: this.editingItem?.dependeDeId || null, options: this.privadas.map(p => ({ value: p.id, label: `${p.departamento} - ${p.nombre_municipio} (${p.codigo_municipio})` })) }
    ];
  }

  onModalSubmit(data: any) {
    if (this.modalMode === 'add') {
      const payload: CiudadDepartamentoPublicaCreate = {
        departamento: data.departamento,
        ciudades: data.ciudades,
        provincia: data.provincia,
        codigo_municipio: data.codigo_municipio,
        nombre_municipio: data.nombre_municipio,
        nombre: data.nombre,
        total: Number(data.total),
        dependeDeId: data.dependeDeId,
        habilitado: true
      };
      this.service.create(payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Creado', 'Registro creado', 3000); });
    } else {
      const id = this.editingItem.id; const payload = {
        departamento: data.departamento,
        ciudades: data.ciudades,
        provincia: data.provincia,
        codigo_municipio: data.codigo_municipio,
        nombre_municipio: data.nombre_municipio,
        nombre: data.nombre,
        total: Number(data.total),
        dependeDeId: data.dependeDeId,
        habilitado: this.editingItem?.habilitado ?? true
      };
      this.service.update(id, payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Actualizado', 'Registro actualizado', 3000); });
    }
  }

  // Eliminar
  onRemove(row: any) { this.itemToDelete = row; this.confirmationConfig = { ...this.confirmationConfig, message: `¿Eliminar "${row.nombre}"?` }; this.showConfirmation = true; }
  onConfirmDelete() { if (this.itemToDelete) { this.service.delete(this.itemToDelete.id).subscribe(() => { this.fetchData(); this.notificationService.success('Eliminado', 'Registro eliminado', 3000); this.closeConfirmation(); }); } }
  onCancelDelete() { this.closeConfirmation(); }
  closeConfirmation() { this.showConfirmation = false; this.itemToDelete = null; }
}
