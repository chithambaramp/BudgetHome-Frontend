import { Component, ElementRef, OnChanges, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';

interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  children?: ChildMenu[];
  open?: boolean;
}

interface ChildMenu {
  title: string;
  icon: string;
  route?: string;
}

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
    this.autoExpandWhenChildActive();
  }

  menu: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'fa-solid fa-house',
      route: '/dashboard',
    },
    {
      title: 'Report',
      icon: 'fa-solid fa-chart-line',
      route: '/report',
    },
    {
      title: 'Settings',
      icon: 'fa-solid fa-gear',
      open: false,
      route: '/settings', // ✅ parent route (important)
      children: [
        {
          title: 'Profile',
          route: '/settings/profile',
          icon: 'fa-solid fa-user'
        },
        {
          title: 'Preferences',
          route: '/settings/preferences',
          icon: 'fa-solid fa-sliders'
        }
      ]
    },
    {
      title: 'Category',
      icon: 'fa-solid fa-list',
      route: '/category',
    },
    {
      title: 'Income',
      icon: 'fa-solid fa-wallet',
      route: '/income',
    },
    {
      title: 'Expenses',
      icon: 'fa-solid fa-money-bill',
      route: '/expenses',
    }
  ];

  toggle(item: MenuItem) {
    this.menu.forEach(m => {
      if (m !== item) m.open = false;
    });

    if (item.children) {
      item.open = !item.open;
    }
  }

  autoExpandWhenChildActive() {
    this.menu.forEach(item => {
      if (item.children?.some(c => c.route && this.router.url.startsWith(c.route))) {
        item.open = true;
      }
    });
  }
}