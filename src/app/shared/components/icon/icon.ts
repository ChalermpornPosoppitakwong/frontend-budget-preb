import { Component, ChangeDetectionStrategy, Input, SecurityContext, SimpleChanges, ChangeDetectorRef, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { take } from 'rxjs';
import { IconRegistryService } from './icon-registry.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-icon',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './icon.html',
  styles: `
      :host {
      display: inline-flex;
      line-height: 1;
      vertical-align: middle;
    }
    .icon-root {
      display: inline-flex;
      width: var(--icon-size);
      height: var(--icon-size);
      color: var(--icon-color);
    }
    /* ให้ <svg> ขยายเต็มกรอบและใช้ currentColor */
    .icon-root svg {
      width: 100%;
      height: 100%;
      display: block;
      fill: currentColor;
      stroke: currentColor;
    }
    img.icon-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Icon implements OnChanges {
  @Input() name?: string;           // ชื่อไฟล์ SVG เช่น "home"
  @Input() src?: string;            // ใช้รูป image แทน SVG
  @Input() size: string | number = 24;
  @Input() color: string = 'currentColor';

  svgHtml: SafeHtml | null = null;
  hostStyle: Record<string, string> = {};

  constructor(
    private registry: IconRegistryService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const sizeValue = typeof this.size === 'number' ? `${this.size}px` : this.size;
    this.hostStyle = {
      '--icon-size': sizeValue,
      '--icon-color': this.color || 'currentColor',
      width: sizeValue,
      height: sizeValue,
      color: this.color || 'currentColor'
    };

    if (this.src) {
      // ใช้ image แทน SVG
      this.svgHtml = null;
      this.cdr.markForCheck();
      return;
    }

    if (this.name) {
      this.registry.getSvg(this.name).pipe(take(1)).subscribe({
        next: (raw) => {
          this.svgHtml = this.sanitizer.bypassSecurityTrustHtml(raw);
          this.cdr.markForCheck();
        },
        error: () => {
          this.svgHtml = null;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.svgHtml = null;
      this.cdr.markForCheck();
    }
  }
}
