import { Component, OnInit } from '@angular/core';
import { JokeService } from '../joke-service';

@Component({
  selector: 'app-joke-component',
  templateUrl: './jokeComponent.html',
  styleUrls: ['./jokeComponent.css']
})
export class JokeComponent implements OnInit {

  jokes:any;
  isClicked:boolean=false;

  constructor(private jokeService:JokeService){}
 
  ngOnInit(): void {
    this.loadJokes();
   
 }
 
 toggleHeart(): void {
  this.isClicked = !this.isClicked;
}

 loadJokes(){

  this.jokeService.fetchJokes().subscribe(

    data=> {
      console.log(data);
      this.jokes=data;
    },error => {
      console.error('Error fetching joke:', error);
      this.jokes = { setup: 'Failed to fetch joke', delivery: 'Please try again later' };
    }
  );

    }

 }

