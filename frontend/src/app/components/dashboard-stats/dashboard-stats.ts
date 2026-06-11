import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ProgressService } from '../../services/progress';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-stats.html',
  styleUrl: './dashboard-stats.css'
})
export class DashboardStats implements OnInit {
  private progressService = inject(ProgressService);
  private http = inject(HttpClient);

  progress: { courseName: string; completion: number }[] = [];

  ngOnInit(): void {
    forkJoin({
      progressList: this.progressService.getByUserId(1),
      courses: this.http.get<any[]>('http://localhost:3000/courses')
    }).subscribe({
      next: ({ progressList, courses }) => {
        this.progress = progressList.map(p => ({
          courseName: courses.find(c => c.id === p.courseId)?.title ?? 'Course #' + p.courseId,
          completion: p.completionPercentage
        }));
      }
    });
  }
}