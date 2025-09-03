import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true,
    },
  ],
  template: `
    <label class="form-control w-full space-y-1">
      <!-- ✅ Label -->
       @if(label) {
         <div class="label">
           <span class="label-text text-sm font-semibold text-gray-600">{{ label }}</span>

           @if(required) {
             <span class="label-text-alt text-red-500">*</span>
           }
         </div>
       }

      <!-- ✅ Textarea -->
      <textarea
        #ta
        class="textarea w-full text-base focus:outline-none focus:ring-0 focus:border-gray-300"
        [ngClass]="[
          size ? 'textarea-' + size : '',
          variant ? 'textarea-' + variant : '',
          invalid ? 'textarea-error' : '',
        ]"
        [attr.placeholder]="placeholder || null"
        [attr.name]="name || null"
        [rows]="rows"
        [attr.maxlength]="maxlength ?? null"
        [attr.autocomplete]="autocomplete || null"
        [disabled]="disabled"
        [readOnly]="readonly"
        [ngModel]="value"
        (ngModelChange)="handleInput($event)"
        (input)="autoResize ? resize() : null"
        (blur)="onTouched()"
      ></textarea>

        <!-- ✅ Helper + Counter -->
        <div class="flex justify-between items-center">
          <div class="w-4/5">
            @if(hint) {
              <span class="label-text-alt text-gray-300 text-xs font-semibold break-words w-full block">
                {{ hint }}
              </span>
            }
          </div>
          <div class="flex">
            @if(maxlength) {
              <span
                class="label-text-alt text-gray-400 text-xs self-end whitespace-nowrap"
              >
                {{ value.length || 0 }} / {{ maxlength }}
              </span>
            }
          </div>
        </div>
    </label>
  `,
})
export class Textarea
  implements ControlValueAccessor, AfterViewInit {
  // --- HostBinding ---
  @HostBinding('class.block') hostBlock = true;
  @HostBinding('class.my-1') hostMargin = true;
  @HostBinding('class.w-full') @Input() fullWidth = true;
  @HostBinding('attr.data-size') @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @HostBinding('attr.data-variant') @Input() variant: 'ghost' | 'bordered' = 'bordered';
  @HostBinding('attr.aria-invalid') get ariaInvalid() {
    return this.invalid || null;
  }

  @ViewChild('ta', { static: true }) textareaRef!: ElementRef<HTMLTextAreaElement>;

  // Inputs
  @Input() label?: string;          // ✅ new
  @Input() hint?: string;           // ✅ optional helper text
  @Input() required = false;        // ✅ show * if required
  @Input() placeholder?: string;
  @Input() name?: string;
  @Input() rows = 3;
  @Input() maxlength?: number;
  @Input() autocomplete?: string;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() invalid = false;

  @Input() autoResize = true;
  @Input() maxAutoRows = 12;

  // CVA
  value = '';
  private onChange: (v: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(v: string | null): void {
    this.value = v ?? '';
    queueMicrotask(() => this.resize());
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit(): void {
    this.resize();
  }

  handleInput(v: string) {
    this.value = v;
    this.onChange(v);
  }

  resize() {
    if (!this.autoResize || !this.textareaRef) return;
    const el = this.textareaRef.nativeElement;
    el.style.height = 'auto';

    const style = getComputedStyle(el);
    const borderY =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const target = el.scrollHeight + borderY;

    if (this.maxAutoRows && this.maxAutoRows > 0) {
      const lineHeight = parseFloat(style.lineHeight || '20');
      const paddingY =
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const maxHeight = this.maxAutoRows * lineHeight + paddingY + borderY;
      el.style.height = Math.min(target, maxHeight) + 'px';
    } else {
      el.style.height = target + 'px';
    }
  }
}
