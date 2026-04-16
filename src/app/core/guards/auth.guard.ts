import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (currentUser && currentUser.access_token) {
        return true;
    }

    router.navigate(['/']);
    return false;
}