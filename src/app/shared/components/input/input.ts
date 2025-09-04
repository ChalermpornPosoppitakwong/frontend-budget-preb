import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label class="form-control w-full space-y-1">
        @if(label) {
            <!-- Label -->
            <div class="label flex items-center justify-start">
              <span class="mb-1 label-text text-sm font-semibold text-gray-600">{{ label }}</span>

              @if(required) {
                  <span class="label-text-alt text-red-500">*</span>
              }
            </div>
        }

        <!-- Input Group -->
        <div class="flex items-center w-full gap-2">

          <!-- Prefix slot -->
          <ng-content select="[prefix]"></ng-content>

          <!-- Input -->
          <input #inputEl
                [type]="type"
                [placeholder]="placeholder"
                [(ngModel)]="value"
                (ngModelChange)="valueChange.emit($event)"
                [disabled]="disabled"
                [ngClass]="[
                  sizeClass,
                  roundedClass,
                  variantClass,
                  disabled ? 'opacity-50 cursor-not-allowed' : '',
                  'flex-1 focus:outline-none px-2 py-2 border'
                ]" />

          <!-- Suffix slot -->
          <ng-content select="[suffix]"></ng-content>

        </div>

        @if(hint) {
          <!-- Hint -->
          <div class="label">
            <span class="label-text-alt text-xs text-gray-300 font-semibold">{{ hint }}</span>
          </div>
        }
      </label>
  `
})
export class InputComponent {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;

  @Input() label?: string;
  @Input() hint?: string;
  @Input() required = false;

  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() variant: 'default' | 'outline' | 'ghost' = 'default';
  @Input() width: 'full' | number | string = 'full';

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('inputEl', { static: true }) inputEl!: ElementRef<HTMLInputElement>;

  get sizeClass(): string {
    switch (this.size) {
      case 'sm': return 'text-sm py-1 px-2';
      case 'md': return 'text-base py-2 px-3';
      case 'lg': return 'text-lg py-3 px-4';
      default: return '';
    }
  }

  get roundedClass(): string {
    switch (this.rounded) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'full': return 'rounded-full';
      default: return '';
    }
  }

  get variantClass(): string {
    switch (this.variant) {
      case 'default': return 'border-gray-300 focus:ring-0';
      case 'outline': return 'border-gray-300 focus:ring-0';
      case 'ghost': return 'border-none bg-transparent focus:ring-0';
      default: return '';
    }
  }
}
