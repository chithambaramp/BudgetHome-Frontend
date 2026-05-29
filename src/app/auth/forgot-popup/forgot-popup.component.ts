import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-forgot-popup',
  templateUrl: './forgot-popup.component.html',
  styleUrls: ['./forgot-popup.component.scss']
})
export class ForgotPopupComponent implements OnInit {

  ID: any;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, public service: AuthService) { }

  ngOnInit(): void {
  } 
  redirect() {
    this.service.logout();
    this.bsModalRef.hide();
  }
  resendEmail(){
    this.event.emit(true);
    this.bsModalRef.hide();
  }
}
