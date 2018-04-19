import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './one/three/three.component';
import { TrimSpacePipe } from './trim-space.pipe';

@NgModule({
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ],
  declarations: [PlaygroundComponent, OneComponent, TwoComponent, ThreeComponent,  TrimSpacePipe]
})
export class PlaygroundModule { }
