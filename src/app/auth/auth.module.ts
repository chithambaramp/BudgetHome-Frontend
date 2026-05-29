import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routing';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPopupComponent } from './forgot-popup/forgot-popup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from './error-404/error-404.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { InfoPopupComponent } from './info-popup/info-popup.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ForgotPopupComponent,
    ResetPasswordComponent,
    ErrorPageComponent,
    PrivacyPolicyComponent,
    InfoPopupComponent
  ],
  imports: [
    SharedModule,
    NgxIntlTelInputModule,
    RouterModule.forChild(authRoutes),
  ]
})
export class AuthModule { }