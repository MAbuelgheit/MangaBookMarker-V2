import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(private _http : HttpClient) { }

  addManga(data : any) : Observable<any>{
    return this._http.post('http://localhost:3000/Mangas',data)
  }
  getMangaList() : Observable<any>{
    return this._http.get('http://localhost:3000/Mangas')
  }
  deleteManga(id : string) : Observable<any>{
    return this._http.delete(`http://localhost:3000/Mangas/${id}`)
  }
  editManga(id : string , data : any) : Observable<any>{
    return this._http.put(`http://localhost:3000/Mangas/${id}`,data)
  }
}
