import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../../services/assessment';
import { AssessmentAttempt, Assessment } from '../../../models/progress.model';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-assessment-result',
  imports: [Sidebar, Header],
  templateUrl: './assessment-result.html',
  styleUrl: './assessment-result.css',
})
export class AssessmentResult implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assessmentService = inject(AssessmentService);

  attempt = signal<AssessmentAttempt | null>(null);
  assessment = signal<Assessment | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.assessmentService.getAttemptById(id).subscribe({
      next: (attempt) => {
        this.attempt.set(attempt);
        this.assessmentService.getAssessment(Number(attempt.assessmentId)).subscribe({
          next: (a) => {
            this.assessment.set(a);
            this.loading.set(false);
          }
        });
      }
    });
  }

  goToProgress(): void {
    this.router.navigate(['/progress']);
  }

  retake(): void {
    const a = this.attempt();
    if (a) this.router.navigate(['/assessment', a.assessmentId]);
  }
}
