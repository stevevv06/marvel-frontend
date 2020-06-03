import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicRoutingModule } from './comic-routing.module';
import { ComicComponent } from './comic/comic.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicCharacterComponent } from './comic-character/comic-character.component';
import { ComicStoryComponent } from './comic-story/comic-story.component';


@NgModule({
  declarations: [ComicComponent, ComicDetailComponent, ComicCharacterComponent, ComicStoryComponent],
  imports: [
    CommonModule,
    ComicRoutingModule
  ]
})
export class ComicModule { }
