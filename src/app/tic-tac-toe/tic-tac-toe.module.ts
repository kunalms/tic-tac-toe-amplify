import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { SinglePlayerBoardComponent } from './single-player-board/single-player-board.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SinglePlayerComponent, SinglePlayerBoardComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SinglePlayerComponent
  ]
})
export class TicTacToeModule {
}
