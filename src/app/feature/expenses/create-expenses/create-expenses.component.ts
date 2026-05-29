import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/app/shared/_services/baseStore.service';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { fileUpload, omitEmptyDeep } from 'src/app/shared/_common/utils';
import { PATH } from 'src/app/shared/_helpers/entity';

@Component({
  selector: 'app-create-expenses',
  templateUrl: './create-expenses.component.html',
  styleUrls: ['./create-expenses.component.scss']
})

export class CreateExpensesComponent implements OnInit {
  expensesForm!: FormGroup;
  submitted = false;
  isLoading!: boolean;
  ID: any;
  constructor(public service: BaseService, public auth: AuthService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.ID = this.route.snapshot.queryParamMap.get('ref');
  }

}