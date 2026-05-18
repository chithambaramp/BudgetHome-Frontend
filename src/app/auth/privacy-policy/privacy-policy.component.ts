import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/shared/_service/baseStore.service';
import { AuthService } from "../../shared/_service/auth.service"
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(public auth: AuthService, public service: BaseService, public bsModalRef: BsModalRef) {

  }

  Data;
  ngOnInit(): void {

  }


}