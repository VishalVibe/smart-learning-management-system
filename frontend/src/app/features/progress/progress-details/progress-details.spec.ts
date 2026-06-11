import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDetails } from './progress-details';

describe('ProgressDetails', () => {
  let component: ProgressDetails;
  let fixture: ComponentFixture<ProgressDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
