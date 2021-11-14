import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    {
      console.log(this.authService.isAdmin())
      if (this.authService.isAdmin()) {
        return true
      } else {
        this.router.navigate(['/'], {
          queryParams: {
            noRules: true
          }
        })
      }
    }
  }



}