import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000/assistant';
  allCities() {
    const data = {}
    return this.http.post(`${this.uri}/allCities`, data);
  }

  allMunicipalities(city: string) {
    const data = {
      city: city
    }
    return this.http.post(`${this.uri}/allMunicipalities`, data);
  }

  allLocationes(city: string, municipality: string) {
    const data = {
      city: city,
      municipality: municipality
    }
    return this.http.post(`${this.uri}/allLocationes`, data);
  }

  addLocation(city: string, municipality: string, location: string, streets: string[]) {
    const data = {
      city: city,
      municipality: municipality,
      location: location,
      streets: []
    }
    for (let i = 0; i < streets.length; i++) {
      if (streets[i] != "")
        data.streets.push(streets[i]);
    }
    return this.http.post(`${this.uri}/addLocation`, data);
  }

  getLocation(city: string, municipality: string, location: string) {
    const data = {
      city: city,
      municipality: municipality,
      location: location
    }
    return this.http.post(`${this.uri}/getLocation`, data);
  }

  getBusses(city: string) {
    const data = {
      city: city
    }
    return this.http.post(`${this.uri}/getBusses`, data);
  }

  getAllUnsold() {
    const data = {}
    return this.http.post(`${this.uri}/getAllUnsold`, data);
  }


  getSoldByLocation(city, municipality, location, agency) {
    if(agency==""){
      const data = {
        city: city,
        municipality: municipality,
        location: location
      }
      return this.http.post(`${this.uri}/getSoldByLocationUser`, data);
    }else{
      const data = {
        city: city,
        municipality: municipality,
        location: location,
        agency: agency
      }
      return this.http.post(`${this.uri}/getSoldByLocation`, data);
    }
  }
}
