import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookmarkComponent } from './bookmark-button/bookmark-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    BookmarkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    BookmarkComponent
  ],
  entryComponents: [
    BookmarkComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookmarkModule { }
