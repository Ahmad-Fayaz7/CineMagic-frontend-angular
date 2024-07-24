import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { actorDto } from '../actor.model';
import { ActorService } from '../actor.service';
import { GenericListComponent } from '../../utils/generic-list/generic-list.component';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index-actor',
  standalone: true,
  imports: [RouterLink, MaterialModule, GenericListComponent],
  templateUrl: './index-actor.component.html',
  styleUrl: './index-actor.component.css',
})
export class IndexActorComponent {
  delete(id: number) {
    this.actorService.delete(id).subscribe(() => {
      this.loadData();
      this.router.navigate(['/actors']);
    });
  }
  actors: actorDto[] = [];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords: string | null = null;
  currentPage = 1;
  pageSize = 5;

  constructor(private actorService: ActorService, private router: Router) {}

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.actorService
      .getActors(this.currentPage, this.pageSize)
      .subscribe((response: HttpResponse<actorDto[]>) => {
        if (response.body) {
          this.actors = response.body;
        } else {
          this.actors = [];
        }
        this.totalAmountOfRecords = response.headers.get(
          'totalAmountOfRecords'
        );
      });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}
