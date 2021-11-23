import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponse, Category, Division, Position, User} from "../../../shared/interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) {
  }

  createPosition(position: Position): Observable<Position>  {
    return this.http.post<Position>(`${environment.url}/position/create`, position)
  }

  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(`${environment.url}/position/get`)
  }

  getPositionsByDivisionUniq(id: string | null): Observable<Position[]> {
    return this.http.get<Position[]>(`${environment.url}/position/get?division_uniq=${id}`)
  }

}
