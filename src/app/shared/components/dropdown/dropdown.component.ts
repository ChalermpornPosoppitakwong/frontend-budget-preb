import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Checkbox } from "../checkbox/checkbox";
import { Button } from "../button/button";

export interface DropdownOption<T = any> {
    label: string;
    value: T;
    checked?: boolean;
}

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [CommonModule, FormsModule, Checkbox, Button],
    templateUrl: './dropdown.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => Dropdown),
        multi: true
    }]
})
export class Dropdown<T = any> implements OnInit, ControlValueAccessor {
    constructor(public el: ElementRef) { }

    @Input() top?: string;
    @Input() defaultValue?: T;
    @Input() outline: boolean = false;
    @Input() iconLeft: string = '';
    @Input() iconRight: string = '';
    @Input() options: DropdownOption<T>[] = [];
    @Input() multiple = false;
    @Input() selected?: DropdownOption<T> | DropdownOption<T>[];
    @Input() placeholder = 'Select an option';
    @Input() optionTpl?: TemplateRef<any>; // custom template
    @Input() type: string = 'primary'; // daisyUI btn type
    @Input() size: 'sm' | 'md' | 'lg' = 'md'; // daisyUI btn size

    @Output() selectedChange = new EventEmitter<DropdownOption<T> | DropdownOption<T>[]>();

    isOpen = false;

    /** จำนวน label ที่จะแสดงก่อน +N */
    readonly maxVisibleLabels = 2;

    ngOnInit() {
        if (!this.multiple && this.defaultValue) {
            this.selected = this.options.find(o => o.value === this.defaultValue);
        }
    }

    /** ปิด dropdown ถ้าคลิกข้างนอก */
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!this.el.nativeElement.contains(target)) {
            this.isOpen = false;
        }
    }

    /** Toggle dropdown open/close */
    toggle(): void {
        this.isOpen = !this.isOpen;
    }

    /** ControlValueAccessor */
    private onChange: (value: any) => void = () => { };
    private onTouched: () => void = () => { };

    writeValue(value: DropdownOption<T> | DropdownOption<T>[] | undefined): void {
        if (this.multiple) {
            // multiple: หา option ที่ match กับ array ของค่า
            const valuesArray = Array.isArray(value) ? value : [];
            const selectedValues = valuesArray.map(v => (typeof v === 'object' && v !== null && 'value' in v) ? v.value : v);
            this.selected = this.options.filter(o => selectedValues.includes(o.value));
        } else {
            // single: หา option ที่ match ค่าเดียว
            this.selected = this.options.find(o => o.value === value) || undefined;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void { }

    /** emit ทั้ง selectedChange และ CVA */
    private updateValue(value: DropdownOption<T> | DropdownOption<T>[] | undefined) {
        this.selected = value;
        this.selectedChange.emit(value);

        if (Array.isArray(value)) {
            this.onChange(value.map(v => v.value));
        } else {
            this.onChange(value?.value);
        }
        this.onTouched();
    }

    /** เลือกเฉพาะ checkbox */
    selectCheckbox(option: DropdownOption<T>, checked: boolean) {
        let arr = Array.isArray(this.selected) ? [...this.selected] : [];
        const isSelected = arr.some(o => o.value === option.value);

        if (checked && !isSelected) {
            arr.push(option);
        } else if (!checked && isSelected) {
            arr = arr.filter(o => o.value !== option.value);
        }

        this.updateValue(arr);
    }

    /** เลือกแบบ click สำหรับ single-select */
    select(option: DropdownOption<T>) {
        if (!this.multiple) {
            this.updateValue(option);
            this.isOpen = false;
        }
    }

    /** Check if option is selected */
    isSelected(option: DropdownOption<T>): boolean {
        if (!this.multiple) return this.selectedSingle?.value === option.value;
        return this.selectedArray.some(o => o.value === option.value);
    }

    /** Select or deselect all */
    toggleSelectAll(checked: boolean) {
        const value = checked ? [...this.options] : [];

        this.options.forEach(o => o.checked = checked);

        this.updateValue(value);
    }

    /** ล้างค่า */
    clear(event: Event) {
        event.stopPropagation();
        this.updateValue(this.multiple ? [] : undefined);
    }

    /** Visible labels for button */
    get visibleLabels(): string[] {
        if (!this.multiple || !this.selectedArray.length) return [];
        const max = this.maxVisibleLabels;
        return this.selectedArray.slice(0, max).map(o => o.label);
    }

    /** Count of hidden labels */
    get hiddenCount(): number {
        const max = this.maxVisibleLabels;
        return this.selectedArray.length > max ? this.selectedArray.length - max : 0;
    }

    get selectedArray(): DropdownOption<T>[] {
        return Array.isArray(this.selected) ? this.selected : [];
    }

    get selectedSingle(): DropdownOption<T> | undefined {
        return !Array.isArray(this.selected) ? this.selected : undefined;
    }

    /** Check if partially selected */
    get isIndeterminate(): boolean {
        return this.selectedArray.length > 0 && this.selectedArray.length < this.options.length;
    }

    /** Check if all selected */
    get allSelected(): boolean {
        return this.selectedArray.length === this.options.length && this.options.length > 0;
    }

    set allSelected(val: boolean) {
        this.toggleSelectAll(val);
    }

    /** daisyUI button classes */
    get buttonClass(): string {
        return `btn btn-${this.type} btn-${this.size} w-full justify-between`;
    }

    get buttonTooltip(): string {
        if (!this.multiple) {
            return this.selectedSingle?.label || '';
        }
        if (this.selectedArray.length === 0) return '';
        return this.selectedArray.map(o => o.label).join(', ');
    }

    /** มีค่าหรือยัง */
    get hasValue(): boolean {
        if (!this.multiple) return !!this.selectedSingle;
        return this.selectedArray.length > 0;
    }

    get textColor(): string {
        if (!this.outline) {
            switch (this.type) {
                case 'primary': return 'text-blue-400';
                case 'info': return 'text-cyan-400';
                case 'warning': return 'text-orange-500';
                case 'danger': return 'text-red-500';
                case 'success': return 'text-green-500';
                default: return 'text-white';
            }
        } else {
            return 'text-white';
        }
    }
}
