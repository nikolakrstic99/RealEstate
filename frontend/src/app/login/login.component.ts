import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signinForm?: NgForm;
  constructor(private router: Router, private userService: UserService, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    sessionStorage.removeItem("user");
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar() {
    this._snackBar.open('Bad data :(', 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSubmit() {
    var username = this.signinForm?.value.username;
    var password = this.signinForm?.value.password;
    this.userService.login(username, password).subscribe((user: User) => {
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        HeaderComponent.check();
        if (user.type == 1)
          this.router.navigate(['search']);
        else if (user.type == 2)
          this.router.navigate(['advertiser']);
        else if (user.type == 3)
          this.router.navigate(['']);
      }
      else
        this.openSnackBar();
    });

  }
}
