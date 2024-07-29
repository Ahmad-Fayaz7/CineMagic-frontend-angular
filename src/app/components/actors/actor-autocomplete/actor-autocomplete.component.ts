import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-actor-autocomplete',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './actor-autocomplete.component.html',
  styleUrl: './actor-autocomplete.component.css',
})
export class ActorAutocompleteComponent {
  control: FormControl = new FormControl();
  selectedActors: any[] = [];
  columnsToDisplay = ['picture', 'name', 'character', 'actions'];
  actors = [
    {
      name: 'Dicaprio',
      picture:
        'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT7cOVRwz9nSmJPRgUbDR1gnGC3Eju0y_2HwH_71Czh_nA6eSpG',
      character: '',
    },

    {
      name: 'Morgan Freeman',
      picture:
        'https://goldenglobes.com/wp-content/uploads/2023/11/morgan_freeman_101.jpg?w=1318',
      character: '',
    },
    {
      name: 'Johnny Depp',
      picture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThA_67weqLzVGsU3Zym2QuSza57AwTtVfS12azWGsORWH8Y6NeIncd1CfL7FMeUD94K3Y&usqp=CAU',
      character: '',
    },
  ];
  originalActors = this.actors;
  @ViewChild(MatTable) table!: MatTable<any>;
  ngOnInit() {
    this.control.valueChanges.subscribe((value) => {
      this.actors = this.originalActors;
      this.actors = this.actors.filter(
        (actor) => actor.name.toLowerCase().indexOf(value) !== -1
      );
    });
  }

  optionSelected(selectedOption: MatAutocompleteSelectedEvent) {
    console.log(selectedOption.option.value);
    this.selectedActors.push(selectedOption.option.value);
    this.control.patchValue('');
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
