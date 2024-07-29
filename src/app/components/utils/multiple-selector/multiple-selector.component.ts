import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { multipleSelectorModel } from './multiple-selector.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multiple-selector',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './multiple-selector.component.html',
  styleUrl: './multiple-selector.component.css',
})
export class MultipleSelectorComponent {
  @Input() selectedItems: multipleSelectorModel[] = [];
  @Input() nonSelectedItems: multipleSelectorModel[] = [];

  deselect(item: multipleSelectorModel, index: number) {
    this.nonSelectedItems.push(item);
    this.selectedItems.splice(index, 1);
  }
  select(item: multipleSelectorModel, index: number) {
    this.selectedItems.push(item);
    this.nonSelectedItems.splice(index, 1);
  }

  deselectAll() {
    this.nonSelectedItems.push(...this.selectedItems);
    this.selectedItems = [];
  }
  selectAll() {
    this.selectedItems.push(...this.nonSelectedItems);
    this.nonSelectedItems = [];
  }
}
