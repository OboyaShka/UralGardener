import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse, User} from "../interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}



  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.url}/auth/profile`)
  }

  updateProfile(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.url}/auth/profile`, user)
  }

}
