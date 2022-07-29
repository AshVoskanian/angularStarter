import { Injectable } from '@angular/core';
import { Router, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GeneralFunctionsService } from "../services/general-functions.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router,
              private generalService: GeneralFunctionsService) {
  }

  isExistsAndValidToken() {
    return true; // Remove this line if complete auth process
    if (
      sessionStorage.getItem('token') &&
      !this.generalService.tokenExpired(sessionStorage.getItem('token').split(' ')[1])
    ) {
      return true;
    }

    this.router.navigate(["/landing/auth"]);
    return false;
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isExistsAndValidToken()) {
      return true;
    }

    this.router.navigate(['landing/auth']);
    return false;
  }
}
