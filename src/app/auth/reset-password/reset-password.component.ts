import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SuccessPopupComponent } from 'src/app/shared/_common/success-popup/success-popup.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  Data: any;
  ResetForm!: FormGroup;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  error!: string;
  constructor(public bsModalRef: BsModalRef, public service: BaseService, public auth: AuthService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.ResetForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,15}$/)]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validators: this.passwordMatchValidator(),
      }
    );
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword
        ? null
        : { passwordMismatch: true };
    };
  }

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(value => !value);
  }

  get f() {
    return this.ResetForm.controls;
  }

  onSubmit(): void {
    if (this.ResetForm.invalid) {
      this.ResetForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.isLoading.set(true);
    let req: any = {
      "email": this.Data?.email,
      "newPassword": this.ResetForm.get('password')?.value
    }

    this.auth.resetPassword(req).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);

        if (response.statusCode === 200) {
          this.openSuccessModel();
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

  openSuccessModel() {
    let contents = {
      reset: true
    };
    let bsModalRef = this.service.openModalWithComponent(SuccessPopupComponent, contents);
    bsModalRef.content.event.subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  closeModel() {
    this.bsModalRef.hide();
  }
}