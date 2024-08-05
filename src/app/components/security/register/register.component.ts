import { Component } from '@angular/core';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';
import { userCredentials } from '../security.models';
import { SecurityService } from '../security.service';
import { parseWebAPIErros } from '../../utils/utility-functions';
import { DisplayErrorsComponent } from '../../utils/display-errors/display-errors.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthenticationFormComponent, DisplayErrorsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private securityService: SecurityService) {}
  errors: string[] = [];
  register(userCredentials: userCredentials) {
    this.errors = [];
    this.securityService.register(userCredentials).subscribe(
      (autheticationResponse) => {
        console.log(autheticationResponse);
      },
      (error) => (this.errors = parseWebAPIErros(error))
    );
  }
}
