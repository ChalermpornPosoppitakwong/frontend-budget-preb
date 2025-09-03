import { Component, Input, HostBinding, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-radio',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <label *ngFor="let opt of options" class="label cursor-pointer">
      <input
        type="radio"
        class="radio radio-xs text-blue-600"
        [name]="name"
        [value]="opt.value"
        [checked]="opt.value === value"
        (change)="onChange(opt.value)"
      />

      @if(opt.label) {
          <span class="label-text ml-2">{{ opt.label }}</span>
      }
    </label>
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
    @Input() options: { label: string; value: any }[] = [];
    @Input() name = '';

    @HostBinding('class') hostClass = 'flex flex-col justify-center items-center gap-2';

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
