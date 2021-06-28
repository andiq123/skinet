import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse) {
          if (errorResponse.status === 400 || errorResponse.status === 401) {
            const apiResponse: {
              statusCode: number;
              message: string;
              errors: string[];
            } = errorResponse.error;

            switch (errorResponse.status) {
              case 400:
                if (apiResponse.errors) {
                  apiResponse.errors.forEach((x) => {
                    this.toastr.error(x, apiResponse.statusCode.toString());
                  });
                  return throwError(apiResponse.errors);
                } else {
                  this.toastr.error(
                    apiResponse.message,
                    apiResponse.statusCode.toString()
                  );
                }
                break;

              case 401:
                this.toastr.error(
                  apiResponse.message,
                  apiResponse.statusCode.toString()
                );
                break;

              default:
                this.toastr.error(
                  apiResponse.message,
                  apiResponse.statusCode.toString()
                );
                break;
            }
          }

          if (errorResponse.status === 404) {
            this.router.navigateByUrl('/not-found');
          }

          if (errorResponse.status === 500) {
            const apiResponse: {
              details: string;
              statusCode: number;
              message: string;
            } = errorResponse.error;

            const navigationExtras: NavigationExtras = {
              state: { error: apiResponse },
            };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }

        return throwError(errorResponse);
      })
    );
  }
}
