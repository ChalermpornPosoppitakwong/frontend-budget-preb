import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentsModule } from "@shared/components/components-module";

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './announcements.html',
})
export class Announcements {
  announcements = [
    { title: 'แจ้ง update รายการมาใหม่น่าสนใจมากๆ', link: '#', topic: 'ข่าว', color: 'bg-green-200 text-green-600' },
    { title: 'แจ้ง update รายการมาใหม่น่าสนใจมากๆ', link: '#', topic: 'แจ้งเตือน', color: 'bg-orange-200 text-orange-600' },
    { title: 'แจ้ง update รายการมาใหม่น่าสนใจมากๆ', link: '#', topic: 'ข่าว', color: 'bg-green-200 text-green-600' },
    { title: 'แจ้ง update รายการมาใหม่น่าสนใจมากๆ', link: '#', topic: 'ข่าว', color: 'bg-green-200 text-green-600' }
  ];
}
