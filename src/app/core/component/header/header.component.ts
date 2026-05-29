import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/_services/auth.service';
import { BaseService } from "../../../shared/_services/baseStore.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public service: BaseService, public auth: AuthService, private router: Router) {

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