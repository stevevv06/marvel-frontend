import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoryComponent } from './story/story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryCharacterComponent } from './story-character/story-character.component';
import { StoryComicComponent } from './story-comic/story-comic.component';
import { StoryService } from './story.service';

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
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { BookmarkModule } from '../bookmark/bookmark.module';

@NgModule({
  declarations: [StoryComponent, StoryDetailComponent, StoryCharacterComponent, StoryComicComponent],
  imports: [
    CommonModule,
    StoryRoutingModule,
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
    MatSelectModule,
    MatBadgeModule,
    MatListModule,
    BookmarkModule
  ],
  providers: [
    StoryService
  ]
})
export class StoryModule { }
