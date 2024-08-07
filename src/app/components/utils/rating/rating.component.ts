import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { SecurityService } from '../../security/security.service';
import { SweetAlertService } from '../../../utilities/sweet-alert/sweet-alret.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  constructor(
    private securityService: SecurityService,
    private sweetAlert: SweetAlertService
  ) {}
  @Input() selectedRate: number = 0;
  maxRating: number = 5;
  previousSelection: number = 0;
  maxRatingArr: number[] = [];

  @Output() onRating: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }
  rate(index: number) {
    if (this.securityService.isAuthenticated()) {
      this.selectedRate = index + 1;
      this.previousSelection = this.selectedRate;
      this.onRating.emit(this.previousSelection);
    } else {
      this.sweetAlert.error('You need to log in before rating!');
    }
  }
  handleMouseLeave() {
    if (this.previousSelection != 0) {
      this.selectedRate = this.previousSelection;
    } else {
      this.selectedRate = 0;
    }
  }
  handleMouseEnter(index: number) {
    this.selectedRate = index + 1;
  }
}
