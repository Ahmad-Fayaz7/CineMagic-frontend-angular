import { Component, Input } from '@angular/core';
import { FormActorComponent } from '../form-actor/form-actor.component';
import { actorCreationDto, actorDto } from '../actor.model';
import { ActorService } from '../actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [FormActorComponent, MaterialModule, CommonModule],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css',
})
export class EditActorComponent {
  model: actorDto | any;

  constructor(
    private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.actorService
        .getById(params['id'])
        .subscribe((actor) => (this.model = actor));
    });
  }

  saveChanges(actorCreationDto: actorCreationDto) {
    console.log(actorCreationDto);
    this.actorService
      .edit(this.model?.id, actorCreationDto)
      .subscribe(() => this.router.navigate(['/actors']));
  }
}
