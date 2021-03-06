import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
   {
       path: '',
       redirectTo: '/githubsearch',
       pathMatch: 'full'
   },
   {
       path: 'githubsearch',
       loadChildren: './github-search/github-search.module#GithubSearchModule'
   },
   {
       path: 'cloudmusic',
       loadChildren: './cloud-music/cloud-music.module#CloudMusicModule'
   }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
