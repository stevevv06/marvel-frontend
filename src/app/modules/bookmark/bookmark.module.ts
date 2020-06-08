import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkButtonComponent } from './bookmark-button/bookmark-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookmarkRoutingModule } from './bookmark-routing.module';

@NgModule({
  declarations: [
    BookmarkComponent,
    BookmarkButtonComponent
  ],
  imports: [
    CommonModule,
    BookmarkRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatListModule
  ],
  exports: [
    BookmarkButtonComponent
  ],
  entryComponents: [
    BookmarkButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookmarkModule { }
