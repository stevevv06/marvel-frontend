import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComicService } from '../../comic/comic.service';
import { PageEvent } from '@angular/material/paginator';
import { LayoutService } from '../../shared/layout.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss']
})
export class ComicComponent implements OnInit {

  data: any[];
  titleFilter: string = '';
  formatFilter: string = '';
  issueNumberFilter: string = '';
  orderBy: string = 'issueNumber';
  orderByAsc: boolean = true;
  
  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
      private comicService: ComicService,
      public layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.comicService.getAll(this.buildCriteria()).subscribe(
      (res: any) => {
        this.totalItems = res.data.total;
        this.data = res.data.results
      });
  }

  paginate(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAll();
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

  toggleOrder() {
    this.orderByAsc = !this.orderByAsc;
    this.getAll();
  }
}
