import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ExampleComponent } from "./example.component";
import { SharedModule } from "../../shared/shared.module";

const routes: Routes = [
  { path: '', component: ExampleComponent },
];

@NgModule({
  declarations: [
    ExampleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ExampleModule { }
