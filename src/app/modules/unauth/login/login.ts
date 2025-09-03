import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentsModule } from '@shared/components/components-module';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ComponentsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login {

}
