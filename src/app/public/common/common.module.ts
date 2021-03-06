import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardItemComponent } from './card-item/card-item.component';
import { RoundPipe } from '../pipe/round.pipe';
import { ProgressBusyComponent } from './progress-busy/progress-busy.component';
import { PlayerComponent } from './player/player.component';
import { SuspendBallComponent } from './suspend-ball/suspend-ball.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        SearchComponent,
        CardListComponent,
        CardItemComponent,
        ProgressBusyComponent,
        RoundPipe,
        PlayerComponent,
        SuspendBallComponent,
    ],
    exports: [
        SearchComponent,
        CardListComponent,
        CardItemComponent,
        ProgressBusyComponent,
        RoundPipe,
        PlayerComponent,
        SuspendBallComponent,
    ],
})
export class AppCommonModule { }
