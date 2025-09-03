// modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ComponentsModule } from "../components-module";

type ModalType = 'confirm' | 'delete' | 'warning' | 'success';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule, ComponentsModule],
    template: `
  <!-- Overlay -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/60">

    <!-- Modal Box -->
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 relative">
      
      <!-- Header -->
      <div class="flex justify-end items-center py-2 px-4">
        <button (click)="close()" class="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer">&times;</button>
      </div>

      <!-- Content -->
      <div class="flex flex-col items-center px-6 py-2 space-y-4">
        <app-icon 
        [name]="iconName"
        [ngClass]="iconClasses + ' rounded-3xl p-2'" 
        [size]="32"
        aria-hidden="true">
        </app-icon>

        @if(title) {
            <p class="text-base text-gray-800 font-semibold">{{ title }}</p>
        }

        @if(message) {
            <p class="text-sm text-gray-800 font-normal">
              {{ message }}
            </p>
        }
      </div>

      <!-- Actions -->
      <div class="flex justify-center gap-2 p-6">
        @if(type === 'confirm' || type === 'delete') {
            <app-button (click)="close()">ยกเลิก</app-button>
            <app-button (click)="confirm()" [color]="type === 'delete' ? 'danger' : 'primary'">
                ยืนยัน
            </app-button>
        } @else if(type === 'success') {
            <app-button (click)="confirm()" [color]="'success'">
                ตกลง
            </app-button>
        } @else if(type === 'warning') {
            <app-button (click)="confirm()" [color]="'warning'">
                รับทราบ
            </app-button>
        }
      </div>

    </div>
  </div>
  `
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() title = '';
    @Input() message = '';
    @Input() type: ModalType = 'warning';
    @Output() closed = new EventEmitter<boolean>();

    ngOnInit() {
        document.body.classList.add('overflow-hidden'); // ปิด scroll
    }

    ngOnDestroy() {
        document.body.classList.remove('overflow-hidden'); // เปิด scroll เมื่อ modal ปิด
    }

    get iconName(): string {
        switch (this.type) {
            case 'delete': return 'error-circle';       // ตัวอย่าง icon ของ delete
            case 'confirm': return 'info-circle';// confirm
            case 'warning': return 'warning';   // warning
            case 'success': return 'check-circle'; // success
            default: return 'warning';
        }
    }

    get iconClasses(): string {
        switch (this.type) {
            case 'delete': return 'bg-red-100 text-red-500';
            case 'confirm': return 'bg-gray-100 text-[#B2BBC6]';
            case 'warning': return 'bg-orange-100 text-orange-400';
            case 'success': return 'bg-green-100 text-green-500';
            default: return 'bg-gray-100 text-gray-500';
        }
    }

    close() { this.closed.emit(false); }
    confirm() { this.closed.emit(true); }
}
