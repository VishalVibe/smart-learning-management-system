import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTracker } from './progress-tracker';

describe('ProgressTracker', () => {
  let component: ProgressTracker;
  let fixture: ComponentFixture<ProgressTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressTracker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
