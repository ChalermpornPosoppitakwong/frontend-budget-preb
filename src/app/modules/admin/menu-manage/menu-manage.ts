import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentsModule } from '@shared/components/components-module';

@Component({
  selector: 'app-menu-manage',
  imports: [ComponentsModule],
  templateUrl: './menu-manage.html',
  styles: ``
})
export class MenuManage {
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
