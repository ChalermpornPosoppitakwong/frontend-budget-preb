import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentsModule } from '@shared/components/components-module';

@Component({
  selector: 'app-menu-api-manage',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './menu-api-manage.html',
  styles: ``
})
export class MenuApiManage {
  @Output() save = new EventEmitter<any>();

  data: any = {};

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

  onSave() {
    this.save.emit(this.data);
  }
}
