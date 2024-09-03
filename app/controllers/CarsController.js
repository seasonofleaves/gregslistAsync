import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";


export class CarsController {
  constructor() {
    console.log('🚗🎮');
    AppState.on('cars', this.drawCars)

    AppState.on('user', () => console.log('🧞🔒', AppState.user))
    AppState.on('account', () => console.log('🧞🗄️', AppState.account))
    // NOTE this listener is triggered when someone logs in
    AppState.on('user', this.showCarForm)
    // this.drawCars() don't want to draw cars on load because there are no cars on load

    this.getCars()
    this.showCarForm()
  }


  drawCars() {
    console.log('✏️🚗');
    const cars = AppState.cars
    let carsHTML = ''
    cars.forEach(car => carsHTML += car.cardHTMLTemplate)
    setHTML('car-listings', carsHTML)
  }



  async getCars() {

    try {
      // we will try to execute this code
      await carsService.getCars()
    } catch (error) {
      // if an error is thrown, we catch it here and run different code
      Pop.error(error) // notify the user something went wrong
      console.error(error) // notify the developer that something went wrong
    }
  }

  async createCar() {
    try {
      event.preventDefault()
      const carFormElem = event.target
      const carFormData = getFormData(carFormElem)
      await carsService.createCar(carFormData)
      Pop.toast("you created the car!")
      // @ts-ignore
      carFormElem.reset()
    } catch (error) {
      Pop.error(error) // notify the user something went wrong
      console.error(error) // notify the developer that something went wrong
    }
  }

  showCarForm() {
    if (AppState.user == null) { return }

    const carFormElem = document.getElementById('car-form')
    if (carFormElem == null) { return }

    carFormElem.classList.remove('d-none')
  }
}