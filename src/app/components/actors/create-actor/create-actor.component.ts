import { Component } from '@angular/core';
import { FormActorComponent } from '../form-actor/form-actor.component';
import { actorCreationDto } from '../actor.model';
import { ActorService } from '../actor.service';
import { Router } from '@angular/router';
import { parseWebAPIErros } from '../../utils/utility-functions';
import { DisplayErrorsComponent } from '../../utils/display-errors/display-errors.component';

@Component({
  selector: 'app-create-actor',
  standalone: true,
  imports: [FormActorComponent, DisplayErrorsComponent],
  templateUrl: './create-actor.component.html',
  styleUrl: './create-actor.component.css',
})
export class CreateActorComponent {
  errors: string[] = [];
  constructor(private actorService: ActorService, private router: Router) {}
  saveChanges(actorCreationDto: actorCreationDto) {
    this.actorService.create(actorCreationDto).subscribe(
      () => this.router.navigate(['/actors']),
      (error) => (this.errors = parseWebAPIErros(error))
    );
  }
}
