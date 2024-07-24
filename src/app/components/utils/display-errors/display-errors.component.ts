import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-errors.component.html',
  styleUrl: './display-errors.component.css',
})
export class DisplayErrorsComponent {
  @Input()
  erros: string[] = [];
}
