import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './subscription.html',
  styleUrl: './subscription.css'
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  courseId: string | null = null;
  course: Course | null = null;
  loading: boolean = true;
  errorMsg: string | null = null;

  // Checkout States
  selectedPlan: 'yearly' | 'monthly' = 'yearly';
  selectedPaymentMethod: 'upi' | 'cards' = 'upi';
  billingCountry: string = 'India';
  billingState: string = 'Uttar Pradesh';

  // Pricing & Coupon
  couponCode: string = 'MT260608G1A';
  couponApplied: boolean = true;
  couponError: string | null = null;
  baseYearlyPrice: number = 6000;
  baseMonthlyPrice: number = 999;
  discountAmount: number = 1500;

  // Payment Simulation States
  isPaymentStarted: boolean = false;
  isProcessing: boolean = false;
  isPaymentSuccess: boolean = false;
  countdownSeconds: number = 300; // 5 minutes
  countdownDisplay: string = '05:00';
  timerId: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    if (this.courseId) {
      this.loadCourseDetails(this.courseId);
    } else {
      this.errorMsg = 'Invalid Course Specified';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  loadCourseDetails(id: string): void {
    this.loading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (course: Course) => {
        this.course = course;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
        this.errorMsg = 'Failed to load course details. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get totalDue(): number {
    if (this.selectedPlan === 'yearly') {
      return this.couponApplied
        ? this.baseYearlyPrice - this.discountAmount
        : this.baseYearlyPrice;
    } else {
      return this.baseMonthlyPrice;
    }
  }

  get discountPercentage(): number {
    return Math.round((this.discountAmount / this.baseYearlyPrice) * 100);
  }

  selectPlan(plan: 'yearly' | 'monthly'): void {
    if (this.isPaymentStarted) return; // Disable changes during payment
    this.selectedPlan = plan;
  }

  selectPaymentMethod(method: 'upi' | 'cards'): void {
    if (this.isPaymentStarted) return;
    this.selectedPaymentMethod = method;
  }

  applyCoupon(): void {
    if (this.isPaymentStarted) return;
    
    if (this.couponCode.trim().toUpperCase() === 'MT260608G1A') {
      this.couponApplied = true;
      this.couponError = null;
    } else if (this.couponCode.trim() === '') {
      this.couponApplied = false;
      this.couponError = null;
    } else {
      this.couponApplied = false;
      this.couponError = 'Invalid promo code';
    }
  }

  removeCoupon(): void {
    if (this.isPaymentStarted) return;
    this.couponApplied = false;
    this.couponCode = '';
    this.couponError = null;
  }

  startPayment(): void {
    if (!this.course) return;
    this.isPaymentStarted = true;
    this.startCountdown();
  }

  startCountdown(): void {
    this.clearTimer();
    this.countdownSeconds = 300;
    this.updateCountdownDisplay();

    this.timerId = setInterval(() => {
      this.countdownSeconds--;
      this.updateCountdownDisplay();

      if (this.countdownSeconds <= 0) {
        this.clearTimer();
        this.isPaymentStarted = false;
        alert('Payment session expired. Please try again.');
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  updateCountdownDisplay(): void {
    const minutes = Math.floor(this.countdownSeconds / 60);
    const seconds = this.countdownSeconds % 60;
    const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    this.countdownDisplay = `${minStr}:${secStr}`;
  }

  clearTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  simulatePaymentSuccess(): void {
    if (!this.course || this.isProcessing) return;

    this.isProcessing = true;
    this.clearTimer();
    this.cdr.detectChanges();

    // Create enrollment data
    const enrollmentData = {
      userId: 1, // Mock current user
      courseId: Number(this.course.id),
      batchId: 1,
      status: 'enrolled',
      enrollmentDate: new Date().toISOString()
    };

    // Simulate network delay for verification
    setTimeout(() => {
      this.enrollmentService.createEnrollment(enrollmentData).subscribe({
        next: () => {
          this.isProcessing = false;
          this.isPaymentSuccess = true;
          this.cdr.detectChanges();

          // Auto redirect to enrollment page after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/enrollment']);
          }, 3000);
        },
        error: (err: any) => {
          console.error(err);
          this.isProcessing = false;
          this.isPaymentStarted = false;
          alert('Failed to complete enrollment. Please try again.');
          this.cdr.detectChanges();
        }
      });
    }, 1500);
  }

  cancelCheckout(): void {
    this.clearTimer();
    this.router.navigate(['/enrollment']);
  }
}
