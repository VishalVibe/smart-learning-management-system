import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentService } from '../../../services/enrollment';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrollment.html',
  styleUrl: './enrollment.css'
})
export class EnrollmentComponent implements OnInit {

  enrollments: any[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe({
      next: (data) => {
        console.log('Enrollments:', data);
        this.enrollments = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}