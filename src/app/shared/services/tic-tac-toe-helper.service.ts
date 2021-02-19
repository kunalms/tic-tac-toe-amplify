import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * A helper service which has various helper methods to determine if a player has won the game or not.
 */
export class TicTacToeHelperService {

  constructor() {
  }

  /**
   * Returns a boolean which signifies if the given player has won the game or not
   * @param board - current board state
   * @param symbol - the symbol for which the winning condition needs to be validated.
   */
  playerWon(board: Array<number | string>, symbol: string): boolean {
    return (board[0] === symbol && board[1] === symbol && board[2] === symbol) || // top row
      (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||      // middle row
      (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||      // bottom row
      (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||      // first column
      (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||      // second column
      (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||      // third column
      (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||      // first diagonal
      (board[2] === symbol && board[4] === symbol && board[6] === symbol);        // second diagonal
  }

  /**
   * Determines if the game is finished or not.
   * The completion of game depends on:
   * 1. No more moves can be made.
   * 2. Either player has won the game already.
   * @param board - current board state
   * @param symbols - player symbols
   */
  isGameFinished(board: Array<number | string>, symbols: { player1: string, player2: string }): boolean {
    // check if any moves are left if not return true
    if (!this.isMovesLeft(board, symbols)) {
      return true;
    }
    const {player1, player2} = symbols;
    // if moves are left check if anyone player has won the game or not.
    return this.playerWon(board, player1) || this.playerWon(board, player2);
  }

  /**
   * Returns the list of indexes that are empty.
   * @param board - current board state
   * @param symbols - player symbols
   */
  getEmptyIndexes(board: Array<number | string>, symbols: { player1: string, player2: string }): Array<number | string> {
    const {player1, player2} = symbols;
    return board.filter(s => s !== player1 && s !== player2);
  }

  /**
   * Checks if there are any cells on the board where a move can be made.
   * @param board - current board state
   * @param symbols - player symbols
   */
  isMovesLeft(board: Array<number | string>, symbols: { player1: string, player2: string }): boolean {
    return this.getEmptyIndexes(board, symbols).length !== 0;
  }
}
