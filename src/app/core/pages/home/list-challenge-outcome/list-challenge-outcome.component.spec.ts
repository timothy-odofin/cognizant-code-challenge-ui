import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChallengeOutcomeComponent } from './list-challenge-outcome.component';

describe('ListChallengeOutcomeComponent', () => {
  let component: ListChallengeOutcomeComponent;
  let fixture: ComponentFixture<ListChallengeOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChallengeOutcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChallengeOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
