import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { SharedModule } from "../../shared/shared.module";
const routes: Routes = [
  { path: '', component: AuthComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthModule { }
