import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/login/auth.guard';
import { BalanceComponent } from './views/balance/balance.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RecoverPasswordComponent } from './views/recover-password/recover-password.component';
import { SplashComponent } from './views/splash/splash.component';

const routes: Routes = [
  {
    path: 'home',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'balance',
        component: BalanceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'recover', component: RecoverPasswordComponent },
  { path: 'splash', component: SplashComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
