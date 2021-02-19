import { TestBed } from '@angular/core/testing';

import { TicTacToeHelperService } from './tic-tac-toe-helper.service';

describe('TicTacToeHelperService', () => {
  let service: TicTacToeHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicTacToeHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('playerWon', () => {
    it('should return false if the player is not in the winning condition', () => {
      expect(service.playerWon([
        'X', 'O', 'X',
        'O', 'O', 'X',
        'X', 'X', '0'
      ], 'X')).toBeFalsy();

      expect(service.playerWon([
        'X', 'O', 'X',
        'O', 'O', 'X',
        'X', 'X', 'O'
      ], 'O')).toBeFalsy();
    });

    it('should return true if the player is in a winning condition', () => {
      expect(service.playerWon([
        'X', 'O', 'X',
        'O', 'O', 'X',
        'X', 'O', 9
      ], 'O')).toBeTruthy();
    });
  });

  describe('isMovesLeft', () => {
    it('return true if some places are still open for symbol placement', () => {
      expect(service.isMovesLeft([
        'X', 'O', 'X',
        'O', 'O', 'X',
        'X', 'X', 9
      ], {player1: 'X', player2: 'O'})).toBeTruthy();
    });

    it('return false if some places are still open for symbol placement', () => {
      expect(service.isMovesLeft([
        'X', 'O', 'X',
        'O', 'O', 'X',
        'X', 'X', 'O'
      ], {player1: 'X', player2: 'O'})).toBeFalsy();
    });
  });

  describe('isGameFinished', () => {
    it('should return true if player 1 has won the game', () => {
      expect(service.isGameFinished([
        'X', 'O', 'X',
        'O', 'X', 'X',
        'X', 'O', 9
      ], {player1: 'X', player2: 'O'})).toBeTruthy();
    });

    it('should return true if player 2 has won the game', () => {
      expect(service.isGameFinished([
        'X', 'O', 'X',
        'O', 'O', 'X',
        'X', 'O', 9
      ], {player1: 'X', player2: 'O'})).toBeTruthy();
    });

    it('should return true if no moves are left', () => {
      expect(service.isGameFinished([
        'X', 'O', 'O',
        'O', 'X', 'X',
        'X', 'X', 'O'
      ], {player1: 'X', player2: 'O'})).toBeTruthy();
    });

    it('should return false if some moves are left', () => {
      expect(service.isGameFinished([
        'X', 'O', 'O',
        'O', 'X', 'X',
        'X', 8, 'O'
      ], {player1: 'X', player2: 'O'})).toBeFalsy();
    });
  });
});
