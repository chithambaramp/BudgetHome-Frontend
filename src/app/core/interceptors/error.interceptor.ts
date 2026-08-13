import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {

                // Unauthorized or Forbidden
                if (err.status === 401 || err.status === 403) {
                    this.auth.logout();
                }

                const message =
                    err.error?.message ||
                    err.message ||
                    err.statusText ||
                    'Something went wrong. Please try again.';

                return throwError(() => message);
            })
        );
    }
}