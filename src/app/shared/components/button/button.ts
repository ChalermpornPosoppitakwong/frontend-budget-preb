import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, Icon],
  template: `
    <!-- left icon -->
    @if(iconLeft) {
    <span class="inline-flex w-5 h-5 items-center justify-center">
        <app-icon [name]="iconLeft" size="20"></app-icon>
      </span>
    }

    <!-- slot -->
    <ng-content></ng-content>

    <!-- right icon -->
    @if(iconRight) {
    <span class="inline-flex w-5 h-5 items-center justify-center">
        <app-icon [name]="iconRight" size="20"></app-icon>
      </span>
    }
  `,
  host: {
    class: 'inline-flex items-center justify-center gap-1 cursor-pointer h-auto select-none transition-colors duration-150 ease-in-out'
  }
})
export class Button {
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'info' | 'warning' | 'danger' | 'success' | '' = '';
  @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() fullWidth: boolean = false;
  @Input() outline: boolean = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;

  @HostBinding('class') get hostClasses(): string {
    const classes: string[] = [];

    // size
    switch (this.size) {
      case 'sm': classes.push('px-2 py-1 text-sm'); break;
      case 'md': classes.push('px-4 py-2 text-base'); break;
      case 'lg': classes.push('px-6 py-3 text-lg'); break;
    }

    // color + outline
    if (this.outline) {
      switch (this.color) {
        case 'primary': classes.push('border border-blue-400 text-blue-400'); break;
        case 'info': classes.push('border border-cyan-400 text-cyan-400'); break;
        case 'warning': classes.push('border border-orange-400 text-orange-500'); break;
        case 'danger': classes.push('border border-red-500 text-red-500'); break;
        case 'success': classes.push('border border-green-500 text-green-500'); break;
        default: classes.push('border border-white text-white'); break;
      }
    } else {
      switch (this.color) {
        case 'primary': classes.push('bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600'); break;
        case 'info': classes.push('bg-cyan-400 text-white hover:bg-cyan-500 active:bg-cyan-600'); break;
        case 'warning': classes.push('bg-orange-400 text-white hover:bg-orange-500 active:bg-orange-600'); break;
        case 'danger': classes.push('bg-red-500 text-white hover:bg-red-600 active:bg-red-700'); break;
        case 'success': classes.push('bg-green-500 text-white hover:bg-green-600 active:bg-green-700'); break;
        default: classes.push('border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200'); break;
      }
    }

    // rounded
    switch (this.rounded) {
      case 'none': classes.push('rounded-none'); break;
      case 'sm': classes.push('rounded-sm'); break;
      case 'md': classes.push('rounded-md'); break;
      case 'lg': classes.push('rounded-lg'); break;
      case 'full': classes.push('rounded-full'); break;
    }

    // width
    if (this.fullWidth) classes.push('w-full');

    // disabled
    if (this.disabled) {
      classes.push('opacity-50', '!cursor-not-allowed');
    }

    return classes.join(' ');
  }
}
