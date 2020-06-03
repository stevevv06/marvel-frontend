import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicStoryComponent } from './comic-story.component';

describe('ComicStoryComponent', () => {
  let component: ComicStoryComponent;
  let fixture: ComponentFixture<ComicStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
