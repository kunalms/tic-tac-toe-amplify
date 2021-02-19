import { Component } from '@angular/core';
import { TicTacToeHelperService } from '../../shared/services/tic-tac-toe-helper.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-player-board',
  templateUrl: './single-player-board.component.html',
  styleUrls: ['./single-player-board.component.scss']
})
export class SinglePlayerBoardComponent {

  /**
   * holds the board state at any point in time.
   */
  public board: Array<number | string> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  /**
   * Keeps a log of various moves made throughout the game.
   */
  public moveLog: Array<{ field: number, player: number, symbol: string }>;
  /**
   * The game status.
   */
  lastStatus = '';
  /**
   * Mapping of various user symbols
   */
  readonly symbols = {
    player1: 'X',
    player2: 'O'
  };
  /**
   * Keeps a track of number of moves made so far.
   * @private
   */
  private moveCount = 0;

  /**
   * the default constructor.
   * @param ticTacToeHelperService
   * @param snackBar
   */
  constructor(private ticTacToeHelperService: TicTacToeHelperService, private snackBar: MatSnackBar) {
    this.moveLog = [];
  }

  /**
   * Makes the user move on the given input field.
   * @param field - the index of the cell where user has moved.
   */
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

  /**
   * Checks for the completion of the game, if the game is over it show a snackbar with the relative message.
   */
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
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(this.lastStatus, 'Restart Game',
        {panelClass: ['my-snack-bar']});

      snackBarRef.afterDismissed().subscribe(() => {
        // If user dismisses the snackBar reload the page to reset.
        window.location.reload();
      });
    }
  }
}
