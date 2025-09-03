import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../icon/icon';
import { Checkbox } from "../checkbox/checkbox";
import { Select } from '../select/select';
import { Radio } from '../radio/radio';

export interface ITableHeader {
    title: string;
    key?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    slot?: TemplateRef<any>;
    sortable?: boolean;
}

export interface ISelectOption {
    label: string;
    value: any;
}


@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  imports: [CommonModule, FormsModule, Icon, Checkbox, Select, Radio],
  host: { class: 'overflow-x-auto pt-2 block w-full' }
})
export class Table implements OnInit {
  @Input() headers: ITableHeader[] = [];
  @Input() data: any[] = [];
  @Input() selectionType: 'checkbox' | 'radio' | null = null;
  @Input() totalItems: number = 0;
  @Input() pageSizeOptions: ISelectOption[] = [10, 20, 50, 100].map(n => ({ label: n.toString(), value: n }));
  @Input() pageSize: number = this.pageSizeOptions[0].value;
  @Input() loading: boolean = false; // ✅ ใช้สำหรับ Skeleton

  // 👉 default sort option
  @Input() defaultSortKey?: string;
  @Input() defaultSortDirection: 'asc' | 'desc' = 'asc';

  @Output() selectionChange = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{ key: string; direction: 'asc' | 'desc' }>();

  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  selectedRow: any;
  currentPage: any;
  allSelectedValue: any;

  // จำนวนแถว skeleton
  skeletonRows = Array.from({ length: 5 });

  ngOnInit(): void {
    this.selectedRow = null;
    this.currentPage = 1;
    this.allSelectedValue = false;

    // 1. ใช้ defaultSortKey ที่ส่งมา
    if (this.defaultSortKey) {
      this.sortKey = this.defaultSortKey;
      this.sortDirection = this.defaultSortDirection;
    } else {
      // 2. หา column แรกที่ sortable
      const firstSortable = this.headers.find(h => h.sortable && h.key);
      if (firstSortable) {
        this.sortKey = firstSortable.key!;
        this.sortDirection = this.defaultSortDirection;
      }
    }

    // emit ค่า default ออกไป
    if (this.sortKey) {
      this.sortChange.emit({ key: this.sortKey, direction: this.sortDirection });
    }
  }

  someSelectedButNotAll(): boolean {
    const selectedCount = this.data.filter(r => r.selected).length;
    return selectedCount > 0 && selectedCount < this.data.length;
  }

  updateAllSelectedValue() {
    const selectedCount = this.data.filter(r => r.selected).length;
    this.allSelectedValue = selectedCount === this.data.length;
  }

  toggleAll(checked: boolean) {
    if (!this.selectionType) return;
    this.data.forEach(row => row.selected = checked);
    this.selectionChange.emit(this.getSelectedRows());
  }

  onSelectionChange(row: any) {
    if (this.selectionType === 'radio') {
      this.selectedRow = row;
      this.selectionChange.emit(row);
    } else if (this.selectionType === 'checkbox') {
      this.updateAllSelectedValue();
      this.selectionChange.emit(this.getSelectedRows());
    }
  }

  allSelected(): boolean {
    return this.data.length > 0 && this.data.every(row => row.selected);
  }

  getSelectedRows() {
    return this.data.filter(row => row.selected);
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = +pageSize;
    this.currentPage = 1;
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit(this.currentPage);
  }

  goToFirst() {
    if (this.currentPage === 1) return;
    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
  }

  goToPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToNext() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToLast() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage = totalPages;
      this.pageChange.emit(this.currentPage);
    }
  }

  onSort(header: ITableHeader) {
    if (!header.key || !header.sortable) return;

    if (this.sortKey === header.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = header.key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({ key: header.key, direction: this.sortDirection });
  }
}
