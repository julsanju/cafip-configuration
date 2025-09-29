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
import { DocumentacionMinimaService } from './services/documentacion-minima.service';
import { DocMinResponse, DocMinPrivada, DocMinPublicaCreate } from './models/documentacion-minima.model';

@Component({
  selector: 'app-catalogo-documentacion-minima',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableComponent, DataModal, NotificationContainerComponent, ConfirmationModalComponent],
  templateUrl: './catalogo-documentacion-minima.html',
  styleUrls: ['./catalogo-documentacion-minima.scss']
})
export class CatalogoDocumentacionMinima implements OnInit {
  protected readonly Object = Object;

  columns: TableColumn[] = [
    { key: 'item', label: 'Item', align: 'left' },
    { key: 'requisito', label: 'Requisito' },
    { key: 'persona_natural_label', label: 'Persona natural', align: 'center' },
    { key: 'persona_juridica_label', label: 'Persona jurídica', align: 'center' }
  ];

  items: any[] = [];
  filteredItems: any[] = [];
  privadas: DocMinPrivada[] = [];
  itemsPerPage = 4;

  // Filtros
  searchTerm = '';
  showFilter = false;
  filterForm: FormGroup;
  activeFilters: { [key: string]: any } = {};
  filterConfig: FilterConfig = {
    fields: [
      { key: 'item', label: 'Item', type: 'text', placeholder: 'Buscar por item...' },
      { key: 'requisito', label: 'Requisito', type: 'text', placeholder: 'Buscar por requisito...' }
    ],
    showApply: true,
    showCancel: true,
    showReset: true
  };

  // Modal
  showModal = false;
  modalTitle = 'Añadir Documentación mínima';
  modalMode: 'add' | 'edit' = 'add';
  modalFields: FieldConfig[] = [];
  editingItem: any = null;

  // Confirmación
  showConfirmation = false;
  confirmationConfig: ConfirmationConfig = { title: 'Confirmar eliminación', message: '¿Eliminar requisito?', confirmText: 'Eliminar', cancelText: 'Cancelar', type: 'danger', showIcon: true };
  itemToDelete: any = null;

  constructor(
    private service: DocumentacionMinimaService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { this.filterForm = this.fb.group({}); }

  ngOnInit(): void {
    this.fetchData();
    this.buildFilterForm();
  }

  fetchData() {
    this.service.list(1, this.itemsPerPage).subscribe((resp: DocMinResponse) => {
      const privadas = (resp?.privadas ?? []).map(p => ({
        ...p,
        persona_natural_label: p.persona_natural ? 'Aplica' : '—',
        persona_juridica_label: p.persona_juridica ? 'Aplica' : '—',
        tipo: 'privada',
        canEdit: false,
        canDelete: false
      }));
      const publicas = (resp?.publicas ?? []).map(pu => ({
        ...pu,
        persona_natural_label: pu.persona_natural ? 'Aplica' : '—',
        persona_juridica_label: pu.persona_juridica ? 'Aplica' : '—',
        tipo: 'publica',
        canEdit: !!pu.habilitado,
        canDelete: !!pu.habilitado
      }));
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
  openAddModal() { this.editingItem = null; this.modalMode = 'add'; this.modalTitle = 'Añadir Documentación mínima'; this.buildModalFields(); this.showModal = true; }
  onEdit(row: any) { this.editingItem = row; this.modalMode = 'edit'; this.modalTitle = 'Editar Documentación mínima'; this.buildModalFields(); this.showModal = true; }
  closeModal() { this.showModal = false; }
  buildModalFields() {
    this.modalFields = [
      { name: 'item', label: 'Item', type: 'text', required: true, placeholder: 'Item', defaultValue: this.editingItem?.item || '' },
      { name: 'requisito', label: 'Requisito', type: 'textarea', required: true, placeholder: 'Requisito', defaultValue: this.editingItem?.requisito || '' },
      { name: 'persona', label: 'Persona', type: 'checkbox', defaultValue: this.editingItem?.persona || false },
      { name: 'persona_juridica', label: 'Persona Jurídica', type: 'checkbox', defaultValue: this.editingItem?.persona_juridica || false },
      { name: 'persona_natural', label: 'Persona Natural', type: 'checkbox', defaultValue: this.editingItem?.persona_natural || false },
      { name: 'dependeDeId', label: 'Depende de (privado)', type: 'searchable-select', required: true, placeholder: 'Buscar requisito privado...', defaultValue: this.editingItem?.depende_de || null, options: this.privadas.map(p => ({ value: p.id, label: `${p.item} - ${p.requisito.substring(0, 40)}...` })) }
    ];
  }

  onModalSubmit(data: any) {
    if (this.modalMode === 'add') {
      const payload: DocMinPublicaCreate = { item: data.item, requisito: data.requisito, persona: !!data.persona, persona_juridica: !!data.persona_juridica, persona_natural: !!data.persona_natural, dependeDeId: data.dependeDeId, habilitado: true };
      this.service.create(payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Creado', 'Requisito creado', 3000); });
    } else {
      const id = this.editingItem.id; const payload = { item: data.item, requisito: data.requisito, persona: !!data.persona, persona_juridica: !!data.persona_juridica, persona_natural: !!data.persona_natural, dependeDeId: data.dependeDeId, habilitado: this.editingItem?.habilitado ?? true };
      this.service.update(id, payload).subscribe(() => { this.fetchData(); this.closeModal(); this.notificationService.success('Actualizado', 'Requisito actualizado', 3000); });
    }
  }

  // Eliminar
  onRemove(row: any) { this.itemToDelete = row; this.confirmationConfig = { ...this.confirmationConfig, message: `¿Eliminar ítem "${row.item}"?` }; this.showConfirmation = true; }
  onConfirmDelete() { if (this.itemToDelete) { this.service.delete(this.itemToDelete.id).subscribe(() => { this.fetchData(); this.notificationService.success('Eliminado', 'Requisito eliminado', 3000); this.closeConfirmation(); }); } }
  onCancelDelete() { this.closeConfirmation(); }
  closeConfirmation() { this.showConfirmation = false; this.itemToDelete = null; }
}
