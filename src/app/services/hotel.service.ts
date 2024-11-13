import { Injectable } from '@angular/core';
import { Hotel } from '../model/hotel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private apiUrl = 'http://localhost:3000/hotels';
  
  constructor(private http: HttpClient) { }

  getHotels(filters?: any): Observable<Hotel[]> {
    let url = `${this.apiUrl}`;
    if (filters && filters.name) {
      url += `?name=${filters.name}`
    }
    return this.http.get<Hotel[]>(url);
  }
  
}
