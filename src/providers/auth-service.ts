import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  getRemoteData()
  {
    this.http.get('api/snippets/1/').map(
      res => res.json()
    ).subscribe(
      data =>{
        console.log(data);
        console.log(data.id);
        console.log(data.title);
        console.log(data.code);
        console.log(data.linenos);
        console.log(data.language);
        console.log(data.style);
      }
    );
  }

}
