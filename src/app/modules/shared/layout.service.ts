import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';


@Injectable()
export class LayoutService {
    isHandsetPortrait: Observable<boolean> = this.breakpointObserver.observe(
      Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isHandset: Observable<boolean> = this.breakpointObserver.observe(
      [Breakpoints.Handset, Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait, Breakpoints.HandsetLandscape])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {}
}
