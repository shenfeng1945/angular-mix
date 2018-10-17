import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-github-search',
    templateUrl: './github-search.component.html',
    styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit {
    placeholderTitle: string;
    type: string;
    constructor() { }

    ngOnInit() {
        this.placeholderTitle = 'github搜索';
        this.type = 'github';
    }

}
