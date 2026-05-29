import { inject } from '@angular/core';
import { Router, CanMatchFn, UrlTree } from '@angular/router';

export const AuthGuard: CanMatchFn = (): boolean | UrlTree => {

    const router = inject(Router);

    const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || 'null'
    );

    return currentUser?.access_token
        ? true
        : router.createUrlTree(['/auth']);
};