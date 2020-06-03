import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryComicComponent } from './story-comic.component';

describe('StoryComicComponent', () => {
  let component: StoryComicComponent;
  let fixture: ComponentFixture<StoryComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
