import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthorizeViewComponent } from '../security/authorize-view/authorize-view.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, AuthorizeViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
