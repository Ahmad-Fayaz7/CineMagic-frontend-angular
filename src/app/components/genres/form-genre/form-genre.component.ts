import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';
import { genreCreationDto } from '../genre.model';

@Component({
  selector: 'app-form-genre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './form-genre.component.html',
  styleUrl: './form-genre.component.css',
})
export class FormGenreComponent {
  @Input() model!: genreCreationDto;
  genreForm!: FormGroup;
  @Output()
  onSaveChanges: EventEmitter<genreCreationDto> =
    new EventEmitter<genreCreationDto>();

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.genreForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    if (this.model !== undefined) {
      this.genreForm.patchValue(this.model);
    }
  }

  saveChanges() {
    //this.router.navigate(['/genres']);
    this.onSaveChanges.emit(this.genreForm.value);
  }
}
