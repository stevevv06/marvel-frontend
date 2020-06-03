import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicCharacterComponent } from './comic-character.component';

describe('ComicCharacterComponent', () => {
  let component: ComicCharacterComponent;
  let fixture: ComponentFixture<ComicCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
