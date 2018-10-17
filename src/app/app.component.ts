import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavBarList } from './public/model/navbar.model';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public navbarList: NavBarList[] = [];
    public mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit(): void {
        this.initMockData();
    }
    private initMockData(): void {
        this.navbarList = Array.from({ length: 2 }, (_, i) => {
            const temp = new NavBarList();
            switch (i) {
                case 0:
                    temp.name = 'github搜索';
                    temp.path = '/githubsearch';
                    break;
                case 1:
                    temp.name = '网易云音乐';
                    temp.path = '/cloudmusic';
                    break;
                default:
                    break;
            }
            return temp;
        });
    }
}
