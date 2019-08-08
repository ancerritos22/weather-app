/*
  Service that handles the user operations with the user control api. This operations are:
  - signIn: sends a request to log in an user.
  - register: sends a request to register an user.
  - getIdentity: gets the user saved in the localStorage.
  - getToken: gets the authorization token saved in the localStorage.
  - addFavorite: sends a request to add a city to an user's favorites.
  - removeFavorite: sends a request to remove a city from the user's favorites.
*/
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http){
    this.url = GLOBAL.userControl.url;
  }

  signIn(userToSign){
    let params = JSON.stringify(userToSign);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + GLOBAL.routes.signIn, params, {headers: headers}).pipe(map(res => res.json()));
  }

  register(userToRegister){
    let params = JSON.stringify(userToRegister);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + GLOBAL.routes.register, params, {headers: headers}).pipe(map(res => res.json()));
  }

  getIdentity(){
    let identity = localStorage.getItem(GLOBAL.storageItems.identity);

    //JSON.parse(localStorage.getItem(GLOBAL.storageItems.identity));

    if(identity != GLOBAL.storageItems.undefined){
      this.identity = JSON.parse(identity);
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem(GLOBAL.storageItems.token);

    if(token != GLOBAL.storageItems.undefined){
      this.token = token;
    }else{
      this.token = null;
    }
  }

  addFavorite(cityToAdd){
    var params = {city : cityToAdd};
    let paramsEncoded = JSON.stringify(params);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    return this._http.post(this.url + GLOBAL.routes.addCity, paramsEncoded, {headers: headers}).pipe(map(res => res.json()));
  }

  removeFavorite(cityToRemove){
    var params = {city : cityToRemove};
    let paramsEncoded = JSON.stringify(params);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    return this._http.post(this.url + GLOBAL.routes.deleteCity, paramsEncoded, {headers: headers}).pipe(map(res => res.json()));
  }

}
