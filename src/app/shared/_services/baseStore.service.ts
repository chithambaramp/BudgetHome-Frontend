import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { AppInfo } from './appInfo.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class BaseService extends AppInfo {
  subscription!: Subscription;
  isLoading: boolean = false;
  dataPassed: any = [];
  bsModalRef!: BsModalRef;
  currentPage: any = 1;
  alertData: any = { successOpen: false, dangerOpen: false, alertTxt: '', timeout: 4700 };
  private currentAlertSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentAlert$ = this.currentAlertSubject.asObservable();

  constructor(public service: ApiService, public ds: DataService, private router: Router, private route: ActivatedRoute, public modalService: BsModalService) {

    super();
    // this.route.queryParams.subscribe((params: Params) => {
    //   if (params['page'])
    //     this.currentPage = parseInt(params['page']);
    //   else
    //     this.currentPage = 1;
    // });

  }

  fetchRecords(url: any, isLoad: boolean = true): Observable<any> {
    if (isLoad) {
      this.isLoading = true;
    }
    return this.service.get<any>(url).pipe(map((response) => {
      if (response && response.statusCode == 200) {
        this.isLoading = false;
        return response.data;
      }
      else {
        this.isLoading = false;
      }
    })
    );
  }

  init = (url: any) => {
    if (!url) return;

    this.isLoading = true;
    this.dataPassed = [];
    this.ds.clearData();

    this.fetchRecords(url).subscribe({
      next: (response) => {
        if (response?.length != 0) {
          this.ds.sendData(response);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  records = () => {
    this.subscription = this.ds.getData().subscribe((x) => {
      this.dataPassed = x;
    });
  }

  create(body: any, id?: string, path?: string): Observable<any> {
    const request = id ? this.service.patch<any>(`${path}/${id}`, body) : this.service.post<any>(`${path}`, body);
    return request.pipe(map((response) => {
      if (response && (response.statusCode == 200 || response.statusCode == 201)) {
        return response;
      }
    })
    );
  }

  getById(id: string, path: string): Observable<any> {
    return this.service.get<any>(`${path}/${id}`).pipe(map((response) => {
      if (response) {
        return response.data;
      }
    })
    );
  }

  deleteById(id: string, path: string): Observable<any> {
    return this.service.delete<any>(`${path}/${id}`).pipe(map((response) => {
      if (response) {
        return response;
      }
    })
    );
  }

  getFileUrl(body: any): Observable<any> {
    return this.service.post<any>(`file/upload`, body).pipe(map((response) => {
      if (response && (response.statusCode == 200 || response.statusCode == 201)) {
        return response.data;
      }
    })
    );
  }

  getFilePath() {
    return this.service.getFileUrl();
  }

  openModalWithComponent(component: any, data?: any, style?: any, id?: any) {
    const config: any = {
      backdrop: 'static',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      initialState: {
        ID: id,
        Data: data,
      },
    };
    this.bsModalRef = this.modalService.show(component, config);
    const setClass = style !== undefined ? style : '';
    this.bsModalRef.setClass(setClass);
    this.bsModalRef.content.closeBtnName = 'Close';
    return this.bsModalRef;
  }

  getWindowPath() {
    let path = window.location.pathname;
    return path;
  }

  goBack() {
    window.history.back();
  }

  successToast(alertName?: any) {
    this.alertData.dangerOpen = false;
    this.alertData.successOpen = true;
    this.alertData.alertTxt = alertName;
    localStorage.setItem('currentAlert', JSON.stringify(this.alertData));
    this.currentAlertSubject.next(this.alertData.timeout);
  }

  errorToast(alertName?: any) {
    this.alertData.successOpen = false;
    this.alertData.dangerOpen = true;
    this.alertData.alertTxt = alertName;
    localStorage.setItem('currentAlert', JSON.stringify(this.alertData));
    this.currentAlertSubject.next(this.alertData.timeout);
  }

  exportXLSX_Table(object: any, filenames: any) {
    try {
      let data = object;
      let filename = filenames;
      var dates = new DatePipe('en-Us').transform(
        new Date(),
        'dd-MM-yyyy hh:mm a'
      );
      const replacer = (key: any, value: any) => value === null || !value ? '' : value.toString();
      const header = Object.keys(data[0]);
      let csv = data.map((row: any) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(',')
      );
      csv.unshift(header.join(','));
      let csvArray = csv.join('\r\n');
      var blob = new Blob([csvArray], { type: 'text/csv' });
      var link: any = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename + '_' + dates + '.csv';
      link.click();
    } catch (e) {
      console.log(e);
    }
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}