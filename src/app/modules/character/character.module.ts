import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character/character.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterComicComponent } from './character-comic/character-comic.component';
import { CharacterStoryComponent } from './character-story/character-story.component';


@NgModule({
  declarations: [CharacterComponent, CharacterDetailComponent, CharacterComicComponent, CharacterStoryComponent],
  imports: [
    CommonModule,
    CharacterRoutingModule
  ]
})
export class CharacterModule { }
