import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Ride } from '../models/ride';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  baseUrl='http://localhost:8084/';
  url = this.baseUrl + 'api/rides';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Ride[]> {
    return this.http.get<Ride[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('rideService.index() error')
        return throwError(err);
      })
    );
  }

  public show(rideId: any) {
    return this.http.get<Ride>(`${this.url}/${rideId}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('kaboom');
        })
      );
  }

  public create(ride: Ride) {
    return this.http.post<Ride>(this.url, ride)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('kaboom');
        })
      )
  }

  public update(ride: Ride) {
    return this.http.put<Ride>(this.url, ride)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('kaboom');
        })
      )
  }

  public destroy(id: number) {
    console.log(`${this.url}/${id}`);
    return this.http.delete<Ride>(`${this.url}/${id}`)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('error deleting');
        })
      )
  }


}
