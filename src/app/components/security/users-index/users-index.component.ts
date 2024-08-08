import { Component } from '@angular/core';
import { UserDto } from '../security.models';
import { SecurityService } from '../security.service';
import { HttpResponse } from '@angular/common/http';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { MaterialModule } from '../../../material/material.module';
import { SweetAlertService } from '../../../utilities/sweet-alert/sweet-alret.service';

@Component({
  selector: 'app-users-index',
  standalone: true,
  imports: [GenericListComponent, MaterialModule],
  templateUrl: './users-index.component.html',
  styleUrl: './users-index.component.css',
})
export class UsersIndexComponent {
  constructor(
    private securityService: SecurityService,
    private sweetAlert: SweetAlertService
  ) {}
  users: UserDto[] = [];
  currentPage = 1;
  pageSize = 10;
  totalAmountOfRecords: any;
  columnsToDisplay = ['email', 'actions'];

  ngOnInit() {
    this.securityService
      .getUsers(this.currentPage, this.pageSize)
      .subscribe((httpResponse: HttpResponse<UserDto[]>) => {
        console.log(httpResponse);
        if (httpResponse.body) {
          this.users = httpResponse.body;
          console.log(this.users);
          this.totalAmountOfRecords = httpResponse.headers.get(
            'totalamountofrecords'
          );
        }
      });
  }

  async removeAdmin(userId: string) {
    const result = await this.sweetAlert.confirm(
      'Are you sure?',
      'You are taking role admin from this user!'
    );
    if (result.isConfirmed) {
      this.securityService.removeAdmin(userId).subscribe(() => {
        this.sweetAlert.success('Role admin removed from user');
      });
    }
  }
  async makeAdmin(userId: string) {
    const result = await this.sweetAlert.confirm(
      'Are you sure?',
      'You are assigning role admin to this user!'
    );
    if (result.isConfirmed) {
      this.securityService.makeAdmin(userId).subscribe(() => {
        this.sweetAlert.success('Role admin added for this user');
      });
    }
  }
}
