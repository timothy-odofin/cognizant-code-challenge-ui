import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSubmissionComponent } from './challenge-submission.component';

describe('ChallengeSubmissionComponent', () => {
  let component: ChallengeSubmissionComponent;
  let fixture: ComponentFixture<ChallengeSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
