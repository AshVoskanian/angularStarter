import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing.component";
import { NonAuthGuard } from "../shared/guards/non-auth.guard";

const routes: Routes = [
  {
    path: '', redirectTo: "landing/auth", pathMatch: "full"
  },
  {
    path: 'landing', component: LandingComponent, canActivateChild:[NonAuthGuard], children: [
      {
        path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {
}
