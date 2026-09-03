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
        this.goHome();
    }

    goHome(): void {
        const isOnline = navigator.onLine;
        const hasToken = !!this.service.token();

        if (!isOnline) {
            return;
        }

        if (hasToken) {
            this.service.goBack();
            return;
        }

        this.auth.logout();
    }
}