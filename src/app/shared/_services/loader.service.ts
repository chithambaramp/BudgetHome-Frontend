import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    loading = signal(false);

    private requestCount = 0;

    show(): void {
        this.requestCount++;

        if (this.requestCount > 0) {
            this.loading.set(true);
        }
    }

    hide(): void {
        this.requestCount--;

        if (this.requestCount <= 0) {
            this.requestCount = 0;
            this.loading.set(false);
        }
    }
}