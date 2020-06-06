import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoryService } from '../story.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit {

  id: number;
  item: any = {};
  private subscription: Subscription;

  constructor(
    private storyService: StoryService,
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
  }
}
