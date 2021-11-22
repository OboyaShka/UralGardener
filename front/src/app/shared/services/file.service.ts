import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse, User} from "../interfaces";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) {}

  sendImage(image: File): Observable<any>{
    const fd = new FormData()

    let imgName = new Date().getTime() + "_" + image.name
    fd.append('image', image, imgName)

    return this.http.post<any>(`${environment.url}/file/image/upload`, fd)
  }


}
