import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationPopupComponent } from './_common/confirmation-popup/confirmation-popup.component';
import { NumbersOnlyDirective } from './_directives/numbers-only.directive';
import { DisableCutCopyPasteDirective } from './_directives/disable-copy-paste.directive';
import { OutsideClickDirective } from './_directives/outside-click.directive';
import { CustomDatePipe } from './_pipes/date.pipes';
import { CapitalizePipe, UpperPipe, LowerPipe, TitleCasePipe, InitialsPipe, TrimPipe, TruncatePipe, MaskPipe } from './_pipes/string.pipes';
import { TotalPipe, BalancePipe, CurrencyFormatPipe, NumberFormatPipe, SearchPipe, FilterPipe, SortPipe, StatusPipe } from './_pipes/utility.pipes';

@NgModule({
  declarations: [
    ConfirmationPopupComponent,
    NumbersOnlyDirective,
    DisableCutCopyPasteDirective,
    OutsideClickDirective,
    CustomDatePipe,
    CapitalizePipe,
    UpperPipe,
    LowerPipe,
    TitleCasePipe,
    InitialsPipe,
    TrimPipe,
    TruncatePipe,
    MaskPipe,
    TotalPipe,
    BalancePipe,
    CurrencyFormatPipe,
    NumberFormatPipe,
    SearchPipe,
    FilterPipe,
    SortPipe,
    StatusPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
  ],
  exports: [
    ConfirmationPopupComponent,
    NumbersOnlyDirective,
    DisableCutCopyPasteDirective,
    OutsideClickDirective,
    CustomDatePipe,
    CapitalizePipe,
    UpperPipe,
    LowerPipe,
    TitleCasePipe,
    InitialsPipe,
    TrimPipe,
    TruncatePipe,
    MaskPipe,
    TotalPipe,
    BalancePipe,
    CurrencyFormatPipe,
    NumberFormatPipe,
    SearchPipe,
    FilterPipe,
    SortPipe,
    StatusPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
  ],
  providers: [],
})
export class SharedModule { }