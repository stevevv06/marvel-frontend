import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStoryComponent } from './character-story.component';

describe('CharacterStoryComponent', () => {
  let component: CharacterStoryComponent;
  let fixture: ComponentFixture<CharacterStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
