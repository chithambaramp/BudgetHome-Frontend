import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(public service: BaseService, public auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  goHome() {
    if (this.service.token()) {
      this.service.goBack();
      return
    }
    this.auth.logout();
  }

}