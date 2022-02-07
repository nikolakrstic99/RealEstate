import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000/user';

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  register(firstname, surname, username, password, email, phone, agency, license, birthday, imageFile) {
    const data = {
      firstname: firstname,
      surname: surname,
      username: username,
      password: password,
      email: email,
      phone: phone,
      agency: agency,
      license: license,
      birthday: birthday,
      type: -1,
      imageFile: imageFile
    }
    if (agency != "" && license != "") {
      data.type = 2;
    }
    else {
      data.type = 1;
    }

    if (JSON.parse(sessionStorage.getItem("user")) != null) {
      return this.http.post(`${this.uri}/registerAdmin`, data);
    } else {
      return this.http.post(`${this.uri}/register`, data);
    }
  }

  edit(id, firstname, surname, username, password, city, email, phone, agency, license, birthday) {
    const data = {
      id: id,
      firstname: firstname,
      surname: surname,
      username: username,
      password: password,
      city: city,
      email: email,
      phone: phone,
      agency: agency,
      license: license,
      birthday: birthday,
      type: -1
    }
    if (agency != "" && license != "") {
      data.type = 2;
    }
    else {
      data.type = 1;
    }

    return this.http.post(`${this.uri}/edit`, data);
  }

  changePassword(newPassword: string, username: string) {
    const data = {
      newPassword: newPassword,
      username: username
    }
    return this.http.post(`${this.uri}/changePassword`, data);
  }

  allRequests() {
    const data = {}
    return this.http.post(`${this.uri}/allRequests`, data);
  }

  allUsers() {
    const data = {
    }
    return this.http.post(`${this.uri}/allUsers`, data);
  }

  getUser(username: string) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getUser`, data);
  }

  acceptRequest(data) {
    return this.http.post(`${this.uri}/acceptRequest`, data);
  }

  declineRequest(data) {
    return this.http.post(`${this.uri}/declineRequest`, data);
  }

  deleteUser(data) {
    return this.http.post(`${this.uri}/deleteUser`, data);
  }

  addAgency(name: String, address: String, city: string, phone: string, pib: string) {
    const data = {
      name: name,
      address: address,
      city: city,
      phone: phone,
      pib: pib
    }
    return this.http.post(`${this.uri}/addAgency`, data);
  }

  getAgency(name: String) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/getAgency`, data);
  }

  getAllAgencies() {
    const data = {}
    return this.http.post(`${this.uri}/getAllAgencies`, data);
  }

  allCities() {
    const data = {}
    return this.http.post(`${this.uri}/allCities`, data);
  }

  addToFavorites(username: string, estateId: number) {
    const data = {
      username: username,
      estateId: estateId
    }
    return this.http.post(`${this.uri}/addToFavorites`, data);
  }

  getUserWithEmail(email:string){
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/getUserWithEmail`, data);
  }
}
