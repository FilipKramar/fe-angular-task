import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeComponent } from './jokeComponent';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokeComponent]
    });
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
