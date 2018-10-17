import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    @Output() playHandle: EventEmitter<void> = new EventEmitter();
    @Output() stopHandle: EventEmitter<void> = new EventEmitter();
    @Input() isPlay: boolean;
    constructor() { }

    ngOnInit() {
    }
    onplay(): void {
        this.playHandle.emit();
    }
    onpause() {
        this.stopHandle.emit();
    }

}
