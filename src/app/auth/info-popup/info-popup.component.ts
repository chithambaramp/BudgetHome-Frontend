import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/_service/auth.service';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {

  ID: any;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, public service: AuthService) { }

  ngOnInit(): void {
  } 
  onSubmit() {
    this.event.emit(true);
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
