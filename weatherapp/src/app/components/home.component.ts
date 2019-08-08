/*
  Component that is the homepage of the app. This component displays the weather information of the favorite cities of the user.
*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { WeatherService } from '../services/weather.service';
import { CityWeather } from '../models/cityWeather';
import { GLOBAL } from '../services/global';


@Component({
  selector: 'home',
  templateUrl: '../views/home.html',
  providers: [UserService,WeatherService]
})

export class HomeComponent implements OnInit{
  public title = "My Favorites";
  public identity;
  public token;
  public cities = [];

  constructor(
    private _userService:UserService,
    private _weatherService:WeatherService
  ){

  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.loadCitiesWeather();
    console.log(this.cities);
  }

  private loadCitiesWeather(){
    for(let i = 0; i < this.identity.cities.length; i++){
      this._weatherService.getCityWeather(this.identity.cities[i]).subscribe(
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
        }
      );
    }
  }

  removeCityFromFavorites(event){
    var cityToRemove = event.srcElement.id;
    this._userService.removeFavorite(cityToRemove).subscribe(
      response => {
        localStorage.setItem(GLOBAL.storageItems.identity, JSON.stringify(response.user));

        this.identity = this._userService.getIdentity();
        console.log(this.identity);
        this.cities = [];
        this.loadCitiesWeather();
      },
      error => {
        console.error(error);
      }
    );
  }
}
