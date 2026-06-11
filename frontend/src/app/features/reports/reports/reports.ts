import { Component, OnInit, signal, inject } from '@angular/core';
import { ReportService, ReportSummary } from '../../../services/report';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-reports',
  imports: [Sidebar, Header],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  private reportService = inject(ReportService);

  summary = signal<ReportSummary | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    this.reportService.getSummary().subscribe({
      next: (data) => {
        this.summary.set(data);
        this.loading.set(false);
      }
    });
  }
}
