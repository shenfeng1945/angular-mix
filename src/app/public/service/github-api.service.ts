import { switchMap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceApi } from '../enum/service-api.enum';
import { of, Observable } from 'rxjs';
import { OwnGithubSearchOutput, GithubRepositoriesItem, GithubSearchOutput, OwnGithubItem } from '../model/github-item.model';
import { EventBusService } from './bus-event.service';

@Injectable({
    providedIn: 'root'
})
export class GithubApiService {
    type = 'github';
    constructor(
        private httpClient: HttpClient,
        private eventBusService: EventBusService,
    ) { }
    public getGithubData(val: string): Observable<OwnGithubSearchOutput> {
        const URL = `${ServiceApi.GithubSearchRepos}${val}`;
        this.eventBusService.progressLoading.next(true);
        return this.httpClient.get(URL)
            .pipe(
                // finally 当observable完成时，执行的回调。
                finalize(() => this.eventBusService.progressLoading.next(false)),
                switchMap((res: GithubSearchOutput) => {
                    return of(this.transformObject(res.items));
                })
            );
    }
    private transformObject(res: GithubRepositoriesItem[]): any {
        const ownGithubSearchOutput: OwnGithubSearchOutput = new OwnGithubSearchOutput();
        const repoItems: OwnGithubItem[] = [];
        res.forEach((e, i) => {
            const repoItem = new OwnGithubItem();
            repoItem.avatarUrl = e.owner.avatar_url;
            repoItem.description = e.description;
            repoItem.forksCount = e.forks_count;
            repoItem.fullName = e.full_name;
            repoItem.language = e.language;
            repoItem.repoName = e.name;
            repoItem.repoSize = e.size;
            repoItem.repoUrl = e.git_url;
            repoItem.stargazersCount = e.stargazers_count;
            repoItem.watchersCount = e.watchers_count;
            repoItem.userName = e.owner.login;
            repoItem.userUrl = e.owner.html_url;
            repoItems.push(repoItem);
        });
        ownGithubSearchOutput.items = repoItems;
        ownGithubSearchOutput.type = this.type;
        return ownGithubSearchOutput;
    }
}
