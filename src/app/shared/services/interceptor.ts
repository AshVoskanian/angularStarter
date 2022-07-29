import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NotificationsService } from "./notifications.service";
import { ErrorMessageType, IconType } from "../enums/enums";

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router,
              private notificationService: NotificationsService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken: string = sessionStorage.accessToken ? `Bearer ${sessionStorage.accessToken}` : '';

    let cloneReq: HttpRequest<any>;
    const headers: any = {};
    if (accessToken) {
      headers.Authorization = accessToken;
    }

    cloneReq = req.clone({
      withCredentials: true,
      responseType: req.method !== 'GET' ? 'text' : null,
      setHeaders: headers
    });
    return next.handle(cloneReq).pipe(map((data) => InterceptorService.handleResponse(data)), catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private static handleResponse(data: any): Observable<any> {
    return data;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 404) {
      this.router.navigate(['/error-404']);
    } else if (error.status === 401 || error.status === 403) {
      const errorText: string = error.status === 401 ? 'Unauthorized' : 'error_403';

      this.notificationService.message.next({
        message: errorText,
        type: ErrorMessageType.Error,
        icon: IconType.Info,
        translate: true,
      });

      this.router.navigate(['/']);
    } else if (
      error.status === 0 ||
      error.status === 500 ||
      error.status === 502 ||
      error.status === 503 ||
      error.status === 504
    ) {
      this.notificationService.message.next({
        message: 'Server Error',
        type: ErrorMessageType.Error,
        icon: IconType.Info
      });
    } else if (error.status === 400) {
      this.notificationService.message.next({
        message: 'Bad Request',
        type: ErrorMessageType.Error,
        icon: IconType.Info
      });
    } else if (error.status !== 409 && error.status !== 422) {
      // notify user
    }
    return throwError(error);
  }
}
