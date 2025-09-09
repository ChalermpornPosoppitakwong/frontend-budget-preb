import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeRoutingModule } from '@modules/home/home-routing-module';
import { ComponentsModule } from '@shared/components/components-module';

@Component({
  selector: 'app-main-layout',
  imports: [HomeRoutingModule, RouterOutlet, CommonModule, FormsModule, ComponentsModule],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  userDropdownOpen = false;
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  menuItems = [
    {
      title: 'หน้าหลัก',
      path: '/home',
      icon: 'home',
      submenu: [
        { title: 'Dashboard ข้อมูลการทำงาน', icon: 'element-plus', path: '/#' },
        { title: 'ข่าวประชาสัมพันธ์', icon: 'element-plus', path: '/' },
      ]
    },
    {
      title: 'งบประมาณประจำปี',
      path: '/budget-year',
      icon: 'start-year',
      submenu: [
        { title: 'Download/Upload งบประมาณตั้งต้น', icon: 'element-plus', path: '/#' },
        { title: 'รับส่งข้อมูลงบประมาณ', icon: 'element-plus', path: '/#' },
        { title: 'Sync ข้อมูล​ค่าใช้จ่ายที่เกิดขึ้นจริง ERP', icon: 'element-plus', path: '/#' },
        {
          title: 'บันทึกเสนอขอ/แก้ไขงบประมาณ​',
          icon: 'element-plus',
          submenu: [
            { title: 'ค่าใช้จ่าย', path: '/#' },
            { title: 'ทรัพย์สิน', path: '/#' },
          ]
        },
        { title: 'สรุปคำของบฯ ของหน่วยงาน', icon: 'element-plus', path: '/#' },
        { title: 'สรุปสถานะการส่งคำของบประมาณ', icon: 'element-plus', path: '/#' },
        {
          title: 'จัดการสถานะการส่งใบคำขอ',
          icon: 'element-plus',
          submenu: [
            { title: 'แก้ไขสถานะ', path: '/#' },
          ]
        },
        { title: 'Adhoc ต้นปี', icon: 'element-plus', path: '/#' },
        { title: 'รายงาน', icon: 'element-plus', path: '/#' },
        { title: 'Generate File ส่งออก', icon: 'element-plus', path: '/#' },
        { title: 'Interface งบต้นปี EPBCS', icon: 'element-plus', path: '/#' },
        { title: 'รับแบบอนุมัติงบประมาณปีปัจจุบัน', icon: 'element-plus', path: '/#' },
        { title: 'บันทึกแก้ไขรายละเอียด Procurement Plan​', icon: 'element-plus', path: '/#' },
      ]
    },
    {
      title: 'งบประมาณระหว่างปี',
      path: '/cost-center-chain',
      icon: 'coins',
      submenu: [
        {
          title: 'แบบฟอร์มการขออนุมัติเพิ่มงบประมาณ',
          icon: 'element-plus',
          submenu: [
            { title: 'บันทึก', path: '/#' },
            { title: 'แก้ไข', path: '/#' },
            { title: 'บันทึกและส่งคำขอ', path: '/#' },
            { title: 'ยกเลิก', path: '/#' },
            { title: 'ขอเอกสารเพิ่มเติม', path: '/#' },
            { title: 'อนุมัติ', path: '/#' },
            { title: 'ส่งกลับแก้ไข', path: '/#' },
          ]
        },
        {
          title: 'บันทึกจัดสรร/โอนงบประมาณ​',
          icon: 'element-plus',
          submenu: [
            { title: 'บันทึก', path: '/#' },
            { title: 'บันทึกและส่่งต่อ', path: '/#' },
            { title: 'แก้ไข', path: '/#' },
            { title: 'Map Group Mail', path: '/#' },
            { title: 'Approve', path: '/#' },
            { title: 'Reject', path: '/#' },
            { title: 'ยกเลิกจัดสรร', path: '/#' },
            { title: 'Review', path: '/#' },
            { title: 'Qualify', path: '/#' },
            { title: 'Delete', path: '/#' },
            { title: 'Tab หน่วยงานทั้งประเทศ', path: '/#' },
            { title: 'ส่งคำขอยกเลิก', path: '/#' },
          ]
        },
        {
          title: 'จัดสรรทรัพย์สิน [FA]',
          icon: 'element-plus',
          submenu: [
            { title: 'บันทึก', path: '/#' },
            { title: 'บันทึกและส่่งต่อ', path: '/#' },
            { title: 'แก้ไข', path: '/#' },
            { title: 'Map Group Mail', path: '/#' },
            { title: 'Approve', path: '/#' },
            { title: 'Reject', path: '/#' },
            { title: 'ยกเลิกจัดสรร', path: '/#' },
            { title: 'Review', path: '/#' },
            { title: 'Qualify', path: '/#' },
            { title: 'Delete', path: '/#' },
            { title: 'Tab หน่วยงานทั้งประเทศ', path: '/#' },
            { title: 'ส่งคำขอยกเลิก', path: '/#' },
          ]
        },
        {
          title: 'โอนค่าใช้จ่าย [GE] และ ทรัพย์สิน [FA]',
          icon: 'element-plus',
          submenu: [
            { title: 'บันทึก', path: '/#' },
            { title: 'บันทึกและส่่งต่อ', path: '/#' },
            { title: 'แก้ไข', path: '/#' },
            { title: 'Map Group Mail', path: '/#' },
            { title: 'Approve', path: '/#' },
            { title: 'Reject', path: '/#' },
            { title: 'ยกเลิกจัดสรร', path: '/#' },
            { title: 'Review', path: '/#' },
            { title: 'Qualify', path: '/#' },
            { title: 'Delete', path: '/#' },
            { title: 'ส่งคำขอยกเลิก', path: '/#' },
          ]
        },
        {
          title: 'Revision Budget',
          icon: 'element-plus',
          submenu: [
            { title: 'บันทึก', path: '/#' },
            { title: 'บันทึกและส่่งต่อ', path: '/#' },
            { title: 'แก้ไข', path: '/#' },
            { title: 'Approve', path: '/#' },
            { title: 'Reject', path: '/#' },
            { title: 'ยกเลิกจัดสรร/ยกเลิกโอน', path: '/#' },
            { title: 'Qualify', path: '/#' },
            { title: 'Delete', path: '/#' },
          ]
        },
        {
          title: 'รายการงาน',
          icon: 'element-plus',
          submenu: [
            {
              title: 'รายการทำงาน', path: '/#'
            },
          ]
        },
        { title: 'จัดการ Adhoc งบประมาณระหว่างปี', icon: 'element-plus', path: '/#' },
        { title: 'ข่าวประชาสัมพันธ์', icon: 'element-plus', path: '/#' },
      ]
    },
    {
      title: 'รายงาน',
      icon: 'gui-management',
      path: '/reports',
      submenu: [
        { title: 'งบประมาณประจำปี', icon: 'element-plus', path: '/#' },
        { title: 'งบประมาณระหว่างปี', icon: 'element-plus', path: '/#' }
      ]
    },
    {
      title: 'การจัดการระบบ',
      path: '/admin',
      icon: 'gui-management',
      submenu: [
        {
          title: 'การจัดการข้อมูล',
          icon: 'element-plus',
          submenu: [
            { title: 'การจัดการหัวบัญชี', path: '/#' },
            { title: 'การจัดการหมวดบัญชี', path: '/#' },
            { title: 'การจัดการ Account Group', path: '/#' },
            { title: 'การจัดการ Account Code', path: '/#' },
            { title: 'การจัดการ Budget Type', path: '/#' },
            { title: 'การจัดการงบวงเงิน', path: '/#' },
            { title: 'การจัดการความสัมพันธ์งบวงเงิน', path: '/#' },
          ]
        },
        { title: 'การจัดการมอบอำนาจ', icon: 'element-plus', path: '/#' },
        { title: 'การจัดการ Mail Template', icon: 'element-plus', path: '/#' },
        { title: 'การจัดการข่าวประชาสัมพันธ์', icon: 'element-plus', path: '/#' },
        { title: 'การจัดการหน่วยงาน', icon: 'element-plus', path: '/#' },
        { title: 'เปิด/ปิดระบบ', icon: 'element-plus', path: '/#' },
        { title: 'การจัดการข้อมูลทรัพย์สิน', icon: 'element-plus', path: '/#' },
        {
          title: 'การจัดการ Template',
          icon: 'element-plus',
          submenu: [
            { title: 'การกำหนด Master Template งบตั้งต้น', path: '/#' },
            { title: 'สร้าง Template', path: '/#' },
            { title: 'แก้ไขผังบัญชี', path: '/#' },
            { title: 'การกำหนด Master Template GE', path: '/#' },
            { title: 'การกำหนด Master Template Detail', path: '/#' },
          ]
        },
        {
          title: 'การจัดการผู้ใช้งาน',
          icon: 'element-plus',
          submenu: [
            { title: 'การจัดการ Role', path: '/admin/roles' },
            { title: 'การจัดการ เมนู', path: '/admin/menu' },
            { title: 'การจัดการ ผู้ใช้', path: '/admin/users' },
            { title: 'การจัดการ User PBD', path: '/#' }
          ]
        },
        {
          title: 'Notification',
          icon: 'element-plus',
          submenu: [
            { title: 'การจัดการ E-mail Template', path: '/#' },
            { title: 'การจัดการ Notification บนระบบ', path: '/#' }
          ]
        },
        { title: 'การจัดการสาเหตุการส่งกลับแก้ไข', icon: 'element-plus', path: '/#' },
      ]
    }
  ];

  roles: any[] = [
    {
      label: 'ผู้ดูแลระบบ',
      value: 'admin'
    },
    {
      label: 'ผู้ใช้ทั่วไป',
      value: 'user'
    },
  ];

  role: string = 'admin'

  menus: any = {};
  openedMenu: any = null;
  activeChain: any[] = [];

  constructor(public router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.menus = this.menuItems.find(item =>
          event.urlAfterRedirects.startsWith(item.path)
        ) || {};

        this.setActiveChain(event.url);
      }
    });

  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  // toggle menu
  toggleMenu(menu: any) {
    if (this.openedMenu === menu) {
      this.openedMenu = null; // กดซ้ำปิด
    } else {
      this.openedMenu = menu; // เปิดเมนูใหม่
    }
  }

  setActiveChain(url: string) {
    this.activeChain = this.findChain([this.menus], url) || [];
  }

  /**
 * recursive หา chain ของเมนู
 */
  findChain(menus: any[], url: string, parents: any[] = []): any[] | null {
    let bestMatch: any[] | null = null;

    for (const menu of menus) {
      const newParents = [...parents, menu];

      // ✅ ถ้า url เริ่มต้นด้วย path ของ menu
      if (url.startsWith(menu.path)) {
        // อัปเดต bestMatch ถ้า path ปัจจุบันยาวกว่า match ที่เก็บไว้
        if (!bestMatch || menu.path.length > bestMatch[bestMatch.length - 1].path.length) {
          bestMatch = newParents;
        }
      }

      if (menu.submenu?.length) {
        const found = this.findChain(menu.submenu, url, newParents);
        if (found) {
          // เลือก chain ที่ match ยาวที่สุด
          if (!bestMatch || found[found.length - 1].path.length > bestMatch[bestMatch.length - 1].path.length) {
            bestMatch = found;
          }
        }
      }
    }

    return bestMatch;
  }

  // ฟัง click ข้างนอก component
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    // ตรวจสอบว่า click ไม่อยู่ใน sidebar
    if (!target.closest('.sidebar-menu')) {
      this.openedMenu = null;
    }
  }
}
