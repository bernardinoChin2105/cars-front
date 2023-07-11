import { Component } from '@angular/core';
import { Car } from './shared/car';
import { CarsService } from './shared/cars.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cars-demo-front';
  cars: Car[] = [];
  selectedCar: Car = {} as Car;

  constructor(private carsService: CarsService) {
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(id: string = "") {
    this.carsService.getCars(id).subscribe(response => {
      this.cars = response;
    });
  }

  onCarFilterChange(value: any) {
    let result = this.cars.find(c => c.id == value.id)
    this.selectedCar = result ? result : {} as Car;
  }

  onCarSubmit() {
    this.getCars();    
  }
}
