import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss']
})
export class BookmarkButtonComponent implements OnInit {

  private _id: string;
  private _type: string;
  private _value: string;

  @Input()
  set id(id: string){this._id = id; this.isBookmarked();}
  get id(): string{ return this._id;}
  @Input()
  set type(type: string){this._type = type; this.isBookmarked();}
  get type(): string{ return this._type;}
  @Input()
  set value(value: string){this._value = value; this.isBookmarked();}
  get value(): string{ return this._value;}

  public bookmarked:boolean = false;
  private key: string;
  private keySeparator:string = '/';

  constructor() { }

  ngOnInit(): void {
  }

  bookmark() {
    this.key = this._type + this.keySeparator + this._id;
    this.bookmarked = !this.bookmarked;
    if(this.bookmarked) {
      localStorage.setItem(this.key, this._value);
    } else {
      localStorage.removeItem(this.key);
    }
    
  }

  isBookmarked() {
    this.key = this._type + this.keySeparator + this._id;
    console.log("isbookmark before: " +this.key + ',' +this.bookmarked);
    let stored = localStorage.getItem(this.key);
    if(stored) {
      this.bookmarked = true;
    } else {
      this.bookmarked = false;
    }
    console.log('isbookmark after: '+this.bookmarked);
  }
}
