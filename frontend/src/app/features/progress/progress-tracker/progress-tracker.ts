import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProgressService } from '../../../services/progress';
import { AssessmentService } from '../../../services/assessment';
import { Progress } from '../../../models/progress.model';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-progress-tracker',
  imports: [Sidebar, Header],
  templateUrl: './progress-tracker.html',
  styleUrl: './progress-tracker.css',
})
export class ProgressTracker implements OnInit {
  private progressService = inject(ProgressService);
  private assessmentService = inject(AssessmentService);
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly userId = 1;

  progressList = signal<Progress[]>([]);
  courseMap = signal<Record<number, string>>({});
  loading = signal(true);

  totalCourses = computed(() => this.progressList().length);
  completed = computed(() => this.progressList().filter(p => p.completionPercentage === 100).length);
  avgProgress = computed(() => {
    const list = this.progressList();
    if (!list.length) return 0;
    return Math.round(list.reduce((s, p) => s + p.completionPercentage, 0) / list.length);
  });

  ngOnInit(): void {
    forkJoin({
      progress: this.progressService.getByUserId(this.userId),
      courses: this.http.get<any[]>('http://localhost:3000/courses')
    }).subscribe({
      next: ({ progress, courses }) => {
        this.progressList.set(progress);
        const map: Record<number, string> = {};
        courses.forEach(c => (map[c.id] = c.title));
        this.courseMap.set(map);
        this.loading.set(false);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/progress', id]);
  }

  startAssessment(courseId: number): void {
    this.http.get<any[]>(`http://localhost:3000/assessments?courseId=${courseId}`).subscribe({
      next: (list) => {
        if (list.length) this.router.navigate(['/assessment', list[0].id]);
      }
    });
  }
}
