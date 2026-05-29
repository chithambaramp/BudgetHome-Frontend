import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { omitEmptyDeep } from '../_common/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from "../../shared/_services/baseStore.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentUser: Observable<any>;

  constructor(public service: BaseService, private router: Router) {
    let currentUser: any = localStorage.getItem('currentUser');
    this.currentUserSubject.next(JSON.parse(currentUser || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(logindata: any): Observable<any> {
    const buildPostBody = () => {
      return omitEmptyDeep({
        'withoutToken': true,
        'email': logindata.email,
        'password': logindata.password
      });
    };
    return this.service.create(buildPostBody(), '', `auth/login`,).pipe(map(user => {
      if (user && user.statusCode == 200) {
        this.currentUserSubject.next(user.data);
        localStorage.setItem('currentUser', JSON.stringify(user.data));
      }
      return user;
    }))
  }

  forgotPassword(data: any): Observable<any> {
    const buildPostBody = () => {
      return omitEmptyDeep({
        "email": data.email
      });
    };
    return this.service.create(buildPostBody(), '', `user/reset-password`,).pipe(map(user => {
      if (user) {
        return user;
      }
    }))
  }

  resetPassword(data: any, linkid: any): Observable<any> {
    const buildPostBody = () => {
      return omitEmptyDeep({
        "code": linkid,
        "password": data.password
      });
    };
    return this.service.create(buildPostBody(), '', `user/change-password`,).pipe(map(user => {
      if (user) {
        return user;
      }
    }))
  }

  signup(data: any): Observable<any> {
    const buildPostBody = () => {
      return omitEmptyDeep(data);
    };
    return this.service.create(buildPostBody(), '', `user/signup`).pipe(map(user => {
      if (user) {
        return user;
      }
    }))
  }

  updateUserProfile(body: any) {
    let currentUser = this.currentUserSubject.getValue();
    return this.service.create(body, this.service.userID(), `user`,).pipe(map(user => {
      if (user && user.statusCode == 200) {
        const userData = {
          access_token: this.service.token(),
          ...currentUser,
          ...user.data
        }
        this.currentUserSubject.next(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      }
      return user;
    }))
  }

  uploadProfileImage(attachment: any, callback: any) {
    this.service.getFileUrl(attachment).subscribe((data: any) => {
      if (data) {
        const buildPostBody = () => {
          return omitEmptyDeep({
            "image": data.filename
          });
        };
        this.updateUserProfile(buildPostBody()).subscribe((res: any) => {
        })
      }
      callback(data.filename)
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

}