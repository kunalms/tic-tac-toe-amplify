import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayerBoardComponent } from './single-player-board.component';

describe('SinglePlayerBoardComponent', () => {
  let component: SinglePlayerBoardComponent;
  let fixture: ComponentFixture<SinglePlayerBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePlayerBoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
