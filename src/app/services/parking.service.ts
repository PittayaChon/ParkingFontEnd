import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusParking } from '../variable';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  getHeroes(): Observable<StatusParking[]> {
    // return of(HEROES).pipe(delay(500));
    // return throwError(() => ({ status: 404, message: 'Not found' }));
    return this.httpClient
      .get<StatusParking[]>('http://localhost:1234/parks')
  }
  constructor(private httpClient: HttpClient) { }
}
