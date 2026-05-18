import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/shared/_service/baseStore.service';
import { AuthService } from "../../shared/_service/auth.service"
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
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
  constructor(private router: Router, private formBuilder: FormBuilder, public auth: AuthService, public service: BaseService,private route: ActivatedRoute) { 
    
   
  }

  ngOnInit(): void {
    this.service.clearStorageCacheCookies();
    const authOSignup = this.route.snapshot.queryParamMap.get('authOSignup');
    if(authOSignup){
      if(authOSignup=="NewSignup"){ 
        this.service.successToast("Signed up successfully!");
      }else if(authOSignup=="Pending"){
        this.service.errorToast("You have already signed up and waiting for approval");
      }else if(authOSignup=="UserExist"){
        this.service.errorToast("You have already signed up.");
      }else if(authOSignup=="SignupCancelled"){
        this.service.errorToast("Signup Cancelled.");
      }else {
        this.service.errorToast(authOSignup);
      }
    }
     if (this.auth.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.password = 'password';
    this.buildForm();
    let remember = localStorage.getItem('remember');
    let currentUser = localStorage.getItem('currentUser');
    if (remember == 'true' && currentUser) {
      this.router.navigate(['company'])
    }
    // window['gapi'].load('auth2', () => {
    //   window['gapi'].auth2.init({
    //     client_id: '762847266270-c2376d1iq29mugg4qhj396s5iqbj8jaq.apps.googleusercontent.com',
    //   }).attachClickHandler(document.getElementById('google-login-btn'), {},
    //     (googleUser) => {
    //       const id_token = googleUser.getAuthResponse().id_token;
    //       console.log("id_token",id_token)
    //       // this.authenticateWithBackend(id_token);
    //     });
    // });
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
          this.service.newUserLoginLoad = true;
          if (!result.data.isPopUp && this.auth.getRole() != 'PLATFORM_ADMIN' && result.data.companyID && result.data.facilityID) {
            localStorage.setItem("globalCompanyIDKey", result.data.companyID);
            localStorage.setItem("globalFacilityIDKey", result.data.facilityID);
          }
          if (result.data.isPopUp) {
            this.router.navigate(['auth/switch-company']);
          }
          else {
            if (this.auth.checkAccess('facilities_list') && (this.auth.getRole() == 'COMPANY_ADMIN' || this.auth.getRole() == 'FACILITY_ADMIN')) {
              this.router.navigate(['facility'], {
                queryParams: { Ref: this.auth.getCurrentCompany() },
              });
            }
            else if (this.auth.checkAccess('users_list') && (this.auth.getRole() == 'COMPANY_ADMIN' || this.auth.getRole() == 'FACILITY_ADMIN')) {
              this.router.navigate(['users'], {
                queryParams: { Ref: this.auth.getCurrentCompany() },
              });
            }
            else if (this.auth.checkAccess('roles_list') && (this.auth.getRole() == 'COMPANY_ADMIN' || this.auth.getRole() == 'FACILITY_ADMIN')) {
              this.router.navigate(['role-permission'], {
                queryParams: { Ref: this.auth.getCurrentCompany() },
              });
            }
            else if ((this.auth.checkAccess('plans_buy') || this.auth.checkAccess('plans_renew') || this.auth.checkAccess('plans_upgrade') || this.auth.checkAccess('plans_cancel')) && (this.auth.getRole() == 'COMPANY_ADMIN' || this.auth.getRole() == 'FACILITY_ADMIN')) {
              this.router.navigate(['plans-purchased'], {
                queryParams: { Ref: this.auth.getCurrentCompany() },
              });
            }
            else if (this.auth.checkAccess('dashboard_list')) {
              this.router.navigate(['dashboard']);
            }
            else if (this.auth.checkAccess('myassessments_list')) {
              this.router.navigate(['DSE-Office-Ergo']);
            }
            else if (this.auth.checkAccess('myinspections_list')) {
              this.router.navigate(['myinspections']);
            }
            else if (this.auth.checkAccess('company_list') && this.auth.getRole() != 'COMPANY_ADMIN' && this.auth.getRole() != 'FACILITY_ADMIN') {
              this.router.navigate(['company']);
            }
            else if (this.auth.checkAccess('invoices_list')) {
              this.router.navigate(['invoice']);
            }
            else if (this.auth.checkAccess('reports_list')) {
              this.router.navigate(['reports']);
            }
            else {
              this.router.navigate(['dashboard']);
            }
          }
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
