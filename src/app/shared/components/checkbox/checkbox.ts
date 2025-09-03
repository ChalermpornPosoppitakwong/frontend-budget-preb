import { Component, forwardRef, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <label class="label cursor-pointer inline-flex items-center">
      <input
        #checkboxEl
        type="checkbox"
        class="checkbox checkbox-xs rounded-sm bg-white"
        [class.checked:bg-blue-600]="color === 'primary'"
        [class.checked:text-white]="color === 'primary'"
        [class.indeterminate:bg-blue-600]="color === 'primary'"
        [class.indeterminate:text-white]="color === 'primary'"
        [class.checked:bg-green-600]="color === 'success'"
        [class.checked:bg-red-600]="color === 'error'"
        [checked]="checked"
        (change)="onChange($event)" />

      <span *ngIf="label" class="label-text text-gray-700 text-sm font-semibold">{{ label }}</span>
    </label>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => Checkbox),
        multi: true
    }]
})
export class Checkbox implements ControlValueAccessor, AfterViewInit, OnChanges {
    @Input() label = '';
    @Input() color: 'primary' | 'success' | 'error' | '' = 'primary';
    @Input() indeterminate = false; // ✅ เพิ่มตัวแปร indeterminate
    @Output() checkedChange = new EventEmitter<boolean>();

    @ViewChild('checkboxEl', { static: true }) checkboxEl!: ElementRef<HTMLInputElement>;

    checked = false;

    private onTouched: () => void = () => { };
    private onChanged: (val: boolean) => void = () => { };

    ngAfterViewInit() {
        this.updateIndeterminate();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['indeterminate']) {
            this.updateIndeterminate();
        }
    }

    writeValue(value: boolean): void {
        this.checked = value;
        this.updateIndeterminate();
    }

    registerOnChange(fn: (val: boolean) => void): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onChange(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        if (!input) return;
        this.checked = input.checked;
        this.indeterminate = false; // reset indeterminate เมื่อ user กดเอง
        this.updateIndeterminate();
        this.onChanged(this.checked);
        this.checkedChange.emit(this.checked);
    }

    private updateIndeterminate() {
        if (this.checkboxEl) {
            this.checkboxEl.nativeElement.indeterminate = this.indeterminate;
        }
    }
}
