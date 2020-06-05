import { Component } from '@angular/core';
import { LoaderService } from '../modules/shared/loader.service';
import { LayoutService } from '../modules/shared/layout.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent {

  constructor(
    public layoutService: LayoutService,
    public loaderService: LoaderService) {}

}
