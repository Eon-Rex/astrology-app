import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AstrologyReport } from '../model/astrology-report';

@Injectable({
  providedIn: 'root'
})
export class AstrologyService {
  private apiUrl = 'https://localhost:7154/api/v1/Astrology';

  constructor(private http: HttpClient) {}

  generateReport(request: any): Observable<AstrologyReport> {
    return this.http.post<AstrologyReport>(`${this.apiUrl}/generate-report`, 
      request 
    );
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/locations`);
  }

  getStatesAndCities(): Observable<{ [state: string]: string[] }> {
    return this.http.get<{ [state: string]: string[] }>(`${this.apiUrl}/states-cities`);
  }
}
