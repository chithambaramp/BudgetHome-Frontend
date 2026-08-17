import { inject } from '@angular/core';
import { Router, CanMatchFn, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';

export const AuthGuard: CanMatchFn = (): boolean | UrlTree => {

    const router = inject(Router);
    const auth = inject(AuthService);

    return auth.isLoggedIn()
        ? true
        : router.createUrlTree(['/auth']);
};