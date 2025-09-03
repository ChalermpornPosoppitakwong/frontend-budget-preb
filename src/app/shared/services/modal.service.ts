// modal.service.ts
import { Injectable, ComponentRef, ApplicationRef, EnvironmentInjector, createComponent, Type } from '@angular/core';
import { ModalHostComponent } from '@shared/components/modal/modal-host.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

interface IModalOption {
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    outputs?: string[];
}

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modalRef?: ComponentRef<ModalComponent>;
    private hostRef?: ComponentRef<ModalHostComponent>;

    constructor(private environmentInjector: EnvironmentInjector, private appRef: ApplicationRef) { }

    private open(type: 'confirm' | 'delete' | 'warning' | 'success', title: string, message: string): Promise<boolean> {
        return new Promise(resolve => {
            if (this.modalRef) return resolve(false); // ถ้ามี modal เปิดอยู่แล้ว

            this.modalRef = createComponent(ModalComponent, { environmentInjector: this.environmentInjector });
            this.modalRef.instance.type = type;
            this.modalRef.instance.title = title;
            this.modalRef.instance.message = message;

            this.modalRef.instance.closed.subscribe(result => {
                this.closeModal();
                resolve(result);
            });

            this.appRef.attachView(this.modalRef.hostView);
            document.body.appendChild(this.modalRef.location.nativeElement);
        });
    }

    confirm(title: string = 'ต้องการยืนยัน ก่อนทำรายการ', message = ''): Promise<boolean> {
        return this.open('confirm', title, message);
    }

    warning(title: string = 'รายละเอียด การแจ้งเตือน', message = ''): Promise<boolean> {
        return this.open('warning', title, message);
    }

    success(title: string = 'ทำรายการสำเร็จ', message = 'ทำรายการสำเร็จ'): Promise<boolean> {
        return this.open('success', title, message);
    }

    delete(): Promise<boolean> {
        return this.open('delete', 'ยืนยันการลบรายการ', 'ต้องการลบรายการที่เลือกนี้ ใช่หรือไม่ ?');
    }

    openCustom<T>(
        component: Type<T>,
        options: IModalOption = {}
    ): Promise<{ event: string; value: any }> {
        return new Promise((resolve) => {
            // สร้าง host
            this.hostRef = createComponent(ModalHostComponent, {
                environmentInjector: this.environmentInjector,
            });

            if (options.size) {
                this.hostRef.instance.size = options.size;
            }

            this.hostRef.instance.title = options.title || '';

            this.appRef.attachView(this.hostRef.hostView);
            document.body.appendChild(this.hostRef.location.nativeElement);

            const childRef = this.hostRef.instance.attach(component);

            if (options.outputs) {
                options.outputs.forEach((outputName: string) => {
                    const emitter = (childRef.instance as any)[outputName];
                    if (emitter && emitter.subscribe) {
                        emitter.subscribe((value: any) => {
                            resolve({ event: outputName, value });
                            // ปิด modal แบบถูกต้อง
                            this.close();
                        });
                    }
                });
            }

            const originalClose = this.hostRef.instance.close.bind(this.hostRef.instance);
            this.hostRef.instance.close = () => {
                originalClose(); // clear child component
                this.close();     // detach host view และ destroy
                resolve({ event: 'close', value: null });
            };
        });
    }


    closeModal() {
        if (!this.modalRef) return;
        this.appRef.detachView(this.modalRef.hostView);
        this.modalRef.destroy();
        this.modalRef = undefined;
    }

    close() {
        if (this.hostRef) {
            this.appRef.detachView(this.hostRef.hostView);
            this.hostRef.destroy();
            this.hostRef = undefined;
        }
    }
}
