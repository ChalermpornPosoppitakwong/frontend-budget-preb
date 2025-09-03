import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef, ComponentRef, Type, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal-host',
    standalone: true,
    imports: [CommonModule],
    template: `
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div
        class="bg-white rounded-lg shadow-lg relative"
        [ngStyle]="{ width: widthPx }"
        >
    
        <!-- Header -->
        <div class="flex justify-between items-center p-6 border-b border-[#E7EBEE]">
            @if(title) {
                <p class="text-lg font-semibold text-gray-700">{{ title }}</p>
            }

            <button (click)="close()" class="text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer">&times;</button>
        </div>
      
        <ng-container #vc></ng-container>
    </div>
  </div>
  `
})
export class ModalHostComponent implements OnInit, OnDestroy {
    @ViewChild('vc', { read: ViewContainerRef, static: true }) vc!: ViewContainerRef;
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'xl';
    @Input() title: string = '';

    private childRef?: ComponentRef<any>;

    ngOnInit() {
        document.body.classList.add('overflow-hidden'); // ปิด scroll
    }

    ngOnDestroy() {
        document.body.classList.remove('overflow-hidden'); // เปิด scroll เมื่อ modal ปิด
    }

    get widthPx(): string {
        switch (this.size) {
            case 'sm': return '320px';
            case 'md': return '480px';
            case 'lg': return '640px';
            case 'xl': return '800px';
            case 'full': return '100%';
            default: return '480px';
        }
    }

    attach<T>(component: Type<T>): ComponentRef<T> {
        this.vc.clear();
        this.childRef = this.vc.createComponent(component);
        return this.childRef;
    }

    close() {
        this.vc.clear();
        this.childRef?.destroy();
    }
}
