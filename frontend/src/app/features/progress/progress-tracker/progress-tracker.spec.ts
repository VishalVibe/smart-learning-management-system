import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ProgressTracker } from './progress-tracker';

describe('ProgressTracker', () => {
  let component: ProgressTracker;
  let fixture: ComponentFixture<ProgressTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressTracker],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
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
