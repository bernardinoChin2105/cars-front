import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Car } from './car';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  apiUrl = `${environment.apiBaseUrl}/${environment.endpointsUrl.cars}`;
  constructor(private httpClient: HttpClient) { }

  getCars(id: string): Observable<Car[]> {
    const data: Car[] = [];
    let params = new HttpParams();
    if (id)
      params = params.set('id', id);

    return this.httpClient.get<any[]>(this.apiUrl, { params: params })
      .pipe(
        map(result => {
          result.map(c => {
            data.push({
              id: c.carId,
              name: c.name,
              model: c.model,
              year: c.year
            } as Car)
          });
          return data;
        })
      );            
  }

  postCar(car: Car): Observable<any> {
    
    return this.httpClient.post(this.apiUrl, {
      name: car.name,
      model: car.model,
      year: car.year
    });    
  }
}
