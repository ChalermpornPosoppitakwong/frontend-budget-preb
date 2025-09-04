import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checkbox } from './checkbox';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-checkbox-group',
    standalone: true,
    imports: [CommonModule, FormsModule, Checkbox],
    template: `
    <!-- Optional group-level label -->
    <div *ngIf="label" class="text-sm font-medium text-gray-500 py-1">{{ label }}</div>

    <div [ngClass]="directionClass" class="gap-2">
      <!-- Select All -->
      <app-checkbox
        *ngIf="showSelectAll"
        [(ngModel)]="allSelected"
        [indeterminate]="isIndeterminate"
        [label]="selectAllLabel"
        (checkedChange)="toggleSelectAll($event)">
      </app-checkbox>

      <!-- Individual checkboxes -->
      <app-checkbox
        *ngFor="let option of options; let i = index"
        [(ngModel)]="option.checked"
        [label]="option.label"
        (checkedChange)="onItemChange(i, $event)">
      </app-checkbox>
    </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxGroup),
            multi: true
        }
    ]
})
export class CheckboxGroup implements ControlValueAccessor {
    /** Label for the whole group */
    @Input() label: string = '';

    /** Options in the group */
    @Input() options: { label: string; checked?: boolean }[] = [];

    /** Show/hide Select All checkbox */
    @Input() showSelectAll = true;

    /** Label for Select All checkbox */
    @Input() selectAllLabel: string = 'ทั้งหมด';

    /** Layout direction: vertical (default) or horizontal */
    @Input() direction: 'vertical' | 'horizontal' = 'vertical';

    @Output() selectedChange = new EventEmitter<{ label: string; checked: boolean }[]>();

    /** ControlValueAccessor callbacks */
    private onTouched: () => void = () => { };
    private onChanged: (val: { label: string; checked: boolean }[]) => void = () => { };

    /** Flex direction class */
    get directionClass(): string {
        return this.direction === 'horizontal' ? 'flex flex-row items-center flex-wrap' : 'flex flex-col';
    }

    /** Select All getter/setter */
    get allSelected(): boolean {
        return this.options.every(o => o.checked);
    }

    set allSelected(val: boolean) {
        this.options.forEach(o => o.checked = val);
        this.selectedChange.emit(this.options.map(o => ({ label: o.label, checked: o.checked ?? false })));
    }

    /** True when some but not all checkboxes are selected */
    get isIndeterminate(): boolean {
        const checkedCount = this.options.filter(o => o.checked).length;
        return checkedCount > 0 && checkedCount < this.options.length;
    }

    /** Toggle all checkboxes */
    toggleSelectAll(checked: boolean) {
        this.options.forEach(o => o.checked = checked);
        const updated = this.options.map(o => ({ label: o.label, checked: o.checked ?? false }));
        this.selectedChange.emit(updated);
        this.onChanged(updated);
    }

    /** Handle single checkbox change */
    onItemChange(index: number, checked: boolean) {
        this.options[index].checked = checked;
        const updated = this.options.map(o => ({ label: o.label, checked: o.checked ?? false }));
        this.selectedChange.emit(updated);
        this.onChanged(updated);
    }

    // ---------------- ControlValueAccessor ----------------
    writeValue(value: { label: string; checked: boolean }[]): void {
        if (value) {
            this.options = value.map(v => ({ label: v.label, checked: v.checked ?? false })); // ensure checked is boolean
        }
    }

    registerOnChange(fn: (val: { label: string; checked: boolean }[]) => void): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Optional: handle disabling checkboxes if needed
    }
}
