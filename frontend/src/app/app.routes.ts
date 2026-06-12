import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard/dashboard';
import { EnrollmentComponent } from './pages/student/enrollment/enrollment';
import { SubscriptionComponent } from './pages/student/subscription/subscription';

import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ProfileComponent } from './features/auth/profile/profile';
import { PreferencesComponent } from './features/auth/preferences/preferences';
import { EditProfileComponent } from './features/auth/edit-profile/edit-profile';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password';

import { ProgressTracker } from './features/progress/progress-tracker/progress-tracker';
import { ProgressDetails } from './features/progress/progress-details/progress-details';

import { Assessment } from './features/assessment/assessment/assessment';
import { AssessmentResult } from './features/assessment/assessment-result/assessment-result';

import { Reports } from './features/reports/reports/reports';
import { CourseListComponent } from './components/course-list/course-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'preferences',
    component: PreferencesComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'enrollment',
    component: EnrollmentComponent
  },
  {
    path: 'subscription/:courseId',
    component: SubscriptionComponent
  },
  {
    path: 'progress',
    component: ProgressTracker
  },
  {
    path: 'progress/:id',
    component: ProgressDetails
  },
  {
    path: 'assessment/:id',
    component: Assessment
  },
  {
    path: 'assessment-result/:id',
    component: AssessmentResult
  },
  {
    path: 'certificates',
    component: DashboardComponent
  },
  {
    path: 'reports',
    component: Reports
  },
  {
    path: 'admin',
    component: AdminDashboardComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];