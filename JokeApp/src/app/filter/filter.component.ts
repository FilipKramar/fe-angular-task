import { Component } from '@angular/core';
import { JokeService } from '../joke-service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  categories: Array<any> = [
    { name: 'Programming', value: 'Programming' },
    { name: 'Misc', value: 'Miscellaneous' },
    { name: 'Dark', value: 'Dark' },
    { name: 'Pun', value: 'Pun' },
    { name: 'Spooky', value: 'Spooky' },
    { name: 'Christmas', value: 'Christmas' }
  ];
  flags: Array<any> = [
    { name: 'Nsfw', value: 'nsfw' },
    { name: 'Religious', value: 'religious' },
    { name: 'Political', value: 'political' },
    { name: 'Racist', value: 'racist' },
    { name: 'Sexist', value: 'sexist' },
    { name: 'Explicit', value: 'explicit' }
  ];
  filteredJokes: FormGroup;
  isColapsed:boolean=false;
  constructor(private jokeService:JokeService,private formBuilder:FormBuilder){
    this.filteredJokes = this.formBuilder.group({
      categories: this.formBuilder.array([]),
      flags: this.formBuilder.array([])
    });
  }

  onCheckboxChange(e:any) {
    const checkedCategories: FormArray = this.filteredJokes.get('categories') as FormArray;
    if (e.target.checked) {
      checkedCategories.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkedCategories.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkedCategories.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  onChange(e:any) {
    const checkedFlags: FormArray = this.filteredJokes.get('flags') as FormArray;
    if (e.target.checked) {
      checkedFlags.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkedFlags.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkedFlags.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    const categoriesFormArray = this.filteredJokes.get('categories') as FormArray;
    const flagsFormArray = this.filteredJokes.get('flags') as FormArray;
    var baseURL: string="https://v2.jokeapi.dev/joke/Any";
    if (categoriesFormArray?.length > 0) {
      baseURL="https://v2.jokeapi.dev/joke/"
      categoriesFormArray.controls.forEach(control => {
        
        baseURL=baseURL+control.value+",";
      });
      baseURL = baseURL.slice(0, -1);
    }
    if (flagsFormArray?.length > 0) {
      baseURL=baseURL+"?blacklistFlags="
      flagsFormArray.controls.forEach(control => {
        
        baseURL=baseURL+control.value+",";
      });
      baseURL = baseURL.slice(0, -1);
      baseURL=baseURL+"&";
    }

    else {
      baseURL=baseURL+"?";
    }
    baseURL=baseURL+"type=single&amount=10";
   this.jokeService.apiUrl=baseURL;
   

  }

    
  toggleCollapse(){

    this.isColapsed=!this.isColapsed;

  }

 
}
