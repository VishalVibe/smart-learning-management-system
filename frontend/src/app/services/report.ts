import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

export interface ReportSummary {
  totalLearners: number;
  totalCourses: number;
  totalEnrollments: number;
  averageProgress: number;
  averageScore: number;
  completionRate: number;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3000';

  getSummary(): Observable<ReportSummary> {
    return forkJoin({
      users: this.http.get<any[]>(`${this.base}/users`),
      courses: this.http.get<any[]>(`${this.base}/courses`),
      enrollments: this.http.get<any[]>(`${this.base}/enrollments`),
      progress: this.http.get<any[]>(`${this.base}/progress`),
      attempts: this.http.get<any[]>(`${this.base}/assessmentAttempts`)
    }).pipe(
      map(({ users, courses, enrollments, progress, attempts }) => {
        const students = users.filter(u => u.role === 'student');
        const avgProgress = progress.length
          ? Math.round(progress.reduce((s: number, p: any) => s + p.completionPercentage, 0) / progress.length)
          : 0;
        const avgScore = attempts.length
          ? Math.round(attempts.reduce((s: number, a: any) => s + a.score, 0) / attempts.length)
          : 0;
        const completed = progress.filter((p: any) => p.completionPercentage === 100).length;
        const completionRate = progress.length ? Math.round((completed / progress.length) * 100) : 0;

        return {
          totalLearners: students.length,
          totalCourses: courses.length,
          totalEnrollments: enrollments.length,
          averageProgress: avgProgress,
          averageScore: avgScore,
          completionRate
        };
      })
    );
  }
}
