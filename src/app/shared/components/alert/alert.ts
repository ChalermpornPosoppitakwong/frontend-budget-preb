import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Icon } from '../icon/icon';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface IAlert {
    id: number;
    message: string;
    type: AlertType;
    duration?: number; // ms
    closing?: boolean; // สำหรับ fade-out
}

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule, Icon],
    template: `
        <div class="fixed top-28 right-8 flex flex-col gap-2 z-50">
            @for(alert of alerts; track alert) {
                <div
                    [ngClass]="[alertClasses(alert.type), alert.closing ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0']"
                    class="p-4 rounded-sm shadow-lg flex items-center bg-white justify-between min-w-[480px] max-w-xs transform transition-all duration-300">
                    
                    <div class="flex items-center gap-2">
                    <!-- icon -->
                    <app-icon [name]="iconName(alert.type)"
                                [ngClass]="iconClasses(alert.type)"
                                [size]="24" aria-hidden="true">
                    </app-icon>
    
                    <!-- message -->
                    <span class="text-gray-700 text-sm font-normal">{{ alert.message }}</span>
                    </div>
    
                    <!-- close button -->
                    <button class="ml-2 font-bold cursor-pointer" (click)="remove(alert.id)">&times;</button>
                </div>
            }
        </div>
  `,
})
export class AlertComponent {
    alerts: IAlert[] = [];
    private counter = 0;

    add(message: string, type: AlertType = 'info', duration = 3000) {
        const id = ++this.counter;
        const alert: IAlert = { id, message, type };
        this.alerts.push(alert);

        if (duration > 0) {
            setTimeout(() => this.remove(id), duration);
        }
    }

    remove(id: number) {
        const alert = this.alerts.find(a => a.id === id);
        if (!alert) return;

        alert.closing = true;
        setTimeout(() => {
            this.alerts = this.alerts.filter(a => a.id !== id);
        }, 300); // duration ของ transition
    }

    alertClasses(type: AlertType): string {
        switch (type) {
            case 'success': return 'border-l-[3px] border-green-600';
            case 'error': return 'border-l-[3px] border-red-600';
            case 'warning': return 'border-l-[3px] border-yellow-600';
            case 'info': return 'border-l-[3px] border-blue-600';
            default: return 'border-l-[3px] border-gray-600';
        }
    }

    iconName(type: AlertType): string {
        switch (type) {
            case 'error': return 'error-circle';       // error
            case 'info': return 'info-circle';// info
            case 'warning': return 'warning';   // warning
            case 'success': return 'check-circle'; // success
            default: return 'warning';
        }
    }

    iconClasses(type: AlertType): string {
        switch (type) {
            case 'error': return 'text-red-600';
            case 'info': return 'text-blue-600';
            case 'warning': return 'text-orange-400';
            case 'success': return 'text-green-600';
            default: return 'text-gray-500';
        }
    }
}
