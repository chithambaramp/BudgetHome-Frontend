import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
    selector: 'app-network-error',
    templateUrl: './network-error.component.html',
    styleUrls: ['./network-error.component.scss']
})
export class NetworkErrorComponent implements OnInit {

    constructor(public service: BaseService, public auth: AuthService, private router: Router) {

    }

    ngOnInit(): void {

    }

    retry(): void {
        if (navigator.onLine) {
            window.location.reload();
        }
    }

    goHome(): void {
        if (navigator.onLine && this.service.token()) {
            this.service.goBack();
            return
        }
        this.auth.logout();
    }
}