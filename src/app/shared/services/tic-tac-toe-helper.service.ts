import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeHelperService {

  constructor() {
  }

  playerWon(board: Array<number | string>, symbol: string): boolean {
    return (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
      (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
      (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
      (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
      (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
      (board[2] === symbol && board[4] === symbol && board[6] === symbol);
  }

  isGameFinished(board: Array<number | string>, symbols: { player1: string, player2: string }): boolean {
    if (!this.isMovesLeft(board, symbols)) {
      return true;
    }
    const {player1, player2} = symbols;
    return this.playerWon(board, player1) || this.playerWon(board, player2);
  }

  getEmptyIndexies(board: Array<number | string>, symbols: { player1: string, player2: string }): Array<number | string> {
    const {player1, player2} = symbols;
    return board.filter(s => s !== player1 && s !== player2);
  }

  isMovesLeft(board: Array<number | string>, symbols: { player1: string, player2: string }): boolean {
    return this.getEmptyIndexies(board, symbols).length !== 0;
  }
}
