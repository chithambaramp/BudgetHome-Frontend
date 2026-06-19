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
  LoginForm!: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);
  error!: string;
  constructor(public service: BaseService, public auth: AuthService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }


  buildForm() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/)]],
      privacypolicy: ['', []]
    })
  }

  onSubmit = () => {
    let submitted = true;
    if (submitted) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.isLoading.set(false);
        this.router.navigate(['expenses']);
      }, 200);
      return;
    }
    if (this.LoginForm.invalid) {
      return;
    }
    // if (!this.isPrivacyPolicyValid()) {
    //   return;
    // }
    this.error = '';
    this.auth.login(this.LoginForm.value).subscribe(
      (result: any) => {
        if (result.statusCode == 200) {

        } else {
          this.error = result.message;
        }
      },
      (error: any) => {
        this.error = error;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  openPrivacyPolicy(val: any) {
    this.service.openModalWithComponent(PrivacyPolicyComponent, val);
  }

}