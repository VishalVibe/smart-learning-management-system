import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ProgressService } from '../../../services/progress';
import { Progress, AssessmentAttempt } from '../../../models/progress.model';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-progress-details',
  imports: [Sidebar, Header],
  templateUrl: './progress-details.html',
  styleUrl: './progress-details.css',
})
export class ProgressDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private progressService = inject(ProgressService);
  private http = inject(HttpClient);

  progress = signal<Progress | null>(null);
  courseTitle = signal('');
  attempt = signal<AssessmentAttempt | null>(null);
  loading = signal(true);

  modules = computed(() => {
    const p = this.progress();
    if (!p) return [];
    return Array.from({ length: p.totalModules }, (_, i) => ({
      index: i + 1,
      label: `Module ${i + 1}`,
      done: i < p.completedModules
    }));
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.progressService.getById(id).subscribe({
      next: (progress) => {
        this.progress.set(progress);
        forkJoin({
          courses: this.http.get<any[]>('http://localhost:3000/courses'),
          assessments: this.http.get<any[]>(`http://localhost:3000/assessments?courseId=${progress.courseId}`),
          attempts: this.http.get<any[]>(`http://localhost:3000/assessmentAttempts?userId=${progress.userId}`)
        }).subscribe({
          next: ({ courses, assessments, attempts }) => {
            const course = courses.find(c => c.id === progress.courseId);
            this.courseTitle.set(course?.title ?? 'Unknown Course');
            if (assessments.length) {
              const match = attempts.find((a: AssessmentAttempt) => a.assessmentId === assessments[0].id);
              this.attempt.set(match ?? null);
            }
            this.loading.set(false);
          }
        });
      }
    });
  }

  goBack(): void { this.router.navigate(['/progress']); }

  startAssessment(): void {
    const p = this.progress();
    if (!p) return;
    this.http.get<any[]>(`http://localhost:3000/assessments?courseId=${p.courseId}`).subscribe({
      next: (list) => {
        if (list.length) this.router.navigate(['/assessment', list[0].id]);
      }
    });
  }
}
