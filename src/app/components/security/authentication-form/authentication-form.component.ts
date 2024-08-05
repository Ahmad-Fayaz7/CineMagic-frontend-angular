import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';
import { userCredentials } from '../security.models';

@Component({
  selector: 'app-authentication-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.css',
})
export class AuthenticationFormComponent {
  authenticationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  @Input() action: string = 'Register';
  @Output() onSubmit = new EventEmitter<userCredentials>();

  ngOnInit() {
    this.authenticationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getEmailErrorMessage() {
    var field = this.authenticationForm.get('email');
    if (field?.hasError('required')) {
      return 'The email field is required';
    }
    if (field?.hasError('email')) {
      return 'The email is invalid';
    }
    return '';
  }
}
