import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public service: BaseService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {

  }

  isCollapsed = false;
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeSidebar() {
    this.isCollapsed = false;
  }

  isMobile = window.innerWidth <= 768;
  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

}