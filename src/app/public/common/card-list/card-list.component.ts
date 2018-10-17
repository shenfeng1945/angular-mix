import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../service/bus-event.service';
import { OwnGithubSearchOutput } from '../../model/github-item.model';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
    searchResult: OwnGithubSearchOutput = new OwnGithubSearchOutput();
    a = 12.111;
    constructor(
        private eventBusService: EventBusService
    ) { }

    ngOnInit() {
        this.eventBusService.searchResult.subscribe(val => {
            this.searchResult = val;
        });
    }

}
