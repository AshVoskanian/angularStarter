import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../shared/dialog/dialog.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild('container') container!: any;

  hide: boolean = true;
  authorizationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeForm();

    setTimeout(() => {
      this.container.nativeElement.classList.add('hover-effect')
    }, 300)
  }

  initializeForm() {
    this.authorizationForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    this.authorizeUser();
  }

  authorizeUser() {
    // this.loadingService.start();

    const userName = this.authorizationForm.controls['userName'].value;
    const password = this.authorizationForm.controls['password'].value;

    this.router.navigate(['main']).then();

    // if some error occurred
    return;
    this.dialog.open(DialogComponent, {
      width: '30%',
      restoreFocus: false,
      data: {
        title: 'Error',
        content: 'Some error text',
        cancelText: 'Close',
        warning: true
      }
    });

  }

}
