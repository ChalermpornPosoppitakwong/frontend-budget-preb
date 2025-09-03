import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './menu-item.html',
})
export class MenuItem {
  @Input() menu: any;
  @Input() isParent: boolean = false;

  @Output() toggleParent = new EventEmitter<string>();

  constructor(private router: Router) { }

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }

  handleToggle() {
    if (this.menu?.id) {
      this.toggleParent.emit(this.menu.id);
    }
  }
}
