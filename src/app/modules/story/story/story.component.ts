import { Component, OnInit } from '@angular/core';
import { StoryService } from '../story.service';
import { LayoutService } from '../../shared/layout.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  data: any[];
  orderBy: string = 'id';
  orderByAsc: boolean = true;
  
  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
    private storyService: StoryService,
    public layoutService: LayoutService 
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.storyService.getAll(this.buildCriteria()).subscribe(
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
    return criteria;
  }

  toggleOrder() {
    this.orderByAsc = !this.orderByAsc;
    this.getAll();
  }

}
