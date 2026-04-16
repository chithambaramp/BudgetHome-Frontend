import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private isError = new Subject();
    private apiUrl;
    constructor(public http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    public get<T>(method: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http
            .get<T>(this.getAPIUrl(method), { params })
            .pipe(
                tap((response: T) => this.responseOk(response)),
                catchError((error) => this.responseError(error))
            );
    }

    public post<T>(method: string, body: any, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http
            .post<T>(this.getAPIUrl(method), body, { params })
            .pipe(
                tap((response: T) => this.responseOk(response)),
                catchError((error) => this.responseError(error))
            );
    }

    public patch<T>(method: string, body: any, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http
            .patch<T>(this.getAPIUrl(method), body, { params })
            .pipe(
                tap((response: T) => this.responseOk(response)),
                catchError((error) => this.responseError(error))
            );
    }

    public put<T>(method: string, body: any, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http
            .put<T>(this.getAPIUrl(method), body, { params })
            .pipe(
                tap((response: T) => this.responseOk(response)),
                catchError((error) => this.responseError(error))
            );
    }

    public delete<T>(method: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http
            .delete<T>(this.getAPIUrl(method), { params })
            .pipe(
                tap((response: T) => this.responseOk(response)),
                catchError((error) => this.responseError(error))
            );
    }

    private responseOk(response: any) {
        return response;
    }

    private responseError(error: any): Observable<never> {
        if (error.status === 401) {
            // handle unauthorized
        } else if (error?.error && error.error.isOk === false && error.error.message !== '') {
            this.isError.next(error.error.message);
        } else if (error.statusText === 'Unknown Error') {
            this.isError.next('Server cannot be reached');
        }
        return throwError(() => error);
    }

    public getAPIUrl(method: any) {
        return this.apiUrl + method;
    }

    public getFileUrl() {
        return this.apiUrl + 'uploads/';
    }

    public getError() {
        return this.isError.asObservable();
    }
}