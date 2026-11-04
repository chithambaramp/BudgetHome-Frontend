import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';
import { OtpBoxComponent } from '../otp-box/otp-box.component';
import { SuccessPopupComponent } from 'src/app/shared/_common/success-popup/success-popup.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  error!: string;
  constructor(public service: BaseService, public auth: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
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
    return this.signupForm.controls;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.isLoading.set(true);

    this.auth.signup(this.signupForm.getRawValue()).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);

        if (response.statusCode === 201) {
          this.openOtpModal();
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
  }

  openOtpModal() {
    let contents = {
      email: this.signupForm.get('email')?.value
    };
    let bsModalRef = this.service.openModalWithComponent(OtpBoxComponent, contents);
    this.signupForm.reset();
    bsModalRef.content.event.subscribe((res: any) => {
      if (res) {
        let bsModalRefSignup = this.service.openModalWithComponent(SuccessPopupComponent);
        bsModalRefSignup.content.event.subscribe((close: any) => {
          if (close) {
            this.login();
          }
        });
      }
    });
  }

}