/*
  Service that handles the connection with the weather service provider.
  This connection is handled via the following methods:
  - getCityWeather(): sends a request to get the weather information of a city using the id of the city.
  - searchCityWeather(): sends a request to get the weather information of a city using the name of the city. 

*/
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';


@Injectable()
export class WeatherService{
  public searchByIdUrl: string;
  public searchByNameUrl:string;
  public key: string;

  constructor(private _http: Http){
    this.searchByIdUrl = GLOBAL.weatherProvider.idUrl;
    this.searchByNameUrl = GLOBAL.weatherProvider.nameUrl;
    this.key = GLOBAL.weatherProvider.key;
  }

  getCityWeather(city){
    let params = {id: city, appid: this.key, units: GLOBAL.weatherProvider.metricUnits}

    return this._http.get(this.searchByIdUrl, {params: params}).pipe(map(res => res.json()));
  }

  searchCityWeather(city){
    let params = {q: city, appid: this.key, units: GLOBAL.weatherProvider.metricUnits}

    return this._http.get(this.searchByNameUrl, {params: params}).pipe(map(res => res.json()));
  }

}
