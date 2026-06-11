import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar, Header],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {

  totalUsers: number = 0;
  totalCourses: number = 0;
  totalEnrollments: number = 0;
  totalProgress: number = 0;

  users: any[] = [];
  courses: any[] = [];
  enrollments: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (data) => {
        this.users = [...data];
        this.totalUsers = data.length;
        this.cdr.detectChanges();
      }
    });

    this.http.get<any[]>('http://localhost:3000/courses').subscribe({
      next: (data) => {
        this.courses = [...data];
        this.totalCourses = data.length;
        this.cdr.detectChanges();
      }
    });

    this.http.get<any[]>('http://localhost:3000/enrollments').subscribe({
      next: (data) => {
        this.enrollments = [...data];
        this.totalEnrollments = data.length;
        this.cdr.detectChanges();
      }
    });

    this.http.get<any[]>('http://localhost:3000/progress').subscribe({
      next: (data) => {
        this.totalProgress = data.length;
        this.cdr.detectChanges();
      }
    });
  }
}