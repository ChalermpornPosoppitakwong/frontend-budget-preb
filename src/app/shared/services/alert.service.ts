import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, createComponent } from '@angular/core';
import { AlertComponent, AlertType } from '@shared/components/alert/alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private alertRef?: ComponentRef<AlertComponent>;

    constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) { }

    private ensureAlertComponent() {
        if (!this.alertRef) {
            this.alertRef = createComponent(AlertComponent, { environmentInjector: this.injector });
            this.appRef.attachView(this.alertRef.hostView);
            document.body.appendChild(this.alertRef.location.nativeElement);
        }
    }

    show(message: string, type: AlertType = 'info', duration = 5000) {
        this.ensureAlertComponent();
        this.alertRef!.instance.add(message, type, duration);
    }

    success(message: string, duration = 5000) { this.show(message, 'success', duration); }
    error(message: string, duration = 5000) { this.show(message, 'error', duration); }
    warning(message: string, duration = 5000) { this.show(message, 'warning', duration); }
    info(message: string, duration = 5000) { this.show(message, 'info', duration); }
}
