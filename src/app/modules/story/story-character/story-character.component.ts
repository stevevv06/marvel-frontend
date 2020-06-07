import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription, forkJoin, combineLatest } from 'rxjs';
import { LayoutService } from '../../shared/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-character',
  templateUrl: './story-character.component.html',
  styleUrls: ['./story-character.component.scss']
})
export class StoryCharacterComponent implements OnInit, OnDestroy {

  id: number;
  item: any = {};
  data: any[];
  private routeParamsSub: Subscription;

  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
    private storyService: StoryService,
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
    this.storyService.get(this.id).subscribe(
      (res: any) => {
        this.item = res.data.results[0];
      });
    this.storyService.getCharacters(this.id, {
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
    this.router.navigate(['/story-character',this.id], {
      queryParams: {
            page: this.page,
            pageSize: this.pageSize
        }
    });
    this.get();
  }
}
