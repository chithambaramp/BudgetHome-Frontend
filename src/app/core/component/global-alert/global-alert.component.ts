import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseService } from 'src/app/shared/_services/baseStore.service';


@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.scss']
})
export class GlobalAlertComponent implements OnInit {

  constructor(public service: BaseService, private cdr: ChangeDetectorRef) {

  }

  dismissible: boolean = true;
  ngOnInit(): void {
    this.service.currentAlert$.subscribe((data: any) => {
      setTimeout(() => {
        this.close();
      }, data);
    })
  }
  currentAlert() {
    return JSON.parse(localStorage.getItem('currentAlert') || '{}');
  }
  currentAlertText() {
    let val = JSON.parse(localStorage.getItem('currentAlert') || '{}').alertTxt;
    // if (val) {
    //   let str1 = val.toLowerCase();
    //   let str2 = str1.charAt(0).toUpperCase() + str1.slice(1);
    //   return str2;
    // }
    return val;
  }
  close(event?: any) {
    localStorage.removeItem('currentAlert');
  }
}