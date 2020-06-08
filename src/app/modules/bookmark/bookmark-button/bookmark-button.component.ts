import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss']
})
export class BookmarkComponent implements OnInit {

  @Input()
  id: string;
  @Input()
  type: string;
  @Input()
  value: string;
  public bookmarked:boolean = false;
  private key: string;
  private keySeparator:string = '/';

  constructor() { }

  ngOnInit(): void {
    this.isBookmarked();
  }

  bookmark() {
    this.key = this.type + this.keySeparator + this.id;
    this.bookmarked = !this.bookmarked;
    if(this.bookmarked) {
      localStorage.setItem(this.key, this.value);
    } else {
      localStorage.removeItem(this.key);
    }
    
  }

  private isBookmarked() {
    this.key = this.type + this.keySeparator + this.id;
    let stored = localStorage.getItem(this.key);
    if(stored) {
      this.bookmarked = true;
    } else {
      this.bookmarked = false;
    }
  }
}
