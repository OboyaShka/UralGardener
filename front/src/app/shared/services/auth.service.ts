import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthResponse, User} from "../interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', 'http://localhost:3000');

  constructor(private http: HttpClient) {}

  get token(): string | null {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('token-exp'))

    if (new Date() > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('token')
  }

  login(user: User): Observable<any> {
    return this.http.post<AuthResponse>(`${environment.url}/auth/login`, user, {headers: this.headers})
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  register(user: User): Observable<any> {
    return this.http.post<AuthResponse>(`${environment.url}/auth/register`, user, {headers: this.headers})
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error

    this.error$.next('Ошибка авторизации')

    return throwError(message)
  }

  private setToken(res: AuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
      localStorage.setItem('token', res.accessToken)
      localStorage.setItem('token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }
}
