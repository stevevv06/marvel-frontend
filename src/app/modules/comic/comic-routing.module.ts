import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicComponent } from './comic/comic.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicCharacterComponent } from './comic-character/comic-character.component';
import { ComicStoryComponent } from './comic-story/comic-story.component';


const routes: Routes = [
  {
    path: '',
    component: ComicComponent
  },
  {
    path: ':id',
    component: ComicDetailComponent
  },
  {
    path: ':id/characters',
    component: ComicCharacterComponent
  },
  {
    path: ':id/stories',
    component: ComicStoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicRoutingModule { }
