import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';


const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () => import('./modules/character/character.module').then(m => m.CharacterModule)
  },
  {
    path: 'comics',
    loadChildren: () => import('./modules/comic/comic.module').then(m => m.ComicModule)
  },
  {
    path: 'stories',
    loadChildren: () => import('./modules/story/story.module').then(m => m.StoryModule)
  },
    
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: AppHomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
