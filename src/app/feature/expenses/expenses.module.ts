import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { expensesRoutes } from './expenses.routing';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { CreateExpensesComponent } from './create-expenses/create-expenses.component';

@NgModule({
  declarations: [
    ExpensesListComponent,
    CreateExpensesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(expensesRoutes),
  ],
})
export class ExpensesModule { }