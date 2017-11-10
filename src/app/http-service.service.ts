import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpServiceService {
prodUrl : string='http://starlord.hackerearth.com/gamesarena';

  constructor(private http:Http) { }

  getGames(){

    const headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.prodUrl).map((data : Response) => data.json());
  }


}
