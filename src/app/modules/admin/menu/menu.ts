import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentsModule } from "@shared/components/components-module";
import { ModalService } from '@shared/services/modal.service';
import { MenuManage } from '../menu-manage/menu-manage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [ComponentsModule, CommonModule],
  templateUrl: './menu.html',
  styles: ``
})
export class Menu {
  hovered: boolean = false;

  menus: any = []

  constructor(private modalService: ModalService, private router: Router) { }

  onSearch() {
    // Implement search logic here

    this.menus = [
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
          { id: '000201', label: '2.1 Budget Overview' },
          { id: '000202', label: '2.2 Budget Details' },
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
          { id: '000401', label: '4.1 ผู้ใช้งาน' },
          {
            id: '000402',
            label: '4.2 สิทธิ์การเข้าถึง',
            checked: true,
            children: [
              { id: '00040201', label: '4.2.1 View Access' },
              { id: '00040202', label: '4.2.2 Edit Access' },
            ]
          },
        ]
      }
    ]
  }

  onDeleteMenu(node: any) {
    // Implement delete logic here
    this.modalService.delete().then((confirmed) => {
      if (confirmed) {
        // Remove the node from the menu
      }
    });
  }

  onCopyMenu(node: any) {
    // Implement copy logic here
    this.modalService.confirm('คุณต้องการทำสำเนารายการนี้ใช่หรือไม่?', '').then((confirmed) => {
      if (confirmed) {
        // Perform the copy operation
      }
    });
  }

  onCreateMenu() {
    // Implement create logic here
    this.modalService.openCustom(MenuManage, { title: 'สร้าง เมนูระบบ', outputs: ['save'] }).then((result) => {
      if (result) {
        // Perform the create operation
      }
    });
  }

  onEditMenu(node: any) {
    // Implement edit logic here

    this.modalService.openCustom(MenuManage, { title: 'แก้ไข เมนูระบบ', outputs: ['save'] }).then((result) => {
      if (result) {
        // Perform the edit operation
      }
    });
  }

  onApiMenu(node: any) {
    // Implement API logic here
    this.router.navigate(['/admin/menu/api']);
  }
}
