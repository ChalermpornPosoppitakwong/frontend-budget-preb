import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsModule } from '@shared/components/components-module';

@Component({
  selector: 'app-roles',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './roles.html',
})
export class Roles implements OnInit {
  @ViewChild('actions', { static: true }) actions!: TemplateRef<any>;

  constructor(private router: Router) { }

  headers: any[] = [];
  selectedRole: any[] = [];
  data: any[] = [];
  loading = true;

  ngOnInit() {
    this.headers = [
      { title: 'Role Name', key: 'name', width: '300', align: 'center', sortable: true },
      { title: 'Role description', key: 'description', sortable: true, align: 'center' },
      { title: 'Create Update', key: 'createdAt', width: '160', align: 'center', sortable: true },
      { title: 'Last Update', key: 'updatedAt', width: '160', align: 'center', sortable: true },
      { title: 'Edit', slot: this.actions, width: '80', align: 'center' }
    ];

    this.data = [
      { id: '1', name: 'Admin', description: 'Administrator role', createdAt: '2023-01-01', updatedAt: '2023-01-02', actions: 'Edit' },
      { id: '2', name: 'User', description: 'Standard user role', createdAt: '2023-01-01', updatedAt: '2023-01-02', actions: 'Edit' }
    ];
  }



  onSelectionChange(selected: any) {
    this.selectedRole = selected;
  }

  onEdit(row: any) {
    this.router.navigate(['/admin/roles/edit', row.id]);
  }

  onCreate() {
    this.router.navigate(['/admin/roles/create']);
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
