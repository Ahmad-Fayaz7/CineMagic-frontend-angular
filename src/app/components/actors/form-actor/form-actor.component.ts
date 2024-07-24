import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { Router, RouterLink } from '@angular/router';
import { actorCreationDto } from '../actor.model';
import { InputImageComponent } from '../../utils/input-image/input-image.component';
import { InputMarkdownComponent } from '../../utils/input-markdown/input-markdown.component';

@Component({
  selector: 'app-form-actor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    RouterLink,
    InputImageComponent,
    InputMarkdownComponent,
  ],
  templateUrl: './form-actor.component.html',
  styleUrl: './form-actor.component.css',
})
export class FormActorComponent {
  changeMarkdown(content: any) {
    this.actorForm.get('biography')?.setValue(content);
  }
  @Input() model: any;

  @Output()
  dataEmiter: EventEmitter<actorCreationDto> =
    new EventEmitter<actorCreationDto>();

  actorForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.actorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateOfBirth: '',
      picture: File,
      biography: '',
    });
    if (this.model !== undefined) {
      this.actorForm.patchValue(this.model);
      console.log(this.model);
    }
  }

  saveChanges() {
    this.model = this.actorForm.value;
    this.dataEmiter.emit(this.model);
  }
  onImageSelected(image: File) {
    this.actorForm.get('picture')?.setValue(image);
  }

  getErrorMessageForName() {
    const field = this.actorForm.get('name');
    if (field?.hasError('required')) {
      return 'The name field is required';
    }
    return '';
  }
}
