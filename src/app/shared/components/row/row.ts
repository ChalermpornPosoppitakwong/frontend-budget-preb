import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-row',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Row {
  @Input() gap = 4; // Tailwind spacing units

  @HostBinding('class') get hostClasses(): string {
    return `grid grid-cols-12 gap-${this.gap}`;
  }
}
