import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { BaseService } from 'src/app/shared/_services/baseStore.service';
import { PATH } from 'src/app/shared/_helpers/entity';
import { ConfirmationPopupComponent } from 'src/app/shared/_common/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent implements OnInit {

  constructor(public service: BaseService, public auth: AuthService, private router: Router) {

  }

  cards = [
    { title: 'Total Balance', value: 45000, icon: '💰', color: '#16a34a' },
    { title: 'Total Income', value: 75000, icon: '📈', color: '#2563eb' },
    { title: 'Total Expenses', value: 30000, icon: '📉', color: '#dc2626' },
    { title: 'Savings', value: 15000, icon: '💎', color: '#7c3aed' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
    { title: 'Food Expense', value: 5000, icon: '🍔', color: '#f59e0b' },
    { title: 'Transport', value: 3000, icon: '🚗', color: '#0ea5e9' },
    { title: 'Shopping', value: 7000, icon: '🛍️', color: '#ec4899' },
    { title: 'Bills', value: 6000, icon: '📄', color: '#6b7280' },
  ];

  ngOnInit(): void {
    // this.service.init(PATH.EXPENSES);
    // this.service.records();
  }

  Action(group: any, action: any) {
    if (action == 'Edit') {
      this.router.navigate(['expenses/edit-expenses'], {
        queryParams: { ref: group._id },
      });
    }
    if (action == 'Delete') {
      let contents = {
        title: 'Delete Expenses?',
        question: 'Are you sure you want to delete?',
        description:
          "All data related to this expenses will be permanently deleted and can't be restored. Do you still want to proceed with this action?",
        yesBtn: 'Yes, Delete',
        noBtn: 'No',
      };
      let bsModalRef = this.service.openModalWithComponent(
        ConfirmationPopupComponent,
        contents
      );
      bsModalRef.content.event.subscribe((res: any) => {
        if (res) {
          this.service.deleteById(group._id, PATH.EXPENSES)
            .subscribe({
              next: (response: any) => {
                this.service.init(PATH.EXPENSES);
                this.service.successToast(response.message);
              },
              error: (error) => {
                this.service.errorToast(error);
              }
            });
        }
      });
    }
  }
}