import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PlayMusicService {
    audioEl: any;
    constructor() {
        this.audioEl = new Audio();
    }
}
