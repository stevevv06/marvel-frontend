import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CharacterService } from '../character.service';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ComicService } from '../../comic/comic.service';
import { StoryService } from '../../story/story.service';
import { PageEvent } from '@angular/material/paginator';
import { LayoutService } from '../../shared/layout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  data: any[];
  nameFilter: string;
  comicsFilter: any = {};
  storiesFilter: any = {};
  orderBy: string = 'name';
  orderByAsc: boolean;
  
  totalItems: number; 
  pageSize: number;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

  private routeParamsSub: Subscription;

  comicsOptions: Observable<any[]>;
  storiesOptions: Observable<any[]>;

  comicsInputCtrl = new FormControl();
  @ViewChild('comicsFilterInput') comicsFilterInput: ElementRef<HTMLInputElement>;
  @ViewChild('comicsAuto') matComicsAutoComplete: MatAutocomplete;
  storiesInputCtrl = new FormControl();
  @ViewChild('storiesFilterInput') storiesInput: ElementRef<HTMLInputElement>;
  @ViewChild('storiesAuto') matStoriesAutocomplete: MatAutocomplete;

  constructor(
    private characterService: CharacterService,
      private comicService: ComicService,
      private storyService: StoryService,
      public layoutService: LayoutService,
      private route: ActivatedRoute,
      private router: Router
    ) {
  }

  ngOnInit(): void {
    this.routeParamsSub = this.route.queryParams
        .subscribe((params) => {
          if(params) {
            this.page = params['page'] ? params['page'] : 0;
            this.pageSize = params['pageSize'] ? params['pageSize'] : 20;
            this.orderByAsc = params['orderByAsc'] ? JSON.parse(params['orderByAsc']) : true;
            this.nameFilter = params['nameFilter'] ? params['nameFilter'] : '';
            this.comicsFilter = params['comicsFilter'] ? JSON.parse(params['comicsFilter']) : {};
            this.storiesFilter = params['storiesFilter'] ? JSON.parse(params['storiesFilter']) : {};
          }
          this.getAll();
    });
    this.comicsInputCtrl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(query => {this.getComics(query)});
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  getAll() {
    this.characterService.getAll(this.buildCriteria()).subscribe(
      (res: any) => {
        this.totalItems = res.data.total;
        this.data = res.data.results
      });
  }

  private buildCriteria(): any {
    const criteria = {
      orderBy: (this.orderByAsc ? '' : '-') + this.orderBy,
      limit: this.pageSize,
      offset: this.pageSize * this.page
    };
    if(this.nameFilter !== undefined && this.nameFilter !== '') {
      criteria['nameStartsWith'] = this.nameFilter;
    }
    if(this.comicsFilter !== undefined && Object.keys(this.comicsFilter).length > 0) {
      criteria['comics'] = Object.keys(this.comicsFilter).join(',');
    }
    if(this.storiesFilter !== undefined && Object.keys(this.storiesFilter).length > 0) {
      criteria['stories'] = Object.keys(this.storiesFilter).join(',');
    }
    return criteria;
  }

  paginate(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.transition();
  }

  toggleOrder() {
    this.orderByAsc = !this.orderByAsc;
    this.transition();
  }

  transition() {
    this.router.navigate(['/characters'], {
      queryParams: {
            page: this.page,
            pageSize: this.pageSize,
            orderByAsc: this.orderByAsc,
            nameFilter: this.nameFilter,
            comicsFilter: JSON.stringify(this.comicsFilter),
            storiesFilter: JSON.stringify(this.storiesFilter)
        }
    });
    this.getAll();
  }

  getComics(filter: string) {
    this.comicsOptions = this.comicService.getAll(
      {
        titleStartsWith: filter,
        noVariants: true
      }).pipe(map((data: any) => data.data.results));
  }

  comicSelected(event: MatAutocompleteSelectedEvent): void {
    this.comicsFilter[event.option.value.id] = event.option.value.title;
    this.comicsFilterInput.nativeElement.value = '';
    this.comicsInputCtrl.setValue(null);
  }

  removeComicFilter(comicId: string): void {
     delete this.comicsFilter[comicId];
  }

  getStories(filter: string) {
    this.storiesOptions = this.storyService.getAll(
      {titleStartsWith: filter
      }).pipe(map((data: any) => data.data.results));
  }

  storySelected(event: MatAutocompleteSelectedEvent): void {
    this.comicsFilter[event.option.value.id] = event.option.value.title;
    this.comicsFilterInput.nativeElement.value = '';
    this.comicsInputCtrl.setValue(null);
  }

  removeStoryFilter(comicId: string): void {
     delete this.comicsFilter[comicId];
  }

}
