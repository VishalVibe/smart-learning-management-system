import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard/dashboard';
import { EnrollmentComponent } from './pages/student/enrollment/enrollment';

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'enrollment',
    component: EnrollmentComponent
  }

];