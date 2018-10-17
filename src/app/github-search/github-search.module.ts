import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchComponent } from './github-search.component';
import { GithubSearchRoutingModule } from './github-search.routing';

@NgModule({
  imports: [
    CommonModule,
    GithubSearchRoutingModule,
  ],
  declarations: [GithubSearchComponent]
})
export class GithubSearchModule { }
