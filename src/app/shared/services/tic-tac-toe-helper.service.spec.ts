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
});
