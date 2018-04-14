import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyzesComponent } from './analyzes/analyzes.component';
import { AnalysisDetailComponent } from './analysis-detail/analysis-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { RoleGuardService as RoleGuard } from './role-guard.service';

const routes: Routes = [
  { path: 'analyzes', component: AnalyzesComponent, canActivate: [AuthGuard] },
  { path: 'analyzes/detail/:id', component: AnalysisDetailComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'users/detail/:id', component: UserDetailComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }