import { Component, Input, HostBinding, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-radio',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        @if(label) {
            <!-- Label -->
            <div class="label flex items-center justify-start">
              <span class="mb-1 label-text text-sm font-semibold text-gray-600">{{ label }}</span>

              @if(required) {
                  <span class="label-text-alt text-red-500">*</span>
              }
            </div>
        }

        <!-- Radio buttons -->
        <div [ngClass]="direction === 'vertical' ? 'flex flex-col gap-2' : 'flex flex-row gap-4 items-center'">
            <label *ngFor="let opt of options" class="cursor-pointer flex items-center gap-2">
                <input
                type="radio"
                class="radio radio-xs text-blue-600"
                [name]="name"
                [value]="opt.value"
                [checked]="opt.value === value"
                [required]="required"
                (change)="onChange(opt.value)"
                />
                @if(opt.label) {
                    <span class="label-text text-gray-700 text-sm font-semibold">{{ opt.label }}</span>
                }
            </label>
        </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Radio),
            multi: true
        }
    ]
})
export class Radio implements ControlValueAccessor {
    @Input() direction: 'vertical' | 'horizontal' = 'vertical';
    @Input() options: { label: string; value: any }[] = [];
    @Input() name = '';
    @Input() label?: string;      // เพิ่ม Label title
    @Input() required = false;    // เพิ่ม required

    value: any;

    private onTouched = () => { };
    private onChanged = (value: any) => { };

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // ใช้ถ้าต้องการ disable
    }

    onChange(value: any) {
        this.value = value;
        this.onChanged(value);
        this.onTouched();
    }
}
