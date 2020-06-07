import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoryService } from '../story.service';
import { LayoutService } from '../../shared/layout.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, OnDestroy {

  data: any[];
  orderBy: string = 'id';
  orderByAsc: boolean = true;
  
  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  private routeParamsSub: Subscription;

  constructor(
    private storyService: StoryService,
    public layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeParamsSub = this.route.queryParams
        .subscribe((params) => {
          if(params) {
            this.page = params['page'] ? params['page'] : 0;
            this.pageSize = params['pageSize'] ? params['pageSize'] : 20;
            this.orderByAsc = params['orderByAsc'] ? JSON.parse(params['orderByAsc']) : true;
          }
          this.getAll();
    });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  getAll() {
    this.storyService.getAll(this.buildCriteria()).subscribe(
      (res: any) => {
        this.totalItems = res.data.total;
        this.data = res.data.results
      });
  }

  private buildCriteria(): any {
    const criteria = {
      orderBy: (this.orderByAsc ? '' : '-') + this.orderBy,
      limit: this.pageSize,
      offset: this.pageSize * this.page
    };
    return criteria;
  }

  paginate(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.transition();
  }

  toggleOrder() {
    this.orderByAsc = !this.orderByAsc;
    this.transition();
  }

  transition() {
    this.router.navigate(['/story'], {
      queryParams: {
            page: this.page,
            pageSize: this.pageSize,
            orderByAsc: this.orderByAsc
        }
    });
    this.getAll();
  }

}
