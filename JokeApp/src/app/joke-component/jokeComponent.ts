import { Component, OnInit } from '@angular/core';
import { JokeService } from '../joke-service';

@Component({
  selector: 'app-joke-component',
  templateUrl: './jokeComponent.html',
  styleUrls: ['./jokeComponent.css']
})
export class JokeComponent implements OnInit {
  favouriteJokes:any[]=[];
  jokes:any[]=[];
  currentIndex=0;
  isClicked:boolean=false;

  constructor(private jokeService:JokeService){}
 
  ngOnInit(): void {
    this.loadJokes();
    this.loadFavoriteJokes();
   
 }


loadNextJoke() {
  this.currentIndex = (this.currentIndex + 1);
  if(this.favouriteJokes.includes(this.jokes[this.currentIndex])){
    this.isClicked=true;
  }
  else this.isClicked=false;
  if(this.currentIndex>9){
    this.loadJokes();
  }
}
loadJokes() {
  this.jokeService.fetchJokes().subscribe((data: any) => {
    this.jokes = data.jokes; 
    this.currentIndex = 0; 
  });
}

toggleFavorite() {
  const currentJoke = this.jokes[this.currentIndex];
  this.isClicked = !this.isClicked;
  if (this.isClicked) {
    const jokeWithTimestamp = {
      joke: currentJoke,
      timestamp: new Date().toDateString()
    };
    this.favouriteJokes.push(jokeWithTimestamp);
  } else {
    this.favouriteJokes = this.favouriteJokes.filter(joke => joke.joke !== currentJoke);
  }
  this.saveFavoriteJokes();
}

saveFavoriteJokes() {
  this.jokeService.saveFavoriteJokes(this.favouriteJokes);
}

loadFavoriteJokes() {
  this.favouriteJokes = this.jokeService.getFavoriteJokes();
}

deleteJoke(index: number): void {
  this.favouriteJokes.splice(index, 1);
  this.jokeService.saveFavoriteJokes(this.favouriteJokes);
}
}