import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponse, Category, Division, User} from "../../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  createCategory(category: Category): Observable<any>  {
    return this.http.post<Category>(`${environment.url}/category/create`, category)
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url}/category/all`)
  }

  getCategoryByDivision(id: string | null): Observable<any>  {
    return this.http.get<Division[]>(`${environment.url}/category/get?division_uniq=${id}`)
  }

  getCategoryByUniqName(id: string | null): Observable<any>  {
    return this.http.get<Division[]>(`${environment.url}/category/get?uniq_name=${id}`)
  }

}
