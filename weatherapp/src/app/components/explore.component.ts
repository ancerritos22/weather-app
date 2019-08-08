/*
  Component that allows a logged user of the application to search cities and add them to its favorites.
*/

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { WeatherService } from '../services/weather.service';
import { CityWeather } from '../models/cityWeather';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'explore',
  templateUrl: '../views/explore.html',
  providers: [UserService,WeatherService]
})

export class ExploreComponent implements OnInit{
  public title = "Explore";
  public identity;
  public token;
  public cities = [];
  public searchWords;
  public errorMessage;

  constructor(
    private _userService:UserService,
    private _weatherService:WeatherService
  ){

  }


  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  search(){
    this.errorMessage = null;
    this._weatherService.searchCityWeather(this.searchWords).subscribe(
      response => {
        var cityWeather = new CityWeather(response.id,
          response.name,
          response.weather[0].main,
          response.weather[0].description,
          response.main.temp,
          response.main.temp_max,
          response.main.temp_min
        );
        this.cities.push(cityWeather);
    },
      error => {
        console.error(error);
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.errorMessage = JSON.parse(error._body).message;
        }
      }
    );
  }

  clearSearch(){
    this.cities = [];
    this.errorMessage = null;
  }

  addCityToFavorites(event){
    var cityToAdd = event.srcElement.id;

    this._userService.addFavorite(cityToAdd).subscribe(
      response => {
        localStorage.setItem(GLOBAL.storageItems.identity, JSON.stringify(response.user));

        this.cities = this.cities.filter((value) => {
          return value._id != cityToAdd;
        });
      },
      error => {
        console.error(error);
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.errorMessage = JSON.parse(error._body).message;
        }
      }
    );
  }

}
