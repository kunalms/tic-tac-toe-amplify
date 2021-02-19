import { Component, OnInit } from '@angular/core';
import { TicTacToeHelperService } from '../../shared/services/tic-tac-toe-helper.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-single-player-board',
  templateUrl: './single-player-board.component.html',
  styleUrls: ['./single-player-board.component.scss'],
  animations: [
    trigger('openClose', [
      state('close', style({
        opacity: 1
      })),
      state('open', style({
        opacity: 0.33,
      }))
    ])
  ]
})
export class SinglePlayerBoardComponent implements OnInit {

  public board: Array<number | string> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public moveLog: Array<{ field: number, player: number, symbol: string }>;
  lastStatus = '';
  readonly symbols = {
    player1: 'X',
    player2: 'O'
  };
  private moveCount = 0;

  constructor(private ticTacToeHelperService: TicTacToeHelperService, private snackBar: MatSnackBar) {
    this.moveLog = [];
  }

  ngOnInit(): void {
  }

  makeUserMove(field: number): void {
    // invalid move dont do anything.
    if (typeof this.board[field] !== 'number') {
      return;
    } else {
      // Update the move count to determin the player
      this.moveCount += 1;
      /** Determine the player based on the move
       * If its the odd move its Player 1
       * or else its Player 2.
       */
      const player = this.moveCount % 2;
      /**
       * Based on the player determine the symbol.
       */
      const symbol = player === 1 ? this.symbols.player1 : this.symbols.player2;
      this.moveLog.push({field: field + 1, player, symbol});
      this.board[field] = symbol;
      this.updateGame();
    }
  }

  updateGame(): void {
    // Check for various possibilities if the game is finished.
    if (this.ticTacToeHelperService.isGameFinished(this.board, this.symbols)) {
      // Check if playerOne has won.
      const playerOneWon = this.ticTacToeHelperService.playerWon(this.board, this.symbols.player1);
      // Check if playerTwo has won.
      const playerTwoWon = this.ticTacToeHelperService.playerWon(this.board, this.symbols.player2);
      // Update the status string based on various possibilities.
      if (playerOneWon) {
        this.lastStatus = 'Yay 🙌 Player 1 Won!';
      } else if (playerTwoWon) {
        this.lastStatus = 'Yay 🙌 Player 2 Won!';
      } else {
        this.lastStatus = 'It\'s a draw!';
      }
    }
    // If the lastStatus is defined, render the snackbar so that user can reset the screen.
    if (this.lastStatus) {
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(this.lastStatus, 'Restart Game');

      snackBarRef.afterDismissed().subscribe(() => {
        // If user dismisses the snackBar reload the page to reset.
        window.location.reload();
      });
    }
  }
}
