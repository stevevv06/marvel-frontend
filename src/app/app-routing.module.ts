import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterModule } from './modules/character/character.module';
import { StoryModule } from './modules/story/story.module';
import { ComicModule } from './modules/comic/comic.module';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CharacterModule,
    ComicModule,
    StoryModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
