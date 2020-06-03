import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCharacterComponent } from './story-character.component';

describe('StoryCharacterComponent', () => {
  let component: StoryCharacterComponent;
  let fixture: ComponentFixture<StoryCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
