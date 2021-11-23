import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Division, Product} from "../../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  createProduct(product: Product): Observable<Product>  {
    return this.http.post<Product>(`${environment.url}/product/create`, product)
  }

  getAllProducts(category: string | null = null, division: string | null = null, position: string | null = null,): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url}/product/get?${category ? 'category_uniq=' + category : ""}${division ? '&division_uniq=' + division : ""}${position ? '&position_uniq=' + position : ""}`)
  }


}
