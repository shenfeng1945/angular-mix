import { Routes, RouterModule } from '@angular/router';
import { CloudMusicComponent } from './cloud-music.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: CloudMusicComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CloudMusicRoutingModule { }
