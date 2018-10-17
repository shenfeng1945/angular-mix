import { Component, OnInit, Input } from '@angular/core';
import { routerTranAni } from '../../animations/card.animation';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.scss'],
    animations: [routerTranAni]
})
export class CardItemComponent implements OnInit {
    @Input() searchResultItem: any;
    @Input() type: string;
    constructor() { }

    ngOnInit() {
    }

}
