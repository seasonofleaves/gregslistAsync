import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js";



class CarsService {
  async getCars() {
    // console.time('timer')
    // const response = await fetch('https://sandbox.codeworksacademy.com/api/cars') // Jeremy, Get me coffee
    // // We wait for jeremy to return
    // console.log('response', response); // Mick enjoy's his PSL (Pumpkin Spice latte)
    // const data = await response.json()
    // console.log('data', data);
    // console.timeEnd('timer')

    // const response = await axios.get("https://sandbox.codeworksacademy.com/api/cars")
    const response = await api.get('api/cars')
    console.log('🚗📡', response.data);

    const cars = response.data.map(carData => new Car(carData))
    console.log('✨🚗✨🚗', cars);

    AppState.cars = cars

    // const responseHousesExample = await api.get('api/houses')
    // console.log('🚗📡', responseHousesExample.data);

  }

}

export const carsService = new CarsService()