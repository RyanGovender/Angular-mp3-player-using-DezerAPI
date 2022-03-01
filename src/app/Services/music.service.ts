import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from '../Models/IResult';
import { IAlbum } from '../Models/IAlbum';


@Injectable({
  providedIn: 'root'
})

export class MusicService {

  //https://cors-anywhere.herokuapp.com/
  private  _url = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/';

  constructor(private _http:HttpClient) { }

  searchMusic(value):Observable<IResult[]>
  {
    var type ='artist';
    const _searchUrl = `search?q=${value}&offset=0&limit=10&type=${type}&request_method=GET`;
    //return this._http.get<IResult[]>('assets/ed.json');
     return this._http.get<IResult[]>(this._url + _searchUrl);
  }

  getAlbumDetails(albumId):Observable<IAlbum>
  {
    const _getAlbumDetails = 'album/'
    return this._http.get<IAlbum>(`${this._url}${_getAlbumDetails}${albumId}`);
  }

  
}
