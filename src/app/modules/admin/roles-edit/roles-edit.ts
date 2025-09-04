import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentsModule } from '@shared/components/components-module';
import { AlertService } from '@shared/services/alert.service';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-roles-edit',
  imports: [CommonModule, FormsModule, ComponentsModule],
  templateUrl: './roles-edit.html',
})
export class RolesEdit {
  filters: any = [
    {
      value: '0001',
      label: '1. หน้าหลัก'
    },
    {
      value: '0002',
      label: '2. งบประจำปี'
    },
    {
      value: '0003',
      label: '3. งบระหว่างปี'
    },
    {
      value: '0004',
      label: '4. การตั้งค่าระบบ'
    }
  ]
  menus: any = [
    {
      id: '0001',
      label: '1. หน้าหลัก',
      children: [
        { id: '000101', label: '1.1 Dashboard' },
      ]
    },
    {
      id: '0002',
      label: '2. งบประจำปี',
      children: [
        { id: '000201', label: '2.1 Budget Overview', checked: true },
        { id: '000202', label: '2.2 Budget Details', checked: false },
      ]
    },
    {
      id: '0003',
      label: '3. งบระหว่างปี',
      children: [
        { id: '000301', label: '3.1 Mid-Year Review' },
        { id: '000302', label: '3.2 Adjustments' },
      ]
    },
    {
      id: '0004',
      label: '4. การตั้งค่าระบบ',
      children: [
        { id: '000401', label: '4.1 ผู้ใช้งาน', checked: true },
        {
          id: '000402',
          label: '4.2 สิทธิ์การเข้าถึง',
          checked: true,
          children: [
            { id: '00040201', label: '4.2.1 View Access', checked: true },
            { id: '00040202', label: '4.2.2 Edit Access', checked: false },
          ]
        },
      ]
    }
  ]

  status: any[] = [
    {
      value: 'Y',
      label: 'ใช้งาน'
    },
    {
      value: 'N',
      label: 'ไม่ใช้งาน'
    }
  ]

  filter: any[] = []

  constructor(private router: Router, private modalService: ModalService, private alertService: AlertService) { }

  gotoMain() {
    this.router.navigate(['/admin/roles']);
  }

  save() {
    this.modalService.confirm('ยืนยันการบันทึกข้อมูล', 'คุณต้องการยืนยันการบันทึกข้อมูลที่สร้างใหม่นี้หรือไม่?').then(result => {
      if (result) {
        // TODO: Implement save logic
        this.alertService.success('บันทึกสำเร็จ!');
      }
    });
  }
}
