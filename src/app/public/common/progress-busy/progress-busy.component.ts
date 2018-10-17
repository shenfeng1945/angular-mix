import { Observable, timer, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { EventBusService } from '../../service/bus-event.service';
import { takeWhile, map } from 'rxjs/operators';

@Component({
    selector: 'app-progress-busy',
    templateUrl: './progress-busy.component.html',
    styleUrls: ['./progress-busy.component.scss']
})
export class ProgressBusyComponent implements OnInit {
    loading = false;
    progressValue = 0;
    progress$: Subscription;
    constructor(
        private eventBusService: EventBusService,
    ) { }

    ngOnInit() {
        this.eventBusService.progressLoading
            .subscribe(loading => {
                this.loading = loading;
                this.update();
            });
    }
    private update(): void {
        if (this.loading) {
            this.progress$ = this.initProgressBar().subscribe();
        } else {
            this.reset();
        }
    }
    private initProgressBar(): Observable<number> {
        this.progressValue = 0;
        return timer(0, 100)
            .pipe(
                // map会修改数据流，而tap不会
                map(_ => this.progressValue += 5),
                // 当val<=90,流会中断。
                takeWhile(val => val <= 90)
            );
    }
    private reset(): void {
        // 防止progress$未被订阅，导致报错
        if (this.progress$ && this.progress$.closed) {
            this.progress$.unsubscribe();
        }
    }

}
