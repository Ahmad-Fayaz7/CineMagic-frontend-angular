import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenu } from '@angular/material/menu';
import { MenuComponent } from './components/menu/menu.component';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatMenu,
    MenuComponent,
    MovieListComponent,
    RouterOutlet,
  ], // Import CommonModule and RouterModule if using routing
})
export class AppComponent {
  title = 'cine-magic';
}
