import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, public service: BaseService) {
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
}