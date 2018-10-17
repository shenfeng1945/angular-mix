import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudMusicComponent } from './cloud-music.component';
import { CloudMusicRoutingModule } from './cloud-music.routing';
import { PublicModule } from '../public/public.module';

@NgModule({
  imports: [
    CommonModule,
    PublicModule,
    CloudMusicRoutingModule,
  ],
  declarations: [CloudMusicComponent]
})
export class CloudMusicModule { }
