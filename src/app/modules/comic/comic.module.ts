import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicRoutingModule } from './comic-routing.module';
import { ComicComponent } from './comic/comic.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ComicCharacterComponent } from './comic-character/comic-character.component';
import { ComicStoryComponent } from './comic-story/comic-story.component';
import { ComicService } from './comic.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ComicComponent, ComicDetailComponent, ComicCharacterComponent, ComicStoryComponent],
  imports: [
    CommonModule,
    ComicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ScrollingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSelectModule
  ],
  providers: [
    ComicService
  ]
})
export class ComicModule { }
