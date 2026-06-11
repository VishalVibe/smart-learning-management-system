import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Progress } from '../models/progress.model';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/progress';

  getAll(): Observable<Progress[]> {
    return this.http.get<Progress[]>(this.apiUrl);
  }

  getById(id: number): Observable<Progress> {
    return this.http.get<Progress>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: number): Observable<Progress[]> {
    return this.http.get<Progress[]>(`${this.apiUrl}?userId=${userId}`);
  }

  create(progress: Omit<Progress, 'id'>): Observable<Progress> {
    return this.http.post<Progress>(this.apiUrl, progress);
  }

  update(id: number, progress: Partial<Progress>): Observable<Progress> {
    return this.http.put<Progress>(`${this.apiUrl}/${id}`, progress);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
