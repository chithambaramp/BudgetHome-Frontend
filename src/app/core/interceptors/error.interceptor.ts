import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {

                this.handleError(err);

                const message =
                    err.error?.message ||
                    err.message ||
                    err.statusText ||
                    'Something went wrong. Please try again.';

                return throwError(() => message);
            })
        );
    }
    private handleError(err: HttpErrorResponse): void {

        switch (err.status) {

            // --------------------------------
            // NETWORK / CONNECTION ERROR
            // --------------------------------
            case 0:

                console.error('Network error:', err);

                this.router.navigate(['/network-error']);

                break;


            // --------------------------------
            // BAD REQUEST
            // --------------------------------
            case 400:

                console.error('400 - Bad Request:', err);

                // Usually form/API validation error
                break;


            // --------------------------------
            // UNAUTHORIZED
            // --------------------------------
            case 401:

                console.error('401 - Unauthorized');

                this.auth.logout();

                break;


            // --------------------------------
            // FORBIDDEN
            // --------------------------------
            case 403:

                console.error('403 - Forbidden');

                this.auth.logout();

                break;


            // --------------------------------
            // NOT FOUND
            // --------------------------------
            case 404:

                console.error('404 - API Resource Not Found');

                // Don't redirect the whole application
                // unless you specifically want that behavior.
                break;


            // --------------------------------
            // METHOD NOT ALLOWED
            // --------------------------------
            case 405:

                console.error('405 - Method Not Allowed');

                break;


            // --------------------------------
            // CONFLICT
            // --------------------------------
            case 409:

                console.error('409 - Conflict');

                break;


            // --------------------------------
            // VALIDATION ERROR
            // --------------------------------
            case 422:

                console.error('422 - Validation Error');

                break;


            // --------------------------------
            // SERVER ERROR
            // --------------------------------
            case 500:

                console.error('500 - Internal Server Error');

                this.router.navigate(['/network-error']);

                break;


            // --------------------------------
            // BAD GATEWAY
            // --------------------------------
            case 502:

                console.error('502 - Bad Gateway');

                this.router.navigate(['/network-error']);

                break;


            // --------------------------------
            // SERVICE UNAVAILABLE
            // --------------------------------
            case 503:

                console.error('503 - Service Unavailable');

                this.router.navigate(['/network-error']);

                break;


            // --------------------------------
            // GATEWAY TIMEOUT
            // --------------------------------
            case 504:

                console.error('504 - Gateway Timeout');

                this.router.navigate(['/network-error']);

                break;


            // --------------------------------
            // ANY OTHER ERROR
            // --------------------------------
            default:

                console.error(
                    `HTTP Error ${err.status}:`,
                    err
                );

                break;
        }
    }
}