export class CityWeather{
  constructor(
    public _id: number,
    public name: string,
    public mainWeather: string,
    public weatherDescription: string,
    public temperature: number,
    public maxTemperature: number,
    public minTemperature: number
  ){}
}
