import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryComponent } from './story/story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryCharacterComponent } from './story-character/story-character.component';
import { StoryComicComponent } from './story-comic/story-comic.component';


const routes: Routes = [
  {
    path: '',
    component: StoryComponent
  },
  {
    path: ':id',
    component: StoryDetailComponent
  },
  {
    path: ':id/characters',
    component: StoryCharacterComponent
  },
  {
    path: ':id/comics',
    component: StoryComicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule { }
