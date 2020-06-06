import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../character.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {

  id: number;
  item: any = {};
  private subscription: Subscription;

  constructor(
    private characterService: CharacterService,
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
  }
}
