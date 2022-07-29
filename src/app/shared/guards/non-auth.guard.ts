import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { GeneralFunctionsService } from "../services/general-functions.service";

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivateChild {

  constructor(private router: Router,
              private generalService: GeneralFunctionsService) {
  }

  public canActivateChild(): boolean {
    return true; // Remove this line if complete auth process
    if ((sessionStorage.getItem('token') &&
        this.generalService.tokenExpired(sessionStorage.getItem('token').split(' ')[1])) ||
      !sessionStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/main']);
    return false;
  }
}
