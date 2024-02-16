import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private favoriteJokesKey='favoriteJokes';
  private apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=10';
  constructor( private http:HttpClient) { }

  fetchJokes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  saveFavoriteJokes(jokes: any[]) {
  
    const jokesWithTimestamp = jokes.map(joke => ({
      joke: joke.joke,
      timestamp: new Date().toDateString() 
    }));

    localStorage.setItem(this.favoriteJokesKey, JSON.stringify(jokesWithTimestamp));
  }

  getFavoriteJokes(): any[] {
    const jokesString = localStorage.getItem(this.favoriteJokesKey);
    return jokesString ? JSON.parse(jokesString) : [];
  }
}
