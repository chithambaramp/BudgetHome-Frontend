import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/shared/_service/baseStore.service';
import { AuthService } from "../../shared/_service/auth.service"
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { PATH } from 'src/app/shared/_helpers/entity';
import { InfoPopupComponent } from '../info-popup/info-popup.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input('isEqipment') isEqipment:boolean = false;

  constructor(
    private router: Router, public route: ActivatedRoute, private formBuilder: FormBuilder, public auth: AuthService, public service: BaseService) {

  }
  isIndustryListOpen: boolean = false;
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Canada, CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required]),
	});


  registerForm: FormGroup;
  ID: any;
  timezoneList: any = [];
  isLoading!: boolean;
  isLoading2!: boolean;
  industriesList=["Manufacturing", "Food & Beverage", "Chemical", "Pharmaceutical", "Construction", "Hotels & Hospitality", "Hospital & Healthcare", "Consumer Packaged Goods", "Oil & Gas", "Mining", "Retail", "Logistics & Transportation", "Facilities Management", "Parking Operators", "Restaurants and QSRs", "Others"];
  industriesListSelected;
  emailcodesent:boolean=false;
  emailverified:boolean=false;
  verifiedEmail:string='';

  ngOnInit(): void {
    this.loadTimeZone();
    this.buildForm();
    this.ID = this.route.snapshot.queryParamMap.get('ref');
    if (this.ID) {
      this.getEditData();
    }
  }

  get formControl() { return this.registerForm.controls; }

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  openIndustryList() {
    this.isIndustryListOpen = !this.isIndustryListOpen;
  }

  
  openPrivacyPolicy(val: any) {
    this.service.openModalWithComponent(PrivacyPolicyComponent, val);
  }

  getLoading() {
    return this.isLoading ? 'Loading...' : 'Register Now'
  }

  selectIndustryList(item: any) {
    this.isIndustryListOpen = false;
    this.industriesListSelected = item;
  }

  emailPattern = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      emailcode: [''],
      companyname: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      privacypolicy: ['', [Validators.requiredTrue]],
      phone: new FormControl(undefined, [Validators.required]),
      timezone: ['', [Validators.required]],
    })
  }
 // Remove Faciltty, Company, Industry, Phone Number from the form
 onPatchForRemove() {
  let timezone = this.timezoneList.find((timezone) => { 
    if(timezone.utc.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)) {
      return timezone;
    }
  })
  this.registerForm.patchValue({
    companyname: this.registerForm.value.firstname + " " + this.registerForm.value.lastname + "'s Company",
    industry: this.registerForm.value.firstname + " " + this.registerForm.value.lastname + "'s Industry",
    phone: new FormControl(null),
    timezone: timezone?.abbr,
  })
}

  getEditData = () => {
    this.service.getById(this.ID, PATH.FACILITIES).subscribe(data => {
      if (data.isActive || !data.isActive) {
        this.initializeduser(data);
      }
    })
  }

  initializeduser(init: any) {
    this.registerForm.patchValue({
      timezone: init.timezone,
      isActive: init.isActive ? '1' : '0',
    })
  }

  loadTimeZone() {
    this.service.fetchRecords('city/timezone').subscribe((data: any) => {
      this.timezoneList = data;
    })
  }
  
  onSubmit = () => {
    this.onPatchForRemove();
    if(this.registerForm.valid) {
      if(this.verifiedEmail=='' || this.verifiedEmail!=this.registerForm.get('email')?.value){
        this.service.errorToast("Please verify your email address"); return;
      }
    this.isLoading = true;
    let reqBody = this.registerForm.getRawValue();
    reqBody.phone = reqBody?.phone?.e164Number;
    this.auth.signup(reqBody).subscribe(
      (result: any) => {
        if (result.statusCode == 200 || result.statusCode == 201) {
          this.isLoading = false;
          let bsModalRef = this.service.openModalWithComponent(InfoPopupComponent, '', '', '');
          bsModalRef.content.event.subscribe((res: any) => {
            if (res) {
              bsModalRef.hide();
              this.onReset();
            }
          });
        } else {
          this.errorMessage = result.message;
          this.isLoading = false;
        }
      },
      (error: any) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
  else {
    this.registerForm.markAllAsTouched();
  }
}

errorMessage: string = '';
onReset() {
  this.registerForm.reset();
  this.errorMessage = '';
}

loginWithGoogle() {
  window.location.href = environment.BASE+'users/google/';
}
loginWithMicroSoft() {
  window.location.href = environment.BASE+'users/microsoft/';
}
SendCode(){
  
  if(!this.registerForm.get('email')?.value || this.formControl.email.errors){
    this.service.errorToast("Please enter valid email address"); return;
  }
  this.emailcodesent=false;
  this.emailverified=false;
  this.registerForm.get('email')?.disable();
  let p={email:this.registerForm.get('email')?.value};
  this.isLoading2=true;
  this.service.create(p, '', `users/sendsignupcodeformail`).subscribe((data: any) => {
    this.isLoading2=false;
    if (data.statusCode==200) {
      this.emailcodesent=true;
      this.emailverified=false;
      this.service.successToast("Email sent");
    }else{
      this.emailcodesent=false;
      this.registerForm.get('email')?.enable();
      this.service.errorToast(data.message);
    }
  });
}
verifyCode(){
  this.emailverified=false;
  if(!this.registerForm.get('emailcode')?.value){
    this.registerForm.get('emailcode').setErrors({ customError: 'Please enter the verify code' });
    return;
  }
  if(!this.registerForm.get('email')?.value || this.formControl.email.errors){
    this.service.errorToast("Please enter valid email address"); return;
  }
  this.isLoading2=true;
  let p={email:this.registerForm.get('email')?.value,code:this.registerForm.get('emailcode')?.value};
  this.service.create(p, '', `users/checksignupcodeformail`).subscribe((data: any) => {
    this.isLoading2=false;
    if (data.message!='INVALID CODE') {
      this.emailverified=true;    
      this.verifiedEmail=this.registerForm.get('email')?.value;
      this.service.successToast("Email verified successfully!");
    }else{
      this.emailverified=false;
      this.verifiedEmail="";
      this.service.errorToast(data.message);
    }
  });

}
changeEmail(){
  this.emailcodesent=false;
  this.emailverified=false;
  this.registerForm.get('email')?.enable();
  this.registerForm.get('emailcode')?.setValue('');
}
}
