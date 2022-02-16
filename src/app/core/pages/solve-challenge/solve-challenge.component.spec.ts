import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveChallengeComponent } from './solve-challenge.component';

describe('SolveChallengeComponent', () => {
  let component: SolveChallengeComponent;
  let fixture: ComponentFixture<SolveChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolveChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
