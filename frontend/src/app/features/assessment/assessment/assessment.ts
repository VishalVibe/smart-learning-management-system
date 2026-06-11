import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AssessmentService } from '../../../services/assessment';
import { Assessment as AssessmentModel, Question } from '../../../models/progress.model';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-assessment',
  imports: [Sidebar, Header, ReactiveFormsModule],
  templateUrl: './assessment.html',
  styleUrl: './assessment.css',
})
export class Assessment implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assessmentService = inject(AssessmentService);

  readonly userId = 1;

  assessment = signal<AssessmentModel | null>(null);
  questions = signal<Question[]>([]);
  loading = signal(true);
  submitting = signal(false);

  form = new FormGroup({});

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.assessmentService.getAssessment(id).subscribe({
      next: (a) => {
        this.assessment.set(a);
        this.assessmentService.getQuestions(a.id).subscribe({
          next: (qs) => {
            this.questions.set(qs);
            qs.forEach(q => {
              this.form.addControl('q_' + q.id, new FormControl('', Validators.required));
            });
            this.loading.set(false);
          }
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const qs = this.questions();
    const a = this.assessment();
    if (!a) return;

    let correct = 0;
    qs.forEach(q => {
      const answer = this.form.get('q_' + q.id)?.value;
      if (answer === q.correctAnswer) correct++;
    });

    const score = Math.round((correct / qs.length) * 100);
    const status = score >= a.passingMarks ? 'passed' : 'failed';

    this.submitting.set(true);
    this.assessmentService.submitAttempt({ assessmentId: a.id, userId: this.userId, score, status }).subscribe({
      next: (attempt) => {
        this.router.navigate(['/assessment-result', attempt.id]);
      }
    });
  }
}
