import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { LeftnavComponent } from './component/leftnav/leftnav.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { FooterComponent } from './component/footer/footer.component';
import { GlobalAlertComponent } from './component/global-alert/global-alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftnavComponent,
    MainLayoutComponent,
    FooterComponent,
    GlobalAlertComponent
  ],
  imports: [
    RouterModule,
    AlertModule.forRoot(),
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    LeftnavComponent,
    MainLayoutComponent,
    FooterComponent,
    GlobalAlertComponent
  ],
})
export class CoreModule { }