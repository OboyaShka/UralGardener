import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponse, Category, User} from "../../../shared/interfaces";
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

}
