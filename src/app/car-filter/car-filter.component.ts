import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../shared/car';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent {
  @Input() dataSource: Car[] = [];
  @Output() onSelectionChange = new EventEmitter();
  selectedId = "";

  onSelectedChange(event: any) {    
    this.selectedId = event.value;    
    this.onSelectionChange.emit({
      id: this.selectedId
    });    
  }
}
