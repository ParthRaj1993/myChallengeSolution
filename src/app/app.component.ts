import { Component,OnInit } from '@angular/core';
import {HttpServiceService} from './http-service.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

games : any ;
in : any;
gamesCount : number;
gameTitle:any =[];
sortAsc : Boolean ;
sortDsc: Boolean;
searchi: Boolean;
tempStore: any;
myControl: FormControl = new FormControl();
p;
 filteredOptions: Observable<string[]>;

constructor(
  private httpService:HttpServiceService,
  ) { }

  ngOnInit() {
    this.httpService.getGames().subscribe(
      (data: any) =>{
        this.games=data;
        
        this.games.shift();
          this.tempStore=this.games;
        console.log(this.games[0].title);
        for(let i=1; i<Object.keys(this.games).length;i++){
          this.gameTitle.push(this.games[i].title);
        }
        
                this.filteredOptions = this.myControl.valueChanges
         .startWith(null)
         .map(val => val ? this.filter(val) : this.gameTitle.slice());

      }
    );
  }

   sortByKeyAsc(array, key) {
     console.log('Asc');
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

   sortByKeyDsc(array, key) {
     console.log('Desc');
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

sort(){
  if(this.sortDsc){
  this.games=this.sortByKeyAsc(this.games,'score');
  this.sortAsc=true;
  this.sortDsc=false;
}
else{
this.games=this.sortByKeyDsc(this.games,'score');
this.sortDsc=true;
this.sortAsc=false;
}

}

search(code){
 return this.tempStore.filter(
      function(data){return data.title == code}
  );
}

onSearch(code){
  console.log(code+'Searching..');
  this.searchi=true;
  this.games=this.search(code);
}
cancel(){
this.games=this.tempStore;
this.searchi=false;
console.log(this.in);
this.in='';
}

      filter(val: string): string[] {
      return this.gameTitle.filter(option =>
        option.toString().toLowerCase().indexOf(val.toLowerCase()) === 0);
   }


  title = 'app';
  
  
}
