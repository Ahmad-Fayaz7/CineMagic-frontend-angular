import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthorizeViewComponent } from '../security/authorize-view/authorize-view.component';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, AuthorizeViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(
    public securityService: SecurityService,
    private router: Router
  ) {}

  logout() {
    this.securityService.logout();
    this.router.navigate(['/login']);
  }
}
