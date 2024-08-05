import { Component } from '@angular/core';
import { AuthenticationFormComponent } from '../authentication-form/authentication-form.component';
import { SecurityService } from '../security.service';
import { userCredentials } from '../security.models';
import { use } from 'marked';
import { Router } from '@angular/router';
import { parseWebAPIErros } from '../../utils/utility-functions';
import { DisplayErrorsComponent } from '../../utils/display-errors/display-errors.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationFormComponent, DisplayErrorsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  errors: string[] = [];

  login(userCredentials: userCredentials) {
    this.securityService.login(userCredentials).subscribe(
      (authenticationResponse) => {
        this.securityService.saveToken(authenticationResponse);
        this.router.navigate(['/']);
      },
      (error) => (this.errors = parseWebAPIErros(error))
    );
  }
}
