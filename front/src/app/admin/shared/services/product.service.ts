import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  createPosition(product: Product): Observable<Product>  {
    return this.http.post<Product>(`${environment.url}/product/create`, product)
  }



}
