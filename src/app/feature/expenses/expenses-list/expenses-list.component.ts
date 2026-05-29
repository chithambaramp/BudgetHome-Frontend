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

  expenses = [
    { id: 1, date: '2026-04-01', category: 'Food', title: 'Lunch', amount: 250 },
    { id: 2, date: '2026-04-01', category: 'Transport', title: 'Bus', amount: 50 },
    { id: 3, date: '2026-04-02', category: 'Shopping', title: 'Clothes', amount: 1200 },
    { id: 4, date: '2026-04-02', category: 'Bills', title: 'Electricity', amount: 1800 },
    { id: 5, date: '2026-04-03', category: 'Food', title: 'Dinner', amount: 400 },
    { id: 6, date: '2026-04-03', category: 'Health', title: 'Medicine', amount: 300 },
    { id: 7, date: '2026-04-04', category: 'Transport', title: 'Auto', amount: 120 },
    { id: 8, date: '2026-04-04', category: 'Entertainment', title: 'Movie', amount: 500 },
    { id: 9, date: '2026-04-05', category: 'Food', title: 'Snacks', amount: 150 },
    { id: 10, date: '2026-04-05', category: 'Bills', title: 'Internet', amount: 800 },
    { id: 11, date: '2026-04-06', category: 'Shopping', title: 'Groceries', amount: 2200 },
    { id: 12, date: '2026-04-06', category: 'Transport', title: 'Fuel', amount: 1000 },
    { id: 13, date: '2026-04-07', category: 'Health', title: 'Doctor', amount: 700 },
    { id: 14, date: '2026-04-07', category: 'Food', title: 'Breakfast', amount: 120 },
    { id: 15, date: '2026-04-08', category: 'Entertainment', title: 'OTT', amount: 299 },
    { id: 16, date: '2026-04-08', category: 'Bills', title: 'Water', amount: 300 },
    { id: 17, date: '2026-04-09', category: 'Shopping', title: 'Shoes', amount: 1500 },
    { id: 18, date: '2026-04-09', category: 'Transport', title: 'Cab', amount: 350 },
    { id: 19, date: '2026-04-10', category: 'Food', title: 'Dinner', amount: 450 },
    { id: 20, date: '2026-04-10', category: 'Others', title: 'Gift', amount: 1000 }
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