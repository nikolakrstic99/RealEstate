import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { HeaderComponent } from '../header/header.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  @ViewChild('f') form?: NgForm;
  constructor(public router: Router, private userService: UserService,
    private _snackBar: MatSnackBar) {

  }
  user: User;
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  validatePassword() {
    if (/[A-Za-z](?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z]).{8,}/.test(this.form.value.password))
      return true;
    else return false;
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(str: string) {
    this._snackBar.open(str, 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSubmit() {
    if (this.user.password != this.form.value.password) {
      this.openSnackBar("This is not your current password.");
      return;
    }
    if (this.form.value.new1 != this.form.value.new2) {
      this.openSnackBar("New password are not the same.");
      return;
    }
    if (!this.validatePassword()) {
      this.openSnackBar("New password isn't strong enough.");
      return;
    }
    if(!this.form.value.new1.charAt(0).match(/[A-z]/i)){
      this.openSnackBar("Password must start with letter.");
      return;
    }

    this.userService.changePassword(this.form.value.new1, this.user.username).subscribe((resp) => {
      if (resp['message'] == 'changed password') {
        sessionStorage.removeItem('user');
        HeaderComponent.check();
        this.router.navigate(['']);
      }
      else
        this.openSnackBar("Something went wrong");
    });
  }
}
