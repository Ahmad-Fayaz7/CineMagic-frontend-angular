import { Component, OnInit } from '@angular/core';
import { FormMovieComponent } from '../form-movie/form-movie.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [FormMovieComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
})
export class EditMovieComponent {
  constructor(private activatedRout: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRout.params.subscribe((params) => {
      alert(params['id']);
    });
  }
}
