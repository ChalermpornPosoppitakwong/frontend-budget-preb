import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsModule } from '@shared/components/components-module';
import { AlertService } from '@shared/services/alert.service';
import { ModalService } from '@shared/services/modal.service';

@Component({
  selector: 'app-roles-edit',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './roles-edit.html',
})
export class RolesEdit {
  menus: any = [
    {
      id: '0001',
      name: '1. หน้าหลัก'
    },
    {
      id: '0002',
      name: '2. งบประจำปี'
    },
    {
      id: '0003',
      name: '3. งบระหว่างปี'
    },
    {
      id: '0004',
      name: '4. การตั้งค่าระบบ'
    }
  ]

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
