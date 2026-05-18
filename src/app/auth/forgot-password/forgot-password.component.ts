import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_service/auth.service';
import { BaseService } from 'src/app/shared/_service/baseStore.service';
import { ForgotPopupComponent } from '../forgot-popup/forgot-popup.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  password: string = '';
  show: boolean = false;
  ForgotForm!: FormGroup;
  submitted: boolean = false;
  isLoading!: boolean;
  error!: string;
  constructor(private router: Router, private formBuilder: FormBuilder, public auth: AuthService, public service: BaseService) {
    // if (this.auth.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  emailPattern = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
  buildForm() {

    this.ForgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    })
  }
  get f() { return this.ForgotForm.controls; }

  getLoading() {
    return this.isLoading ? 'Loading...' : 'Send Reset Link'
  }


  Form(field: any) {
    return this.ForgotForm.controls[field].value;
  }

  onSubmit = () => {
    if (this.ForgotForm.invalid) {
      this.ForgotForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.auth.forgotPassword(this.ForgotForm.value).subscribe(
      (result: any) => {
        if (result.statusCode == 200) {
          this.isLoading = false;
          let linkcode = result.data.link;
          if (linkcode) {
            linkcode = linkcode.split('/')
            linkcode = linkcode[linkcode.length - 1]
          }
          let bsModalRef = this.service.openModalWithComponent(ForgotPopupComponent, '', '', 'forgot');
          bsModalRef.content.event.subscribe((res: any) => {
            if (res) {
              this.onSubmit();
            }
          });
          //this.router.navigate([`auth/users/reset-password/${linkcode}`]);
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