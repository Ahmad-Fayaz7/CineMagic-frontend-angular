import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorize-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authorize-view.component.html',
  styleUrl: './authorize-view.component.css',
})
export class AuthorizeViewComponent {
  constructor(private securityService: SecurityService) {}
  @Input() role!: string;
  isAuthorized() {
    if (this.role) {
      return this.securityService.getRole() === this.role;
    } else {
      return this.securityService.isAuthenticated();
    }
  }
}
