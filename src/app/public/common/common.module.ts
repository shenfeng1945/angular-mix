import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardItemComponent } from './card-item/card-item.component';
import { RoundPipe } from '../pipe/round.pipe';
import { ProgressBusyComponent } from './progress-busy/progress-busy.component';

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
    ],
    exports: [
        SearchComponent,
        CardListComponent,
        CardItemComponent,
        ProgressBusyComponent,
        RoundPipe,
    ],
})
export class AppCommonModule { }
