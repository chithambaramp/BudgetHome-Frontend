import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);
  error!: string;
  constructor(public service: BaseService, public auth: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.isLoading.set(true);

    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);

        if (response.statusCode === 200) {
          this.router.navigate(['/expenses']);
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

}