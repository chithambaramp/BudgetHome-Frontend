import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {
  baseUrl: string = "../../../../assets/images/";

  constructor(public auth: AuthService, public service: BaseService, private router: Router, public route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

  // toggle(index: number) {
  //   if (window.matchMedia("(min-width: 1024px) and (max-width: 1200px)").matches) {
  //     const sidebarElement = document.getElementById('mySidebar') as HTMLElement;
  //     const mainElement = document.getElementById('bodyContainer') as HTMLElement;
  //     localStorage.setItem('text-hide', 'show')
  //     sidebarElement.style.width = "28%";
  //     mainElement.style.marginLeft = '28%';
  //   }
  // }
}