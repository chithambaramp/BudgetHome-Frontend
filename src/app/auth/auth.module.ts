import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routing';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from './error-404/error-404.component';
import { NetworkErrorComponent } from './network-error/network-error.component';
import { OtpBoxComponent } from './otp-box/otp-box.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ErrorPageComponent,
    NetworkErrorComponent,
    OtpBoxComponent,
  ],
  imports: [
    SharedModule,
    NgxIntlTelInputModule,
    RouterModule.forChild(authRoutes),
  ]
})
export class AuthModule { }