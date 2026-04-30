import { Component, ElementRef, OnChanges, OnInit, Input, ViewChild } from '@angular/core';
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
  @Input() collapsed = false;
  
  constructor(public auth: AuthService, public service: BaseService, private router: Router, public route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

}