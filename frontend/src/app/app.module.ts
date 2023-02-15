// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// CORE AND SERVICES
import { AuthInterceptor } from './services/login/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { InjectDirective } from './services/injector/injector.directive';

// PRIMENG
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';

// VIEWS
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './views/recover-password/recover-password.component';
import { HomeHeaderComponent } from './views/home/home-header/home-header.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { ProfileComponent } from './views/profile/profile.component';
import { BalanceComponent } from './views/balance/balance.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { CollectComponent } from './views/home/collect/collect.component';
import { PayComponent } from './views/home/pay/pay.component';
import { DepositComponent } from './views/home/deposit/deposit.component';
import { RetireComponent } from './views/home/retire/retire.component';
import { ProfitHistogramComponent } from './views/home/profit-histogram/profit-histogram.component';
import { UnreadNotificationsComponent } from './views/home/unread-notifications/unread-notifications.component';
import { UnsignedNotesComponent } from './views/home/unsigned-notes/unsigned-notes.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CurrencyComponent } from './components/format-number/currency.component';
import { BasicHeaderComponent } from './components/basic-header/basic-header.component';
import { NotificationRowComponent } from './app-components/notification-row/notification-row.component';
import { BalanceRowComponent } from './app-components/balance-row/balance-row.component';
import { MenuComponent } from './views/navigation/menu/menu.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CollectDetailComponent } from './views/detail/collect-detail/collect-detail.component';
import { PayDetailComponent } from './views/detail/pay-detail/pay-detail.component';
import { DepositDetailComponent } from './views/detail/deposit-detail/deposit-detail.component';
import { RetireDetailComponent } from './views/detail/retire-detail/retire-detail.component';
import { SplashComponent } from './views/splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InputComponent,
    ButtonComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    HomeHeaderComponent,
    NotificationsComponent,
    ProfileComponent,
    BalanceComponent,
    NavigationComponent,
    CollectComponent,
    PayComponent,
    DepositComponent,
    RetireComponent,
    ProfitHistogramComponent,
    UnreadNotificationsComponent,
    UnsignedNotesComponent,
    PieChartComponent,
    CurrencyComponent,
    BasicHeaderComponent,
    NotificationRowComponent,
    BalanceRowComponent,
    MenuComponent,
    InjectDirective,
    OverlayComponent,
    CollectDetailComponent,
    PayDetailComponent,
    DepositDetailComponent,
    RetireDetailComponent,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ProgressBarModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    ChartModule,
    SkeletonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
