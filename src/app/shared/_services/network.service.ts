import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private router = inject(Router);

    private previousUrl = '';

    constructor() {

        // Check when application starts / browser refreshes
        if (!navigator.onLine) {
            this.goToNetworkError();
        }

        // Internet disconnected
        window.addEventListener('offline', () => {
            this.goToNetworkError();
        });

        // Internet connected again
        window.addEventListener('online', () => {
            this.goBackToPreviousPage();
        });
    }

    private goToNetworkError(): void {

        // Don't overwrite previous URL
        if (this.router.url !== '/network-error') {
            this.previousUrl = this.router.url;

            this.router.navigate(['/network-error']);
        }
    }

    private goBackToPreviousPage(): void {

        if (this.router.url === '/network-error') {

            const url = this.previousUrl || '/';

            this.router.navigateByUrl(url);
        }
    }
}