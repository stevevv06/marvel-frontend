import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CharacterService } from '../character.service';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ComicService } from '../../comic/comic.service';
import { StoryService } from '../../story/story.service';
import { PageEvent } from '@angular/material/paginator';
import { LayoutService } from '../../shared/layout.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  data: any[];
  nameFilter: string = '';
  comicsFilter: Map<string, string> = new Map();
  storiesFilter: Map<string, string> = new Map();
  orderBy: string = 'name';
  orderByAsc: boolean = true;
  
  totalItems: number; 
  pageSize: number = 20;
  pageSizeOptions: number[] = [20, 50, 100];
  page: number;

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
      public layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.comicsInputCtrl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(query => {this.getComics(query)});
    this.getAll();
  }

  getAll() {
    this.characterService.getAll(this.buildCriteria()).subscribe(
      (res: any) => {
        this.totalItems = res.data.total;
        this.data = res.data.results
      });
  }

  paginate(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAll();
  }

  private buildCriteria(): any {
    const criteria = {
      orderBy: (this.orderByAsc ? '' : '-') + this.orderBy,
      limit: this.pageSize,
      offset: this.pageSize * this.page
    };
    if(this.nameFilter !== null && this.nameFilter !== '') {
      criteria['nameStartsWith'] = this.nameFilter;
    }
    if(this.comicsFilter !== undefined && this.comicsFilter.size > 0) {
      criteria['comics'] = Array.from(this.comicsFilter.keys()).join(',');
    }
    if(this.storiesFilter !== undefined && this.storiesFilter.size > 0) {
      criteria['stories'] = Array.from(this.storiesFilter.keys()).join(',');
    }
    return criteria;
  }

  toggleOrder() {
    this.orderByAsc = !this.orderByAsc;
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
    this.comicsFilter.set(event.option.value.id, event.option.value.title);
    this.comicsFilterInput.nativeElement.value = '';
    this.comicsInputCtrl.setValue(null);
  }

  removeComicFilter(comicId: string): void {
     this.comicsFilter.delete(comicId);
  }

  getStories(filter: string) {
    this.storiesOptions = this.storyService.getAll(
      {titleStartsWith: filter
      }).pipe(map((data: any) => data.data.results));
  }

  storySelected(event: MatAutocompleteSelectedEvent): void {
    this.comicsFilter.set(event.option.value.id, event.option.value.title);
    this.comicsFilterInput.nativeElement.value = '';
    this.comicsInputCtrl.setValue(null);
  }

  removeStoryFilter(comicId: string): void {
     this.comicsFilter.delete(comicId);
  }

}
