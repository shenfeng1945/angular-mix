import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventBusService } from './bus-event.service';
import { ServiceApi } from '../enum/service-api.enum';
import { finalize, switchMap } from 'rxjs/operators';
import { CloudMusicSong, OwnCloudMusicOutput, OwnCloudMusicItem, CloudMusicSongItem } from '../model/cloud-music.model';
import { of, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CloudMusicService {
    type = 'music';
    constructor(
        private httpClient: HttpClient,
        private eventBusService: EventBusService,
    ) { }
    public getCloudMusicData(val: string): Observable<OwnCloudMusicOutput> {
        const URL = `${ServiceApi.CloudMusicSong}${val}`;
        this.eventBusService.progressLoading.next(true);
        return this.httpClient.get(URL)
            .pipe(
                finalize(() => this.eventBusService.progressLoading.next(false)),
                switchMap((res: CloudMusicSong) => {
                    if (!res.result) {
                        return of([]);
                    }
                    return of(this.transformObject(res.result.songs));
                })
            );
    }
    private transformObject(res: CloudMusicSongItem[]): OwnCloudMusicOutput {
        const ownGithubSearchOutput: OwnCloudMusicOutput = new OwnCloudMusicOutput();
        const musicItems: OwnCloudMusicItem[] = [];
        if (!res || res.length <= 0) {
            return;
        }
        res.forEach((e, i) => {
            const musicItem = new OwnCloudMusicItem();
            musicItem.mvId = e.mv;
            musicItem.songId = e.id;
            musicItem.songName = e.name;
            musicItem.picUrl = e.al.picUrl;
            musicItems.push(musicItem);
        });
        ownGithubSearchOutput.items = musicItems;
        ownGithubSearchOutput.type = this.type;
        return ownGithubSearchOutput;
    }
    public getMusicUrl(id: number): any {
        const URL = `${ServiceApi.CloudMusicSongUrl}${id}`;
        return this.httpClient.get<string>(URL)
            .pipe(
                switchMap((res: any) => {
                    return of(res.data[0].url);
                })
            );
    }
}


