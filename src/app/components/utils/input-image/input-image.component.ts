import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64 } from '../utility-functions';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-input-image',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './input-image.component.html',
  styleUrl: './input-image.component.css',
})
export class InputImageComponent {
  imageBase64: any;
  @Input() urlCurrentImage: any;
  @Output() onImageSelected: EventEmitter<File> = new EventEmitter<File>();
  change(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      toBase64(file).then((value) => (this.imageBase64 = value));
      this.onImageSelected.emit(file);
      this.urlCurrentImage = null;
    }
  }
}
