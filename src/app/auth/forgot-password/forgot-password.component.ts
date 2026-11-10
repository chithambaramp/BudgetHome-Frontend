import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';
import { OtpBoxComponent } from '../otp-box/otp-box.component';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotForm!: FormGroup;
  isLoading = signal(false);
  error!: string;
  constructor(public bsModalRef: BsModalRef, public service: BaseService, public auth: AuthService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.ForgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get f() {
    return this.ForgotForm.controls;
  }

  onSubmit(): void {
    if (this.ForgotForm.invalid) {
      this.ForgotForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.isLoading.set(true);

    this.auth.validEmail(this.ForgotForm.getRawValue()).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);

        if (response.statusCode === 200) {
          this.openOtpModel();
          this.closeModel();
          return;
        }
        this.showError(response.message);
      },

      error: (err: any) => {
        this.isLoading.set(false);
        this.showError(err);
      }

    });
  }

  private errorTimer: any;
  private showError(message: string): void {
    this.error = message;
    clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  login() {
    this.router.navigate(['/auth/login']);
    this.closeModel();
  }

  openOtpModel() {
    let contents = {
      email: this.ForgotForm.get('email')?.value,
      forgot: true
    };
    let bsModalRef = this.service.openModalWithComponent(OtpBoxComponent, contents);
    bsModalRef.content.event.subscribe((res: any) => {
      if (res) {
        // openResetPassword-Popup
      }
    });
  }

  closeModel() {
    this.bsModalRef.hide();
  }
}