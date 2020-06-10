import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getChallenges() {
    return this.http.get(`assets/challenges.json`);
  }

  getLocations() {
    return this.http.get('assets/locations.json');
  }
}
