import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/_services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loader: LoaderService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.loader.show();

        return next.handle(req).pipe(
            finalize(() => {
                this.loader.hide();
            })
        );
    }
}