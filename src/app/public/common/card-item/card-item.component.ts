import { Component, OnInit, Input } from '@angular/core';
import { routerTranAni } from '../../animations/card.animation';
import { CloudMusicService } from '../../service/cloud-music.service';
import { PlayMusicService } from '../../service/play-music.service';
import { EventBusService } from '../../service/bus-event.service';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.scss'],
    animations: [routerTranAni]
})
export class CardItemComponent implements OnInit {
    @Input() searchResultItem: any;
    @Input() type: string;
    @Input() isPlay: boolean;
    constructor(
        private cloudMusicService: CloudMusicService,
        private playMusicService: PlayMusicService,
        private eventBusService: EventBusService,
    ) { }

    ngOnInit() {
    }

    play(): void {
        this.cloudMusicService.getMusicUrl(this.searchResultItem.songId)
            .subscribe(url => {
                this.playMusicService.audioEl.src = url;
                this.playMusicService.audioEl.play();
                this.eventBusService.toggleMusic.next({ songId: this.searchResultItem.songId, isPlay: true });
            });
    }
    stop(): void {
        this.eventBusService.toggleMusic.next({ songId: this.searchResultItem.songId, isPlay: false });
        this.playMusicService.audioEl.pause();
        this.playMusicService.audioEl.src = '';
    }

}
