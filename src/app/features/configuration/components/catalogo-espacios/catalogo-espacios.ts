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
import { EspaciosService } from './services/espacios.service';
import { EspaciosResponse, EspacioPrivado, EspacioPublicoCreate } from './models/espacio.model';

@Component({
  selector: 'app-catalogo-espacios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableComponent, DataModal, NotificationContainerComponent, ConfirmationModalComponent],
  templateUrl: './catalogo-espacios.html',
  styleUrls: ['./catalogo-espacios.scss']
})
export class CatalogoEspacios implements OnInit {
  protected readonly Object = Object;

  columns: TableColumn[] = [
    { key: 'codigo', label: 'Código', align: 'left' },
    { key: 'dependencia', label: 'Dependencia', align: 'center' }
  ];

  items: any[] = [];
  filteredItems: any[] = [];
  privadas: EspacioPrivado[] = [];
  itemsPerPage = 4;

  // Filtros
  searchTerm = '';
  showFilter = false;
  filterForm: FormGroup;
  activeFilters: { [key: string]: any } = {};
  filterConfig: FilterConfig = {
    fields: [
      { key: 'codigo', label: 'Código', type: 'text', placeholder: 'Buscar por código...' },
      { key: 'dependencia', label: 'Dependencia', type: 'text', placeholder: 'Buscar por dependencia...' }
    ],
    showApply: true,
    showCancel: true,
    showReset: true
  };

  // Modal
  showModal = false;
  modalTitle = 'Añadir Espacio';
  modalMode: 'add' | 'edit' = 'add';
  modalFields: FieldConfig[] = [];
  editingItem: any = null;

  // Confirmación
  showConfirmation = false;
  confirmationConfig: ConfirmationConfig = { title: 'Confirmar eliminación', message: '¿Eliminar espacio?', confirmText: 'Eliminar', cancelText: 'Cancelar', type: 'danger', showIcon: true };
  itemToDelete: any = null;

  constructor(
    private service: EspaciosService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { this.filterForm = this.fb.group({}); }

  ngOnInit(): void {
    this.fetchData();
    this.buildFilterForm();
  }

  fetchData() {
    this.service.list(1, this.itemsPerPage).subscribe((resp: EspaciosResponse) => {
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
  openAddModal() { this.editingItem = null; this.modalMode = 'add'; this.modalTitle = 'Añadir Espacio'; this.buildModalFields(); this.showModal = true; }
  onEdit(row: any) { this.editingItem = row; this.modalMode = 'edit'; this.modalTitle = 'Editar Espacio'; this.buildModalFields(); this.showModal = true; }
  closeModal() { this.showModal = false; }
  buildModalFields() {
    this.modalFields = [
      { name: 'codigo', label: 'Código', type: 'text', required: true, placeholder: 'Código', defaultValue: this.editingItem?.codigo || '' },
      { name: 'dependencia', label: 'Dependencia', type: 'text', required: true, placeholder: 'Dependencia', defaultValue: this.editingItem?.dependencia || '' },
      { name: 'dependeDeId', label: 'Depende de (privado)', type: 'searchable-select', required: true, placeholder: 'Buscar espacio privado...', defaultValue: this.editingItem?.depende_de || null, options: this.privadas.map(p => ({ value: p.id, label: `${p.codigo} - ${p.dependencia}` })) }
    ];
  }

  onModalSubmit(data: any) {
    if (this.modalMode === 'add') {
      const payload: EspacioPublicoCreate = { codigo: data.codigo, dependencia: data.dependencia, dependeDeId: data.dependeDeId, habilitado: true };
      this.service.create(payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Creado', 'Espacio creado', 3000); });
    } else {
      const id = this.editingItem.id; const payload = { codigo: data.codigo, dependencia: data.dependencia, dependeDeId: data.dependeDeId, habilitado: this.editingItem?.habilitado ?? true };
      this.service.update(id, payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Actualizado', 'Espacio actualizado', 3000); });
    }
  }

  // Eliminar
  onRemove(row: any) { this.itemToDelete = row; this.confirmationConfig = { ...this.confirmationConfig, message: `¿Eliminar "${row.dependencia}"?` }; this.showConfirmation = true; }
  onConfirmDelete() { if (this.itemToDelete) { this.service.delete(this.itemToDelete.id).subscribe(() => { this.fetchData(); this.notificationService.success('Eliminado', 'Espacio eliminado', 3000); this.closeConfirmation(); }); } }
  onCancelDelete() { this.closeConfirmation(); }
  closeConfirmation() { this.showConfirmation = false; this.itemToDelete = null; }
}
