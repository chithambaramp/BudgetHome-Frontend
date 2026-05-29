import { Component, OnInit } from '@angular/core';
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
  password: string = '';
  show: boolean = false;
  LoginForm!: FormGroup;
  submitted: boolean = false;
  isLoading!: boolean;
  error!: string;
  constructor(public service: BaseService, public auth: AuthService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.password = 'password';
    this.buildForm();
  }

  buildForm() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/)]],
      privacypolicy: ['', []]
    })
  }

  get f() { return this.LoginForm.controls; }

  getLoading() {
    return this.isLoading ? 'Loading...' : 'Login'
  }

  isEmailValid = () => {
    return this.LoginForm.controls['email'].valid
  }

  isPassValid = () => {
    return this.LoginForm.controls['password'].valid
  }

  isPrivacyPolicyValid = () => {
    return this.LoginForm.controls['privacypolicy'].value
  }

  Form(field: any) {
    return this.LoginForm.controls[field].value;
  }

  isValid(): boolean {
    return this.LoginForm.valid
  }

  onClickPassword(bool: boolean) {
    bool ? this.password = 'password' : this.password = 'text';
    this.show = !this.show;
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.submitted) {
      this.router.navigate(['expenses']);
      return;
    }
    if (this.LoginForm.invalid) {
      return;
    }
    // if (!this.isPrivacyPolicyValid()) {
    //   return;
    // }
    this.isLoading = true;
    this.submitted = false;
    this.error = '';
    this.auth.login(this.LoginForm.value).subscribe(
      (result: any) => {
        if (result.statusCode == 200) {
          this.isLoading = false;

        } else {
          this.isLoading = false;
          this.error = result.message;
        }
      },
      (error: any) => {
        this.isLoading = false;
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
