import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { AuthGuard } from "../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '', redirectTo: 'main/home', pathMatch: 'full'
  },
  {
    path: 'main', component: MainComponent, canActivateChild: [AuthGuard], children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'example', loadChildren: () => import('./example/example.module').then(m => m.ExampleModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
