import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../shared/layout.service';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-character',
  templateUrl: './story-character.component.html',
  styleUrls: ['./story-character.component.scss']
})
export class StoryCharacterComponent implements OnInit {

  id: number;
  item: any = {};
  data: any[];
  private subscription: Subscription;

  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
    private storyService: StoryService,
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
    this.get();
  }
}
