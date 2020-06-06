import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ComicService } from '../comic.service';
import { LayoutService } from '../../shared/layout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic-story',
  templateUrl: './comic-story.component.html',
  styleUrls: ['./comic-story.component.scss']
})
export class ComicStoryComponent implements OnInit {

  id: number;
  item: any = {};
  data: any[];
  private subscription: Subscription;

  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
    private comicService: ComicService,
    public layoutService: LayoutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        this.get();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

  get() {
    this.comicService.get(this.id).subscribe(
      (res: any) => {
        this.item = res.data.results[0];
      });
    this.comicService.getStories(this.id, {
      limit: this.pageSize,
      offset: this.pageSize * this.page
    }).subscribe(
      (res: any) => {
        this.totalItems = res.data.total;
        this.data = res.data.results;
      });
  }

  paginate(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.get();
  }
}
