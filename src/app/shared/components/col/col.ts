import { ChangeDetectionStrategy, Component, Input, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-col',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Col {
  @Input() span = 12;
  @Input() sm?: number;
  @Input() md?: number;
  @Input() lg?: number;
  @Input() xl?: number;

  private currentSpan = 12;

  @HostBinding('class') hostClass = '';

  ngOnInit() {
    this.updateSpan(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSpan(event.target.innerWidth);
  }

  private updateSpan(width: number) {
    if (width >= 1280 && this.xl != null) {
      this.currentSpan = this.xl;
    } else if (width >= 1024 && this.lg != null) {
      this.currentSpan = this.lg;
    } else if (width >= 768 && this.md != null) {
      this.currentSpan = this.md;
    } else if (width >= 640 && this.sm != null) {
      this.currentSpan = this.sm;
    } else {
      this.currentSpan = this.span;
    }

    this.hostClass = `col-span-${this.currentSpan}`;
  }
}
