import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MainLayoutComponent } from './core/component/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/user-role.enum';
import { ErrorPageComponent } from './auth/error-404/error-404.component';
import { NetworkErrorComponent } from './auth/network-error/network-error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '404',
    component: ErrorPageComponent
  },

  {
    path: 'network-error',
    component: NetworkErrorComponent
  },

  {
    path: '',
    component: MainLayoutComponent,
    canMatch: [AuthGuard],
    children: [
      {
        path: 'expenses',
        loadChildren: () => import('./feature/expenses/expenses.module').then((m) => m.ExpensesModule),
        canMatch: [RoleGuard],
        data: {
          roles: [UserRole.USER]
        }
      },
    ],
  },

  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
