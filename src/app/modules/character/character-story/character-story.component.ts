import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharacterService } from '../character.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { LayoutService } from '../../shared/layout.service';

@Component({
  selector: 'app-character-story',
  templateUrl: './character-story.component.html',
  styleUrls: ['./character-story.component.scss']
})
export class CharacterStoryComponent implements OnInit {

  id: number;
  item: any = {};
  data: any[];
  private subscription: Subscription;

  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  constructor(
    private characterService: CharacterService,
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
    this.get();
  }
}
