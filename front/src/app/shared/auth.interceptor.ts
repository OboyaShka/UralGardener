import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    req = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    })

    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err: ', err)
          if (err.status === 401) {
            this.auth.logout()
            this.router.navigate(['/login'], {
              queryParams: {
                authFailed: err
              }
            })
          }
          return throwError(err)
        })
      )
  }
}
