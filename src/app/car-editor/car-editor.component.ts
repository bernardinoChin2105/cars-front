import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../shared/car';
import { FormBuilder, Validators } from '@angular/forms'
import { CarsService } from '../shared/cars.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-editor',
  templateUrl: './car-editor.component.html',
  styleUrls: ['./car-editor.component.css']
})
export class CarEditorComponent implements OnInit, OnChanges {

  @Output() onSubmit = new EventEmitter();
  @Input() selectedCar: Car = {} as Car;

  constructor(
    private formBuilder: FormBuilder, private carsService: CarsService, private _snackBar: MatSnackBar) {
  }


  CarForm = this.formBuilder.group({
    name: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', [Validators.required, Validators.pattern(/^\d{4,4}$/)]]
  });

  @Input() dataSource: Car[] = [];

  ngOnInit(): void {
    this.initializeComponents();
  }

  ngOnChanges(changes: any) {
    let selectedCarChanged = changes['selectedCar'];
    if (selectedCarChanged) {
      this.setFields();
    }
  }

  initializeComponents() {
    this.CarForm.get('name')?.setValue('')
    this.CarForm.get('model')?.setValue('')
    this.CarForm.get('year')?.setValue('')
  }

  setFields() {
    this.initializeComponents();
    if (this.selectedCar.id) {
      this.CarForm.get('name')?.setValue(this.selectedCar.name);
      this.CarForm.get('model')?.setValue(this.selectedCar.model);
      this.CarForm.get('year')?.setValue(this.selectedCar.year.toString());
    }
  }

  onSaveClick() {
    this.carsService.postCar({
      id: 0,
      name: this.CarForm.get('name')?.value,
      model: this.CarForm.get('model')?.value,
      year: Number(this.CarForm.get('year')?.value)
    } as Car).subscribe((response) => {
      //Just call the onsubmmit event if saved successfully.
      this.onSubmit.emit();
      console.log('success', response);
      this._snackBar.open("Saved successfully", "Ok", { duration: 5000 });
    }, error => {
      console.log('failed', error);
      this._snackBar.open(error.error, "Error", { duration: 5000 });
    });
  }

}
