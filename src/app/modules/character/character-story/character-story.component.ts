import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, combineLatest } from 'rxjs';
import { CharacterService } from '../character.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { LayoutService } from '../../shared/layout.service';

@Component({
  selector: 'app-character-story',
  templateUrl: './character-story.component.html',
  styleUrls: ['./character-story.component.scss']
})
export class CharacterStoryComponent implements OnInit, OnDestroy {

  id: number;
  item: any = {};
  data: any[];
  private routeParamsSub: Subscription;

  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
    private characterService: CharacterService,
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
    this.characterService.get(this.id).subscribe(
      (res: any) => {
        this.item = res.data.results[0];
      });
    this.characterService.getStories(this.id, {
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
    this.router.navigate(['/characters',this.id,'stories'], {
      queryParams: {
            page: this.page,
            pageSize: this.pageSize
        }
    });
    this.get();
  }
}
