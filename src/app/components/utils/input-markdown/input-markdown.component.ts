import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-input-markdown',
  standalone: true,
  providers: [],
  imports: [MaterialModule, FormsModule, CommonModule, MarkdownModule],
  templateUrl: './input-markdown.component.html',
  styleUrl: './input-markdown.component.css',
})
export class InputMarkdownComponent {
  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();
  @Input() markdownContent = '';
}
