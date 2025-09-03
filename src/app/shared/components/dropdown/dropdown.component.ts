import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef, HostListener, ElementRef, OnInit } from '@angular/core';
import { Checkbox } from "../checkbox/checkbox";
import { FormsModule } from '@angular/forms';
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
})
export class Dropdown<T = any> implements OnInit {
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
    @Input() type: string = 'primary';      // daisyUI btn type
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

    /** เลือกเฉพาะ checkbox */
    selectCheckbox(option: DropdownOption<T>, checked: boolean) {
        let arr = Array.isArray(this.selected) ? [...this.selected] : [];
        const isSelected = arr.some(o => o.value === option.value);

        if (checked && !isSelected) {
            arr.push(option);
        } else if (!checked && isSelected) {
            arr = arr.filter(o => o.value !== option.value);
        }

        this.selected = arr;
        this.selectedChange.emit(this.selected);
    }

    /** เลือกแบบ click สำหรับ single-select */
    select(option: DropdownOption<T>) {
        if (!this.multiple) {
            this.selected = option;
            this.selectedChange.emit(option);
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
        if (checked) {
            this.selected = [...this.options];
        } else {
            this.selected = [];
        }

        this.options.map(o => {
            o.checked = this.allSelected;
            return o;
        });

        this.selectedChange.emit(this.selected);
    }

    /** ล้างค่า */
    clear(event: Event) {
        event.stopPropagation(); // ป้องกัน toggle dropdown
        if (this.multiple) {
            this.selected = [];
        } else {
            this.selected = undefined;
        }

        this.options.map(o => {
            o.checked = this.isSelected(o);
            return o;
        });

        this.selectedChange.emit(this.selected);
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
        return this.selectedArray.length === this.options.length;
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
            return 'text-white'
        }
    }
}
