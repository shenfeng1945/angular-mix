import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchComponent } from './github-search.component';
import { GithubSearchRoutingModule } from './github-search.routing';
import { PublicModule } from '../public/public.module';

@NgModule({
  imports: [
    CommonModule,
    PublicModule,
    GithubSearchRoutingModule,
  ],
  declarations: [GithubSearchComponent]
})
export class GithubSearchModule { }
