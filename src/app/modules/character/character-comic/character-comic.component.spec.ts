import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterComicComponent } from './character-comic.component';

describe('CharacterComicComponent', () => {
  let component: CharacterComicComponent;
  let fixture: ComponentFixture<CharacterComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
