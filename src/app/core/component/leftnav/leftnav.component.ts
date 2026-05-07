import { Component, ElementRef, OnChanges, OnInit, Input, ViewChild, HostListener } from '@angular/core';
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
      title: 'Settings 1',
      icon: 'fa-solid fa-gear',
      open: false,
      route: '/settings', // ✅ parent route (important)
      children: [
        {
          title: 'Profile 1',
          route: '/settings/profile',
          icon: 'fa-solid fa-user'
        },
        {
          title: 'Preferences 1',
          route: '/settings/preferences',
          icon: 'fa-solid fa-sliders'
        }
      ]
    },
    {
      title: 'Settings 2',
      icon: 'fa-solid fa-gear',
      open: false,
      route: '/settings', // ✅ parent route (important)
      children: [
        {
          title: 'Profile 2',
          route: '/settings/profile',
          icon: 'fa-solid fa-user'
        },
        {
          title: 'Preferences 2',
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

  autoExpandWhenChildActive() {
    this.menu.forEach(item => {
      if (item.children?.some(c => c.route && this.router.url.startsWith(c.route))) {
        item.open = true;
      }
    });
  }

  openMenu(item: MenuItem, event: MouseEvent) {
    this.menu.forEach(m => {
      if (m !== item) m.open = false;
    });

    if (item.children) {
      item.open = !item.open;
    }

    // Collapse View Sidebar Sub Menu
    if (this.collapsed) {
      const overlay = document.getElementById('leftnav-submenu-overlay');
      if (!overlay) return;
      if (!item.children) {
        overlay.innerHTML = ''; // ✅ close submenu
        return;
      }
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const currentUrl = this.router.url;
      overlay.innerHTML = `
      <div class="leftnav-submenu-popup" style="
       position: fixed;
      top: ${rect.top}px;
      left: ${rect.right}px;">
      ${item.children?.map(c => {
        const isActive = currentUrl.startsWith(c.route || '');
        return `
        <div class="leftnav-submenu-item ${isActive ? 'active-collapse-submenu' : ''}" data-route="${c.route}">
        <i class="${c.icon || ''}"></i>
        <span>${c.title}</span>
        </div>
      `;
      }).join('')}
  </div>
`;

      //Attach click listeners
      overlay.querySelectorAll('.leftnav-submenu-item').forEach(el => {
        el.addEventListener('click', (e: any) => {
          const route = e.currentTarget.getAttribute('data-route');
          if (route) {
            this.router.navigate([route]);   // ✅ routing works
            overlay.innerHTML = '';          // ✅ close submenu
          }
        });
      });
    }
  }

  // Close SubMenu Outside Click
  @HostListener('document:click', ['$event'])
  handleOutsideClickSubMenuClose(event: MouseEvent) {
    const overlay = document.getElementById('leftnav-submenu-overlay');

    if (!overlay) return;

    const clickedInsidePopup = (event.target as HTMLElement).closest('.leftnav-submenu-popup');
    const clickedSidebar = (event.target as HTMLElement).closest('.sidebar');

    if (!clickedInsidePopup && !clickedSidebar) {
      overlay.innerHTML = '';   // ✅ close submenu
    }
  }

  // Collapse View Hover Menu
  openMenuHover(item: MenuItem, event: MouseEvent) {
    if (this.collapsed) {
      const overlay = document.getElementById('leftnav-submenu-overlay');
      if (!overlay) return;
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      overlay.innerHTML = `
      <div class="leftnav-hover-tooltip" style="
       position: fixed;
      top: ${rect.top}px;
      left: ${rect.right}px;">
        <div class="leftnav-hover-tooltip-item">
        <span>${item?.title}</span>
        </div>
      </div>`;
    }
  }

  // Hover Menu Close
  closeHoverMenu() {
    if (this.collapsed) {
      const overlay = document.getElementById('leftnav-submenu-overlay');
      const popup = overlay?.querySelector('.leftnav-hover-tooltip');
      popup?.remove();
    }
  }
}