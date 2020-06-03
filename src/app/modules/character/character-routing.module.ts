import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterComicComponent } from './character-comic/character-comic.component';
import { CharacterStoryComponent } from './character-story/character-story.component';


const routes: Routes = [
  {
    path: 'character',
    component: CharacterComponent
  },
  {
    path: 'character-detail/:id',
    component: CharacterDetailComponent
  },
  {
    path: 'character-comic/:id',
    component: CharacterComicComponent
  },
  {
    path: 'character-story/:id',
    component: CharacterStoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
