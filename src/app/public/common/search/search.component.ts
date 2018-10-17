import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, pluck, map, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { GithubApiService } from '../../service/github-api.service';
import { EventBusService } from '../../service/bus-event.service';
import { CloudMusicService } from '../../service/cloud-music.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Input() placeholderTitle: string;
    @Input() type: string;
    @ViewChild('searchInput') searchInput: ElementRef;
    constructor(
        private githubApiService: GithubApiService,
        private eventBusService: EventBusService,
        private cloudMusicService: CloudMusicService,
    ) { }

    ngOnInit() {
        this.getSearchValue().subscribe(val => {
            this.eventBusService.searchResult.next(val);
        });
    }
    private getSearchValue(): Observable<any> {
        return fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                // 优化事件流，在一定的时间内多次keyup事件会被舍掉
                debounceTime(400),
                // 提取属性，获取input的value值
                pluck<KeyboardEvent, string>('target', 'value'),
                // 删除字符串两边的空白字符
                map(val => val.trim()),
                // 过滤掉空值
                filter(val => val !== ''),
                // 只有当值与之前的值不同时，才发出(而且方向键/alt等等，不会改变值，所以也不会发出)
                distinctUntilChanged(),
                // switchMap每次发出新值，会取消之前的Observable，防止异步请求顺序错乱问题，可能先发出的比后发出的请求返回慢，导致先发出的覆盖最新的结果
                switchMap(val => {
                    if (this.type === 'github') {
                        this.githubApiService.type = this.type;
                        return this.githubApiService.getGithubData(val);
                    } else if (this.type === 'music') {
                       this.cloudMusicService.type = this.type;
                       return this.cloudMusicService.getCloudMusicData(val);
                    }
                })
            );
    }

}
