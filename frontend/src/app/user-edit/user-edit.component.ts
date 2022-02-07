import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private userService:UserService) { }
  @ViewChild('f') signupForm: NgForm;
  _id: string;
  firstname: string;
  surname: string;
  username: string;
  password: string;
  city: string;
  birthday: string;
  phone: string;
  email: string;
  agency: string;
  license: string;
  u: User;
  ngOnInit(): void {
    this.u = JSON.parse(sessionStorage.getItem("editUser"));
    this._id = JSON.parse(sessionStorage.getItem("editUser"))._id;
    console.log(this._id);
    console.log(this.u);
    this.firstname = this.u.firstname;
    this.surname = this.u.surname;
    this.username = this.u.username;
    this.password = this.u.password;
    this.city = this.u.city;
    this.birthday = this.u.birthday;
    this.phone = this.u.phone;
    this.email = this.u.email;
    this.agency = this.u.agency;
    this.license = this.u.license;

    sessionStorage.removeItem("editUser");
  }

  onSubmit() {

    this.userService.edit(this._id, this.firstname, this.surname, this.username, this.password, this.city, this.email, this.phone, this.agency, this.license, this.birthday).subscribe((resp) => {
      this.ngOnInit();
    });
  }
}
