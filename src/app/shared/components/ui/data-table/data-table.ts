import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableColumn } from './models/table-column';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss']
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() canEditKey: string = 'canEdit';
  @Input() canDeleteKey: string = 'canDelete';
  @Input() itemsPerPage: number = 10;
  @Input() scrollableKeys: string[] = []; // keys de columnas con scroll
  @Input() hideScrollbar: boolean = false; // oculta barra (incluye flechas) conservando scroll
  @Input() pageSizes: number[] = [4, 8, 12];
  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  // Exponer Math a la plantilla
  protected readonly Math = Math;
  
  // Paginación
  currentPage = 1;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onRemove(row: any) {
    this.remove.emit(row);
  }

  goToFirstPage() {
    this.currentPage = 1;
  }

  goToLastPage() {
    this.currentPage = this.totalPages();
  }

  onItemsPerPageChange(newSize: number) {
    const parsed = Number(newSize);
    if (!isNaN(parsed) && parsed > 0) {
      this.itemsPerPage = parsed;
      this.currentPage = 1;
    }
  }

}
