import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assessment, AssessmentAttempt, Question } from '../models/progress.model';

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3000';

  getAssessment(id: number): Observable<Assessment> {
    return this.http.get<Assessment>(`${this.base}/assessments/${id}`);
  }

  getAssessmentByCourseId(courseId: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${this.base}/assessments?courseId=${courseId}`);
  }

  getQuestions(assessmentId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.base}/questions?assessmentId=${assessmentId}`);
  }

  submitAttempt(attempt: Omit<AssessmentAttempt, 'id'>): Observable<AssessmentAttempt> {
    return this.http.post<AssessmentAttempt>(`${this.base}/assessmentAttempts`, attempt);
  }

  getAttemptsByUser(userId: number): Observable<AssessmentAttempt[]> {
    return this.http.get<AssessmentAttempt[]>(`${this.base}/assessmentAttempts?userId=${userId}`);
  }

  getAttemptById(id: number | string): Observable<AssessmentAttempt> {
    return this.http.get<AssessmentAttempt>(`${this.base}/assessmentAttempts/${id}`);
  }

  getAllAttempts(): Observable<AssessmentAttempt[]> {
    return this.http.get<AssessmentAttempt[]>(`${this.base}/assessmentAttempts`);
  }
}
