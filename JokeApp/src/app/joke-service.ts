import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  private apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=10';
  constructor( private http:HttpClient) { }

  fetchJokes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
}
