import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  data: any;
  constructor() { }

  ngOnInit(): void {
    this.data = {characters: [], comics: [], stories: []};
    for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      let keyParts = key.split('/');
      let type = keyParts[0];
      let id = keyParts[1];
      let value = localStorage.getItem(key);
      let element = {'id': id, 'value': value};
      switch(type) {
        case 'character': {
          this.data.characters.push(element)
          break;
        }
        case 'comic': {
          this.data.comics.push(element)
          break;
        }
        case 'story': {
          this.data.stories.push(element)
          break;
        }
      }
    }
  }

}
