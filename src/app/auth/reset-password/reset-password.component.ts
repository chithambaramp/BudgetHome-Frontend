import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotPopupComponent } from '../forgot-popup/forgot-popup.component';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm!: FormGroup;
  isLoading!: boolean;
  error: string = '';
  show = true;
  confirmshow = true;
  password: string = '';
  confirmPassword: string = '';
  linkID: any;
  constructor(public service: BaseService, public auth: AuthService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
    this.password = 'password';
    this.confirmPassword = 'password';
    this.linkID = this.route.snapshot.paramMap.get('id');
  }

  buildForm() {

    this.ResetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) {
    // const password = group.get('password').value;
    // const confirmPassword = group.get('confirmPassword').value;

    // return password === confirmPassword ? null : { notSame: true }
  }

  get f() { return this.ResetPasswordForm.controls; }

  getLoading() {
    // this.service.openModalWithComponent(ForgotPopupComponent, '', '', 'reset');
    return this.isLoading ? 'Loading...' : 'Set New Password'
  }


  Form(field: any) {
    return this.ResetPasswordForm.controls[field].value;
  }


  onClick(bool: boolean) {
    if (bool) {
      this.password = 'text';
      this.show = false;
    } else {
      this.password = 'password';
      this.show = true;
    }
  }

  onClickConfirm(bool: boolean) {
    if (bool) {
      this.confirmPassword = 'text';
      this.confirmshow = false;
    } else {
      this.confirmPassword = 'password';
      this.confirmshow = true;
    }
  }

  onSubmit = () => {

    if (this.ResetPasswordForm.invalid) {
      this.ResetPasswordForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.auth.resetPassword(this.ResetPasswordForm.value, this.linkID).subscribe(
      (result: any) => {
        if (result.statusCode == 200) {
          this.isLoading = false;
          this.router.navigate(['auth/forgot-password']);
          this.service.openModalWithComponent(ForgotPopupComponent, '', '', 'reset');
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
}
