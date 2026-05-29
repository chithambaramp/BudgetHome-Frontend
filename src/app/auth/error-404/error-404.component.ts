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

  currentUser: any;
  constructor(public service: BaseService, public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onNavigate() {
    if (this.currentUser && this.currentUser.access_token) {
      // this.router.navigate(['company']);
      this.service.goBack();
      return
    }
    this.auth.logout();
  }

}