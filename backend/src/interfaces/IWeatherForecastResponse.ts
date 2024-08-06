export interface WeatherForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherDataEntry[];
    city: City;
  }
  
  interface WeatherDataEntry {
    dt: number;
    main: MainWeatherData;
    weather: WeatherCondition[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: SystemData;
    dt_txt: string;
    rain?: Rain;
  }
  
  interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  }
  
  interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Clouds {
    all: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
  
  interface Rain {
    '3h': number;
  }
  
  interface SystemData {
    pod: string;
  }
  
  interface City {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }
  
  interface Coordinates {
    lat: number;
    lon: number;
  }
  