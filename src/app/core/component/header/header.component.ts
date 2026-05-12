import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/_services/auth.service';
import { BaseService } from "../../../shared/_services/baseStore.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, private renderer: Renderer2, public service: BaseService, private router: Router) {

  }

  @Output() sidebarToggle = new EventEmitter<void>();
  isOpen = false;

  ngOnInit(): void {

  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.auth.logout();
  }

  closeDropdown() {
    this.isOpen = false;
  }
}