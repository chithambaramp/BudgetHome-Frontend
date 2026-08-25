import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/_services/auth.service';
import { BaseService } from './shared/_services/baseStore.service';
import { NetworkService } from './shared/_services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BudgetHome';
  constructor(public service: BaseService, public auth: AuthService, private networkService: NetworkService) {

  }

  ngOnInit(): void {
    const token = this.service.token();

    if (token) {
      this.auth.startTokenTimer(token);
    }
  }
}