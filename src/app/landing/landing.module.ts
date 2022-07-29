import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { LandingComponent } from './landing.component';
import { SharedModule } from "../shared/shared.module";
import { LandingRoutingModule } from "./landing-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    AuthComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule {
}
