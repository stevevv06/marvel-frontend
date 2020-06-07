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
    path: 'stories/:id',
    component: StoryDetailComponent
  },
  {
    path: 'stories/:id/characters',
    component: StoryCharacterComponent
  },
  {
    path: 'stories/:id/comics',
    component: StoryComicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule { }
