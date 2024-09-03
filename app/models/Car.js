import { Profile } from "./Profile.js"



export class Car {
  constructor(data) {
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description || "No description provided"
    this.color = data.color || '#fff'
    this.engineType = data.engineType
    this.createdAt = new Date(data.createdAt)
    // TODO we will talk about the other ones later
    this.creator = new Profile(data.creator)
    this.creatorId = data.creatorId
  }

  get cardHTMLTemplate() {
    return /*html*/`
     <div class="col-12 p-0 mb-3">
      <div class="row bg-light shadow car-border" style="border-color: ${this.color};">
        <div class="col-md-4 p-0">
          <img class="img-fluid car-img"
            src="${this.imgUrl}"
            alt="${this.year} ${this.make} ${this.model}">
        </div>
        <div class="col-md-8">
          <div class="p-2">
            <p class="fs-3">
            ${this.year} ${this.make} ${this.model}
            <i onclick="app.CarsController.deleteCar('${this.id}')" class="mdi mdi-delete-forever text-danger" role="button" title="Delete this ${this.make} ${this.model}"></i>
            </p>
            <p>${this.description}</p>

            <p class="fs-4">
            Listed on ${this.listedDate} at ${this.listedTime} 
           </p>
           <p class="fs-4">$${this.priceAsCurrency}</p>
           <p>${this.description}</p>
           <p class="fs-3">
             ${this.transmissionIcon}
           </p>
            <div class="d-flex justify-content-end align-items-center">
              <span>${this.creator.name}</span>
              <img style="width: 50px; height:50; object-fit:cover;" src="${this.creator.picture}"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }

  get listedDate() {
    return this.createdAt.toLocaleDateString()
  }
  get listedTime() {
    return this.createdAt.toLocaleTimeString()
  }

  get transmissionIcon() {
    if (this.engineType == 'manual') {
      return '<i class="mdi mdi-car-shift-pattern" title="Manual Transmission"></i>'
    }
    if (this.engineType == 'automatic') {
      return '<i class="mdi mdi-refresh-auto" title="Automatic Transmission"></i>'
    }
    return '<i class="mdi mdi-help" title="Unknown Transmission"></i>'
  }

  get priceAsCurrency() {
    return new Intl.NumberFormat().format(this.price)
  }
}

/**
make: String, required
model: String, required
imgUrl: String, required
year: Number, required
price: Number, required
description: String, 
color: String, 
engineType: String, 
creatorId: SchemaObjectId, required
*creator: Object (Virtual Added by Database)
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
 */