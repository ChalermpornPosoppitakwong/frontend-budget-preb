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
        { title: 'ข่าวประชาสัมพันธ์', icon: 'speaker-phone', path: '/home/announcements' },
      ]
    },
    {
      title: 'งบประมาณประจำปี',
      path: '/budget-year',
      icon: 'start-year',
      submenu: [
        {
          title: 'รายงานงาน',
          icon: 'report-gantt',
          path: '/budget-year/report-task',
          submenu: [
            { title: 'รายงานงาน 1', path: '/budget-year/report-task/1' },
            { title: 'รายงานงาน 2', path: '/budget-year/report-task/2' }
          ]
        },
        {
          title: 'บันทึกจัดสรร',
          icon: 'archive-success-outline',
          path: '/budget-year/allocation',
          submenu: [
            { title: 'บันทึกจัดสรร 1', path: '/budget-year/allocation/1' },
            { title: 'บันทึกจัดสรร 2', path: '/budget-year/allocation/2' }
          ]
        },
        {
          title: 'จัดการAdhoc',
          icon: 'task-time',
          path: '/budget-year/adhoc',
          submenu: [
            { title: 'จัดการAdhoc 1', path: '/budget-year/adhoc/1' },
            { title: 'จัดการAdhoc 2', path: '/budget-year/adhoc/2' }
          ]
        },
        {
          title: 'การจัดการข้อมูลผู้ใช้งาน',
          icon: 'user-cog',
          path: '/budget-year/user-management',
          submenu: [
            { title: 'การจัดการข้อมูลผู้ใช้งาน 1', path: '/budget-year/user-management/1' },
            { title: 'การจัดการข้อมูลผู้ใช้งาน 2', path: '/budget-year/user-management/2' }
          ]
        },
        {
          title: 'การจัดการข้อมูล',
          icon: 'report-gantt',
          path: '/data-management',
          submenu: [
            { title: 'การจัดการหัวบัญชี', path: '/data-management/account-head' },
            { title: 'จัดการ Mail Template', path: '/data-management/mail-template' },
            { title: 'จัดการหน่วยงาน [Cost Center Chain]', path: '/data-management/cost-center-chain' },
            { title: 'การจัดการ User PBD', path: '/data-management/user-pbd' },
            { title: 'การจัดการงบวงเงิน', path: '/data-management/budget-management' }
          ]
        },
        {
          title: 'ข่าวประชาสัมพันธ์',
          icon: 'speaker-phone',
          path: '/news',
          submenu: [
            { title: 'ข่าวประชาสัมพันธ์ 1', path: '/news/1' },
            { title: 'ข่าวประชาสัมพันธ์ 2', path: '/news/2' }
          ]
        },
        {
          title: 'รายงาน',
          icon: 'bookmark-report',
          path: '/report',
          submenu: [
            { title: 'รายงาน 1', path: '/report/1' },
            { title: 'รายงาน 2', path: '/report/2' }
          ]
        }
      ]
    },
    {
      title: 'งบประมาณระหว่างปี',
      path: '/cost-center-chain',
      icon: 'coins',
      submenu: [
        {
          title: 'รายงานงาน',
          icon: 'report-gantt',
          path: '/budget-year/report-task',
          submenu: [
            { title: 'รายงานงาน 1', path: '/budget-year/report-task/1' },
            { title: 'รายงานงาน 2', path: '/budget-year/report-task/2' }
          ]
        },
        {
          title: 'บันทึกจัดสรร',
          icon: 'archive-success-outline',
          path: '/budget-year/allocation',
          submenu: [
            { title: 'บันทึกจัดสรร 1', path: '/budget-year/allocation/1' },
            { title: 'บันทึกจัดสรร 2', path: '/budget-year/allocation/2' }
          ]
        },
        {
          title: 'จัดการAdhoc',
          icon: 'task-time',
          path: '/budget-year/adhoc',
          submenu: [
            { title: 'จัดการAdhoc 1', path: '/budget-year/adhoc/1' },
            { title: 'จัดการAdhoc 2', path: '/budget-year/adhoc/2' }
          ]
        },
        {
          title: 'การจัดการข้อมูลผู้ใช้งาน',
          icon: 'user-cog',
          path: '/budget-year/user-management',
          submenu: [
            { title: 'การจัดการข้อมูลผู้ใช้งาน 1', path: '/budget-year/user-management/1' },
            { title: 'การจัดการข้อมูลผู้ใช้งาน 2', path: '/budget-year/user-management/2' }
          ]
        },
        {
          title: 'การจัดการข้อมูล',
          icon: 'report-gantt',
          path: '/data-management',
          submenu: [
            { title: 'การจัดการหัวบัญชี', path: '/data-management/account-head' },
            { title: 'จัดการ Mail Template', path: '/data-management/mail-template' },
            { title: 'จัดการหน่วยงาน [Cost Center Chain]', path: '/data-management/cost-center-chain' },
            { title: 'การจัดการ User PBD', path: '/data-management/user-pbd' },
            { title: 'การจัดการงบวงเงิน', path: '/data-management/budget-management' }
          ]
        },
        {
          title: 'ข่าวประชาสัมพันธ์',
          icon: 'speaker-phone',
          path: '/news',
          submenu: [
            { title: 'ข่าวประชาสัมพันธ์ 1', path: '/news/1' },
            { title: 'ข่าวประชาสัมพันธ์ 2', path: '/news/2' }
          ]
        },
        {
          title: 'รายงาน',
          icon: 'bookmark-report',
          path: '/report',
          submenu: [
            { title: 'รายงาน 1', path: '/report/1' },
            { title: 'รายงาน 2', path: '/report/2' }
          ]
        }
      ]
    },
    {
      title: 'การจัดการระบบ',
      path: '/admin',
      icon: 'gui-management',
      submenu: [
        {
          title: 'การจัดการ Role',
          icon: 'user-cog',
          path: '/admin/roles'
        },
        {
          title: 'การจัดการ เมนู',
          icon: 'element-plus',
          path: '/admin/menus'
        },
        {
          title: 'การจัดการ ผู้ใช้',
          icon: 'team-member'
        }
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
    for (const menu of menus) {
      const newParents = [...parents, menu];

      if (menu.path === this.getBaseUrl(url)) {
        return newParents;
      }

      if (menu.submenu?.length) {
        const found = this.findChain(menu.submenu, url, newParents);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  getBaseUrl(url: string) {
    const segments = url.split('/').filter(s => s); // กรอง segment ว่าง

    // ตรวจว่า segment สุดท้ายเป็นตัวเลขหรือ action เช่น edit/add/view
    let endIndex = segments.length;
    const lastSegment = segments[segments.length - 1];

    if (!isNaN(+lastSegment)) {
      // ถ้า segment สุดท้ายเป็นตัวเลข (id) → ตัด 2 segment สุดท้าย
      endIndex = segments.length - 2;
    } else if (['create', 'edit', 'view'].includes(lastSegment)) {
      // ถ้า segment สุดท้ายเป็น action → ตัด 1 segment สุดท้าย
      endIndex = segments.length - 1;
    }

    return '/' + segments.slice(0, endIndex).join('/');
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
