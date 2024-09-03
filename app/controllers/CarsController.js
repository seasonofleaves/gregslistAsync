import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { setHTML } from "../utils/Writer.js";


export class CarsController {
  constructor() {
    console.log('🚗🎮');
    this.getCars()
    // this.drawCars() don't want to draw cars on load because there are no cars on load
    AppState.on('cars', this.drawCars)

    AppState.on('user', () => console.log('🧞🔒', AppState.user))
    AppState.on('account', () => console.log('🧞🗄️', AppState.account))
  }


  drawCars() {
    console.log('✏️🚗');
    const cars = AppState.cars
    let carsHTML = ''
    cars.forEach(car => carsHTML += car.cardHTMLTemplate)
    setHTML('car-listings', carsHTML)
  }



  async getCars() {
    await carsService.getCars()
  }
}