import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusParking } from '../variable';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  baseUrl = 'http://localhost:1234';

  constructor(private httpClient: HttpClient) {}

  getParks() {
    return this.httpClient.get<StatusParking[]>(`${this.baseUrl}/parks`);
  }

  updatePark(park: any) {
    return this.httpClient.put<StatusParking>(
      `${this.baseUrl}/parks/${park.id}`,
      park
    );
  }
}
