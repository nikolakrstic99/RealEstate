import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-advertiser-edit',
  templateUrl: './advertiser-edit.component.html',
  styleUrls: ['./advertiser-edit.component.css']
})
export class AdvertiserEditComponent implements OnInit {

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }
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
  agencies: Agency[] = [];
  image: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  openSnackBar(str:string) {
    this._snackBar.open(str, 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit(): void {
    this.u = JSON.parse(sessionStorage.getItem("user"));
    this.image = this.u.imageFile;
    this._id = JSON.parse(sessionStorage.getItem("user"))._id;
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

    this.userService.getAllAgencies().subscribe((data: Agency[]) => {
      this.agencies = data;
    })
  }

  onSubmit() {
    this.userService.edit(this._id, this.firstname, this.surname, this.username, this.password, this.city, this.email, this.phone, this.agency, this.license, this.birthday).subscribe((resp) => {
      sessionStorage.removeItem("user");
      var newUser: User;
      this.userService.getUser(this.username).subscribe((u: User) => {
        newUser = u;
        sessionStorage.setItem("user", JSON.stringify(newUser));
        //this.ngOnInit();
        //window.location.reload();
        if (resp['message'] == 'User edited') 
          this.openSnackBar(resp['message']);
      })

    });
  }

}
