import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoryComponent } from './story/story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryCharacterComponent } from './story-character/story-character.component';
import { StoryComicComponent } from './story-comic/story-comic.component';


@NgModule({
  declarations: [StoryComponent, StoryDetailComponent, StoryCharacterComponent, StoryComicComponent],
  imports: [
    CommonModule,
    StoryRoutingModule
  ]
})
export class StoryModule { }
