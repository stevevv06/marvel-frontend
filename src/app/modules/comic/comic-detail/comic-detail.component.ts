import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComicService } from '../comic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss']
})
export class ComicDetailComponent implements OnInit {
  id: number;
  item: any;
  private subscription: Subscription;

  constructor(
    private comicService: ComicService,
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
        console.log(this.item);
      });
  }

}
