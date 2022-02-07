import { Component, ViewChild, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  captcha: string;
  email: string;
  selectedFile!: ImageSnippet;
  agencies: Agency[] = [];
  constructor(private userService: UserService, private _snackBar: MatSnackBar) {
    this.captcha = '';
    this.email = 'secret@gmail.com';
  }

  ngOnInit(): void {
    this.userService.getAllAgencies().subscribe((data: Agency[]) => {
      this.agencies = data;
    })
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log('resolved captcha with responseL ' + this.captcha);
  }

  user = {
    firstname: "",
    surname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    agency: "",
    liscence: "",
    type: -1
  }

  validatePassword() {
    if (/[A-Za-z](?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z]).{8,}/.test(this.signupForm.value.password))
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
    if (this.signupForm.value.password != this.signupForm.value.retypePassword) {
      this.openSnackBar("Password aren't the same.");
      console.log("usao");
      return;
    }
    // if (!this.validatePassword()) {
    //   this.openSnackBar("Password isn't strong enogugh.Minimum 8 chars,1 upper case,1 number,1 special char,start with letter.");
    //   return;
    // }
    if(!this.signupForm.value.password.charAt(0).match(/[A-z]/i)){
      this.openSnackBar("Password must start with letter.");
      return;
    }
    this.userService.getUser(this.signupForm.value.username).subscribe((u: User) => {
      if (u[0] != null) {
        this.openSnackBar("User with same username already exists.");
        return;
      } else {
        this.userService.getUserWithEmail(this.signupForm.value.email).subscribe((u2: User) => {
          if (u2 == null) {
            this.userService.register(this.signupForm?.value.name, this.signupForm?.value.surname, this.signupForm?.value.username, this.signupForm?.value.password, this.signupForm?.value.email, this.signupForm?.value.phone, this.signupForm?.value.agency, this.signupForm?.value.license, this.signupForm?.value.birthday, this.imageFile).subscribe((resp) => {
              this.openSnackBar("Successfully registration.");
            });
          } else {
            this.openSnackBar("User with same email already exists.");
          }
        })
      }
    })

  }

  noImage() {
    if (this.imageFile == "")
      return true;
    else return false;
  }
  imageFile = "";
  minHeightWidth = 100;
  maxHeightWidth = 300;
  onFileSelected(event) {
    this.imageFile = "";
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const Img = new Image();
      const filesToUpload = (event.target.files);
      Img.src = URL.createObjectURL(filesToUpload[0]);



      reader.onload = (event: any) => {

        var img = new Image();
        img.onload = () => {
          console.log(img.width);
          console.log(img.height);
        };

        // console.log(event.target.result);
        this.imageFile = event.target.result;
      }
      Img.onload = (e: any) => {
        const height = e.path[0].height;
        const width = e.path[0].width;
        if (height < this.minHeightWidth || width < this.minHeightWidth || height > this.maxHeightWidth || width > this.maxHeightWidth) {
          this.openSnackBar("Image must be from 100x100px to 300x300px");
          this.imageFile = "";
          return;
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

}
