import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsModule } from '@shared/components/components-module';
import { ModalService } from '@shared/services/modal.service';
import { MenuApiManage } from '../menu-api-manage/menu-api-manage';

@Component({
  selector: 'app-menu-api',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './menu-api.html',
  styles: ``
})
export class MenuApi implements OnInit {
  @ViewChild('actions', { static: true }) actions!: TemplateRef<any>;
  @ViewChild('no', { static: true }) no!: TemplateRef<any>;
  @ViewChild('status', { static: true }) status!: TemplateRef<any>;

  constructor(private modalService: ModalService) { }

  headers: any[] = [];
  selectedRole: any[] = [];
  data: any[] = [];
  loading = true;

  ngOnInit() {
    this.headers = [
      { title: 'ลำดับ', slot: this.no, width: '80', align: 'center' },
      { title: 'Request URL', key: 'url', sortable: true },
      { title: 'Status', slot: this.status, width: '160', sortable: true, align: 'center' },
      { title: 'Create Update', key: 'createdAt', width: '160', align: 'center', sortable: true },
      { title: 'Last Update', key: 'updatedAt', width: '160', align: 'center', sortable: true },
      { title: 'Edit', slot: this.actions, width: '80', align: 'center' }
    ];

    this.data = [
      { id: '1', url: '/api/aim-service/bpt1', status: 'ใช้งาน', createdAt: '2023-01-01', updatedAt: '2023-01-02', actions: 'Edit' },
      { id: '2', url: '/api/aim-service/bpt2', status: 'ไม่ใช้งาน', createdAt: '2023-01-01', updatedAt: '2023-01-02', actions: 'Edit' }
    ];
  }



  onSelectionChange(selected: any) {
    this.selectedRole = selected;
  }

  onEdit(row: any) {
    this.modalService.openCustom(MenuApiManage, { title: 'เพิ่ม/แก้ไขเมนู API', outputs: ['save'] }).then((result) => {
      if (result) {
        // Update the row data with the result from the modal
      }
    });
  }

  onCreate() {
    this.modalService.openCustom(MenuApiManage, { title: 'เพิ่ม/แก้ไขเมนู API', outputs: ['save'] }).then((result) => {
      if (result) {
        // Update the row data with the result from the modal
      }
    });
  }

  onSortChange(event: { key: string; direction: 'asc' | 'desc' }) {
    this.loading = true
    const { key, direction } = event;

    setTimeout(() => {
      this.data = [...this.data].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      });

      this.loading = false;
    }, 2000)
  }
}
