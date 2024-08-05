import { Component } from '@angular/core';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
