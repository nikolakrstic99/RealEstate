import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  static user: User;

  static register: boolean;
  static changePassword: boolean;
  static logIn: boolean;
  static logOut: boolean;
  static newRequests: boolean;
  static allUsers: boolean;
  static addAgency: boolean;
  static addLocation: boolean;
  static search: boolean;
  static addRealEstate: boolean;
  static editUser: boolean;
  user: User = null;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    HeaderComponent.check();
  }

  getRegister() {
    return HeaderComponent.register;
  }

  getLogIn() {
    return HeaderComponent.logIn;
  }

  getChangePassword() {
    return HeaderComponent.changePassword;
  }

  getLogOut() {
    return HeaderComponent.logOut;
  }

  getNewRequests() {
    return HeaderComponent.newRequests;
  }

  getAllUsers() {
    return HeaderComponent.allUsers;
  }

  getAddAgency() {
    return HeaderComponent.addAgency;
  }

  getAddLocation() {
    return HeaderComponent.addLocation;
  }

  getSearch() {
    return HeaderComponent.search;
  }

  getEditUser() {
    return HeaderComponent.editUser;
  }

  getAddRealEstate() {
    return HeaderComponent.addRealEstate;
  }

  isLoggedInUser(){
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user) {
      return true;
    } else return false;
  }

  isAdmin() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user) {
      return this.user.type == 3 ? true : false;
    } else return false;
  }

  isAdvertiser(){
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user) {
      return this.user.type == 2 ? true : false;
    } else return false;
  }

  static check() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if (this.user == null) {
      this.logIn = this.register = true;
      this.allUsers = this.changePassword = this.logOut = this.newRequests = this.addAgency = this.addLocation = this.search = this.addRealEstate = this.editUser = false;
    } else {
      this.addLocation = this.addAgency = this.allUsers = this.newRequests = this.addRealEstate = this.logIn = this.register = this.editUser = false;
      this.search = this.changePassword = this.logOut = this.addRealEstate = true;
      if (this.user.type == 3) {
        this.addLocation = this.addAgency = this.register = this.allUsers = this.newRequests = true;
        this.addRealEstate = false;
      } else if (this.user.type == 2) {
        this.editUser = true;
      }
    }
  }

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(['']);
    HeaderComponent.check();
  }

}
