/*
  Main application components. It uses the following methods:
  - onSubmit(): method used for handling the log in of the user.
  - logout(): method used for handling the log out of the user.
  - toRegister(): method used for switching between the login form and the registration form.
  - cancelRegister(); method used for switching between the registration form and the login form.
  - onSumbitRegister(): method used for handling the registration of the user.

*/

import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { GLOBAL } from './services/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'The Weather App';
  public user: User;
  public identity;
  public token;
  public errorMessage;
  public successMessage;
  public register;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('', '', '', '', '');
    this.register = false;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.successMessage = null;
  }

  onSubmit(){
    this._userService.signIn(this.user).subscribe(
      response => {
        console.log(response);
        this.identity = response.user;
        this.token = response.token;

        /* Create element in local storage */
        localStorage.setItem(GLOBAL.storageItems.identity, JSON.stringify(this.identity));
        localStorage.setItem(GLOBAL.storageItems.token, this.token);

      },
      error => {
        console.error(error);
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.errorMessage = JSON.parse(error._body).message;
          console.log(this.errorMessage);
        }
      }
    );
  }

  logout(){
    localStorage.removeItem(GLOBAL.storageItems.identity);
    localStorage.removeItem(GLOBAL.storageItems.token);
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  toRegister(){
    this.register = true;
    this.errorMessage = null;
  }

  cancelRegister(){
    this.register = false;
  }

  onSubmitRegister(){
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        this.user = new User('', '', '', '', '');
        this.register = false;
        this.successMessage = response.message;
        this.errorMessage = null;
        console.log(this.successMessage);
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
