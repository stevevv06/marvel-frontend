import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription, forkJoin, combineLatest } from 'rxjs';
import { ComicService } from '../comic.service';
import { LayoutService } from '../../shared/layout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comic-story',
  templateUrl: './comic-story.component.html',
  styleUrls: ['./comic-story.component.scss']
})
export class ComicStoryComponent implements OnInit, OnDestroy {

  id: number;
  item: any = {};
  data: any[];
  private routeParamsSub: Subscription;

  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
    private comicService: ComicService,
    public layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeParamsSub = combineLatest(this.route.params, this.route.queryParams, 
      (p, qp) => ({ p, qp }))
      .subscribe((params) => {
        this.id = params.p['id'];
        this.page = params.qp['page'] ? params.qp['page'] : 0;
        this.pageSize = params.qp['pageSize'] ? params.qp['pageSize'] : 20;
        this.get();
    });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
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
    this.transition();
  }

  transition() {
    this.router.navigate(['/comic-story',this.id], {
      queryParams: {
            page: this.page,
            pageSize: this.pageSize
        }
    });
    this.get();
  }
}
