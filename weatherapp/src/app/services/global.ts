/*
  Variable that stores global constants to the applications. This variable stores the following:
    userControl: stores the url of the api that handles user control.
    routes: stores the url of the methods available in the api.
    storageItems: stores the name of the items that are saved to the local storage.
    weatherProvider: stores the data needed to establish connection with the weather information provider.
*/

export var GLOBAL = {
  userControl : {
    url: "http://localhost:3978/weatherapi/"
  },
  routes : {
    signIn : 'login',
    register: 'register',
    deleteCity: 'deleteCity',
    addCity: 'addCity'
  },
  storageItems : {
      identity: "identity",
      token: "token",
      undefined : "undefined"
  },
  weatherProvider:{
    idUrl: "http://api.openweathermap.org/data/2.5/weather?",
    nameUrl: "http://api.openweathermap.org/data/2.5/weather?",
    key: "2442aeb18ef61a4233e42c3f67ab832d",
    metricUnits: "metric"
  }
}
