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
  // isToggle: boolean = false;
  // @Output() toggleChanged = new EventEmitter<boolean>();
  // isMenuOpen = false;
  // isNotifyMenuOpen = false;
  // constructor(public auth: AuthService, private renderer: Renderer2, public service: BaseService, private router: Router) {
  //   this.renderer.listen('window', 'click', (e: any) => {
  //     if (e.target && e.target.className.indexOf('toggleButton') == -1) {
  //       this.isMenuOpen = false;
  //     }
  //   });
  //   this.renderer.listen('window', 'click', (e: any) => {
  //     if (e.target && e.target.className.indexOf('toggleNotifyButton') == -1) {
  //       this.isNotifyMenuOpen = false;
  //     }
  //   });
  // }

  ngOnInit(): void {
  //   const sidebarElement = document.getElementById('mySidebar') as HTMLElement;
  //   const mainElement = document.getElementById('bodyContainer') as HTMLElement;

  //   // Side Nav Width Matching Mobile Small
  //   if (window.matchMedia("(max-width: 375px)").matches) {
  //     if (this.isToggle) {
  //       sidebarElement.style.width = "75%";

  //     } else {
  //       sidebarElement.style.width = "0%";
  //     }
  //   }
  //   // Side Nav Width Matching Mobile Standard
  //   else if (window.matchMedia("(max-width: 500px)").matches) {
  //     if (this.isToggle) {
  //       sidebarElement.style.width = "65%";

  //     } else {
  //       sidebarElement.style.width = "0%";
  //     }
  //   }
  //   // Side Nav Width Matching Tablet
  //   else if (window.matchMedia("(max-width: 768px)").matches) {
  //     if (this.isToggle) {
  //       sidebarElement.style.width = "35%";

  //     } else {
  //       sidebarElement.style.width = "0%";
  //     }
  //   }

  //   // Side Nav Width Matching Tablet Landscape
  //   else if (window.matchMedia("(max-width: 1200px)").matches) {
  //     if (localStorage.getItem('text-hide') == 'hide') {
  //       sidebarElement.style.width = "6%";
  //       mainElement.style.marginLeft = '6%';
  //     } else {
  //       sidebarElement.style.width = "28%";
  //       mainElement.style.marginLeft = '28%';
  //     }
  //   }

  //   // Side Nav Width Matching Laptop Medium
  //   else if (window.matchMedia("(max-width: 1440px)").matches) {
  //     if (localStorage.getItem('text-hide') == 'hide') {
  //       sidebarElement.style.width = "5%";
  //       mainElement.style.marginLeft = '5%';
  //     } else {
  //       sidebarElement.style.width = "19%";
  //       mainElement.style.marginLeft = '19%';
  //     }
  //   }

  //   // Side Nav Width Matching Laptop Standard
  //   else if (window.matchMedia("(max-width: 1600px)").matches) {
  //     if (localStorage.getItem('text-hide') == 'hide') {
  //       sidebarElement.style.width = "4%";
  //       mainElement.style.marginLeft = '4%';
  //     } else {
  //       sidebarElement.style.width = "18%";
  //       mainElement.style.marginLeft = '18%';
  //     }
  //   }

  //   // Side Nav Width Matching Desktop & Above
  //   else {
  //     if (localStorage.getItem('text-hide') == 'hide') {
  //       sidebarElement.style.width = "5%";
  //       mainElement.style.marginLeft = '5%';
  //     } else {
  //       sidebarElement.style.width = "16%";
  //       mainElement.style.marginLeft = '16%';
  //     }
  //   }
  }



  // logout() {
  //   this.auth.logout();
  // }

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  //   this.toggleChanged.emit(this.isMenuOpen);
  // }

  // toggle() {
  //   this.isToggle = !this.isToggle;
  //   const sidebarElement = document.getElementById('mySidebar') as HTMLElement;
  //   const mainElement = document.getElementById('bodyContainer') as HTMLElement;

  //   if (window.matchMedia("(max-width: 375px)").matches) {
  //     if (this.isToggle) {
  //       sidebarElement.style.width = "75%";

  //     } else {
  //       sidebarElement.style.width = "0%";
  //     }
  //   }
  //   // Side Nav Width Matching Mobile Standard
  //   else if (window.matchMedia("(max-width: 500px)").matches) {
  //     if (this.isToggle) {
  //       sidebarElement.style.width = "65%";

  //     } else {
  //       sidebarElement.style.width = "0%";
  //     }
  //   }
  //   // Side Nav Width Matching Tablet
  //   else if (window.matchMedia("(max-width: 768px)").matches) {
  //     if (this.isToggle) {
  //       sidebarElement.style.width = "35%";

  //     } else {
  //       sidebarElement.style.width = "0%";
  //     }
  //   }

  //   // Side Nav Width Matching Tablet Landscape
  //   else if (window.matchMedia("(max-width: 1200px)").matches) {
  //     if (this.isToggle || sidebarElement.style.width == '28%') {
  //       localStorage.setItem('text-hide', 'hide')
  //       sidebarElement.style.width = "6%";
  //       mainElement.style.marginLeft = '6%';
  //     } else {
  //       localStorage.setItem('text-hide', 'show')
  //       sidebarElement.style.width = "28%";
  //       mainElement.style.marginLeft = '28%';
  //     }
  //   }

  //   // Side Nav Width Matching Laptop Medium
  //   else if (window.matchMedia("(max-width: 1440px)").matches) {
  //     if (this.isToggle || sidebarElement.style.width == '19%') {
  //       localStorage.setItem('text-hide', 'hide')
  //       sidebarElement.style.width = "5%";
  //       mainElement.style.marginLeft = '5%';
  //     } else {
  //       localStorage.setItem('text-hide', 'show')
  //       sidebarElement.style.width = "19%";
  //       mainElement.style.marginLeft = '19%';
  //     }
  //   }

  //   // Side Nav Width Matching Laptop Standard
  //   else if (window.matchMedia("(max-width: 1600px)").matches) {
  //     if (this.isToggle || sidebarElement.style.width == '18%') {
  //       localStorage.setItem('text-hide', 'hide')
  //       sidebarElement.style.width = "4%";
  //       mainElement.style.marginLeft = '4%';
  //     } else {
  //       localStorage.setItem('text-hide', 'show')
  //       sidebarElement.style.width = "18%";
  //       mainElement.style.marginLeft = '18%';
  //     }
  //   }

  //   // Side Nav Width Matching Desktop & Above
  //   else {
  //     if (this.isToggle || sidebarElement.style.width == '16%') {
  //       localStorage.setItem('text-hide', 'hide')
  //       sidebarElement.style.width = "4%";
  //       mainElement.style.marginLeft = '4%';
  //     } else {
  //       localStorage.setItem('text-hide', 'show')
  //       sidebarElement.style.width = "16%";
  //       mainElement.style.marginLeft = '16%';
  //     }
  //   }
  // }
}
