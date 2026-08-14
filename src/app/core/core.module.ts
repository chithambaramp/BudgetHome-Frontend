import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { LeftnavComponent } from './component/leftnav/leftnav.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { FooterComponent } from './component/footer/footer.component';
import { GlobalAlertComponent } from './component/global-alert/global-alert.component';
import { LoaderComponent } from './component/loader/loader.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftnavComponent,
    MainLayoutComponent,
    FooterComponent,
    GlobalAlertComponent,
    LoaderComponent
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
    GlobalAlertComponent,
    LoaderComponent
  ],
})
export class CoreModule { }