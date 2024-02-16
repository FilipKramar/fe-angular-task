import { Component, OnInit } from '@angular/core';
import { JokeService } from '../joke-service';

@Component({
  selector: 'app-joke-component',
  templateUrl: './jokeComponent.html',
  styleUrls: ['./jokeComponent.css']
})
export class JokeComponent implements OnInit {

  jokes:any[]=[];
  currentIndex=0;
  isClicked:boolean=false;

  constructor(private jokeService:JokeService){}
 
  ngOnInit(): void {
    this.loadJokes();
   
 }

 toggleHeart(): void {
  this.isClicked = !this.isClicked;
}

loadNextJoke() {
  this.currentIndex = (this.currentIndex + 1);
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
}