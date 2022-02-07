import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  constructor(private http: HttpClient) {}
  uri = 'http://localhost:4000/realEstate';

  addRealEstate(
    id,
    type,
    name,
    city,
    municipality,
    location,
    street,
    area,
    numOfRooms,
    year,
    state,
    heating,
    floor,
    totalFloors,
    parking,
    monthly,
    price,
    about,
    characteristics,
    busses,
    agencyName,
    agencypib,
    agencyCity,
    agencyAddress,
    agencyPhone,
    userFirstname,
    userSurname,
    userPhone,
    userLicense,
    images,
    lat,
    lng
  ) {
    const data = {
      id: id,
      type: type,
      name: name,
      city: city,
      municipality: municipality,
      location: location,
      street: street,
      area: area,
      rooms: numOfRooms,
      constructionYear: year,
      state: state,
      heating: heating,
      floor: floor,
      totalFloors: totalFloors,
      parking: parking,
      monthly: monthly,
      price: price,
      about: about,
      characteristics: characteristics,
      busses: busses,
      agencyName: agencyName,
      agencyPIB: agencypib,
      agencyCity: agencyCity,
      agencyAddress: agencyAddress,
      agencyPhone: agencyPhone,
      adFirstName: userFirstname,
      adSurname: userSurname,
      adPhone: userPhone,
      adLicense: userLicense,
      sold: 0,
      lastModified: '-1',
      images: images,
      lat:lat,
      lng:lng
    };
    return this.http.post(`${this.uri}/addRealEstate`, data);
  }

  editRealEstate(
    _id,
    type,
    name,
    city,
    municipality,
    location,
    street,
    area,
    numOfRooms,
    year,
    state,
    heating,
    floor,
    totalFloors,
    parking,
    monthly,
    price,
    about,
    characteristics,
    busses,
    agencyName,
    agencypib,
    agencyCity,
    agencyAddress,
    agencyPhone,
    userFirstname,
    userSurname,
    userPhone,
    sold,
    lastModified,
    lat,
    lng
  ) {
    const data = {
      _id: _id,
      type: type,
      name: name,
      city: city,
      municipality: municipality,
      location: location,
      street: street,
      area: area,
      rooms: numOfRooms,
      constructionYear: year,
      state: state,
      heating: heating,
      floor: floor,
      totalFloors: totalFloors,
      parking: parking,
      monthly: monthly,
      price: price,
      about: about,
      characteristics: characteristics,
      busses: busses,
      agencyName: agencyName,
      agencyPIB: agencypib,
      agencyCity: agencyCity,
      agencyAddress: agencyAddress,
      agencyPhone: agencyPhone,
      adFirstName: userFirstname,
      adSurname: userSurname,
      adPhone: userPhone,
      sold: sold,
      lastModified: lastModified,
      lat:lat,
      lng:lng
    };
    return this.http.post(`${this.uri}/editRealEstate`, data);
  }

  getEstateWithUsername(firstName: string, surName: string) {
    const data = {
      adFirstName: firstName,
      adSurname: surName,
    };
    return this.http.post(`${this.uri}/getEstateWithUsername`, data);
  }

  sold(name: String, adFirstName: string, adSurname: string) {
    const data = {
      name: name,
      adFirstName: adFirstName,
      adSurname: adSurname,
    };
    return this.http.post(`${this.uri}/sold`, data);
  }

  getLastFive() {
    const data = {};
    return this.http.post(`${this.uri}/getLastFive`, data);
  }

  findEstateByLocation(city: string, municipality: string, location: string) {
    const data = {
      city: city,
      municipality: municipality,
      location: location,
    };
    return this.http.post(`${this.uri}/findEstateByLocation`, data);
  }

  getLastRealEstate() {
    const data = {};
    return this.http.post(`${this.uri}/getLastRealEstate`, data);
  }

  findRealEstateById(id: number) {
    const data = {
      id: id,
    };
    return this.http.post(`${this.uri}/findRealEstateById`, data);
  }

  getPrice(num: number) {
    const data = {
      num: num,
    };
    return this.http.post(`${this.uri}/getPrice`, data);
  }

  getArea(num: number) {
    const data = {
      num: num,
    };
    return this.http.post(`${this.uri}/getArea`, data);
  }

  getYear(num: number) {
    const data = {
      num: num,
    };
    return this.http.post(`${this.uri}/getYear`, data);
  }

  getMonthlyCost(num: number) {
    const data = {
      num: num,
    };
    return this.http.post(`${this.uri}/getMonthlyCost`, data);
  }

  getFloor(num: number) {
    const data = {
      num: num,
    };
    return this.http.post(`${this.uri}/getFloor`, data);
  }

  allOthersEstates(num:number){
    const data={
      id:num
    }
    return this.http.post(`${this.uri}/allOthersEstates`, data);
  }

  getAll(){
    const data={}
    return this.http.post(`${this.uri}/getAll`, data);
  }
}
