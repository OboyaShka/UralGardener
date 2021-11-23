import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponse, Category, Division, User} from "../../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(private http: HttpClient) {
  }

  createDivision(division: Division): Observable<any>  {
    return this.http.post<Division>(`${environment.url}/division/create`, division)
  }

  getAllDivision(): Observable<Division[]> {
    return this.http.get<Division[]>(`${environment.url}/division/get`)
  }

  getDivisionsByCategoryUniq(id: string | null): Observable<any>  {
    return this.http.get<Division[]>(`${environment.url}/division/get?category_uniq=${id}`)
  }

}
