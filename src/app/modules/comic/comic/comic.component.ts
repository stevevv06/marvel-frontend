import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ComicService } from '../../comic/comic.service';
import { PageEvent } from '@angular/material/paginator';
import { LayoutService } from '../../shared/layout.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent implements OnInit, OnDestroy {

  data: any[];
  titleFilter: string;
  formatFilter: string;
  issueNumberFilter: string;
  orderBy: string = 'issueNumber';
  orderByAsc: boolean;
  
  totalItems: number; 
  pageSize: number;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  private routeParamsSub: Subscription;

  constructor(
      private comicService: ComicService,
      public layoutService: LayoutService,
      private route: ActivatedRoute,
      private router: Router) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.queryParams
        .subscribe((params) => {
          if(params) {
            this.page = params['page'] ? params['page'] : 0;
            this.pageSize = params['pageSize'] ? params['pageSize'] : 20;
            this.orderByAsc = params['orderByAsc'] ? JSON.parse(params['orderByAsc']) : true;
            this.titleFilter = params['titleFilter'] ? params['titleFilter'] : '';
            this.formatFilter = params['formatFilter'] ? params['formatFilter'] : '';
            this.issueNumberFilter = params['issueNumberFilter'] ? params['issueNumberFilter'] : '';
          }
          this.getAll();
    });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  getAll() {
    this.comicService.getAll(this.buildCriteria()).subscribe(
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
    if(this.titleFilter !== null && this.titleFilter !== '') {
      criteria['titleStartsWith'] = this.titleFilter;
    }
    if(this.formatFilter !== null && this.formatFilter !== '') {
      criteria['format'] = this.formatFilter;
    }
    if(this.issueNumberFilter !== null && this.issueNumberFilter !== '') {
      criteria['issueNumber'] = this.issueNumberFilter;
    }
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
    this.router.navigate(['/comics'], {
      queryParams: {
            page: this.page,
            pageSize: this.pageSize,
            orderByAsc: this.orderByAsc,
            titleFilter: this.titleFilter,
            formatFilter: this.formatFilter,
            issueNumberFilter: this.issueNumberFilter
        }
    });
    this.getAll();
  }
}
