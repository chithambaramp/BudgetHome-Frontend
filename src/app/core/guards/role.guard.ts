import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserRole } from '../models/user-role.enum';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

export const RoleGuard: CanMatchFn = (route) => {

    const service = inject(BaseService);
    const router = inject(Router);

    const allowedRoles = route.data?.['roles'] as UserRole[];
    const userRole = service.Role() as UserRole | null;

    if (userRole && allowedRoles?.includes(userRole)) {
        return true;
    }

    return router.createUrlTree(['/auth']);
};