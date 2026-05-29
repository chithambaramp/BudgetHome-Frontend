import { Routes } from '@angular/router';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { CreateExpensesComponent } from './create-expenses/create-expenses.component';


export const expensesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ExpensesListComponent,
            },
            {
                path: 'create-expenses',
                component: CreateExpensesComponent,
            },
        ]
    }
];