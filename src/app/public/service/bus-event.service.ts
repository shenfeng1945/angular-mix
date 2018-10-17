import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    public searchResult: Subject<any> = new Subject<any>();
    public progressLoading: Subject<boolean> = new Subject<boolean>();
    public toggleMusic: Subject<any> = new Subject<any>();
}
