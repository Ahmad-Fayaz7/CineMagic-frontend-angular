import { Component, Input, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActorService } from '../actor.service';
import { movieActorDto } from '../actor.model';

@Component({
  selector: 'app-actor-autocomplete',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './actor-autocomplete.component.html',
  styleUrl: './actor-autocomplete.component.css',
})
export class ActorAutocompleteComponent {
  control: FormControl = new FormControl();
  selectedActors: movieActorDto[] = [];
  @Input() actorsToDisplay: movieActorDto[] = [];
  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  constructor(private actorService: ActorService) {}

  @ViewChild(MatTable) table!: MatTable<any>;
  ngOnInit() {
    this.control.valueChanges.subscribe((value) => {
      this.actorService.SearchByName(value).subscribe((actors) => {
        this.actorsToDisplay = actors;
      });
    });
  }

  optionSelected(selectedOption: MatAutocompleteSelectedEvent) {
    console.log(selectedOption.option.value);
    this.control.patchValue('');

    if (
      this.selectedActors.findIndex(
        (x) => x.id == selectedOption.option.value.id
      ) !== -1
    ) {
      return;
    }

    this.selectedActors.push(selectedOption.option.value);
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  remove(actor: any) {
    const index = this.selectedActors.findIndex((a) => a.name === actor.name);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.selectedActors.findIndex(
      (actor) => actor === event.item.data
    );
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
