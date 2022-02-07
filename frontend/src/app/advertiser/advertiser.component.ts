import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/estate';
import { RealEstateService } from '../real-estate.service';
import { DatePipe } from '@angular/common'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.css']
})
export class AdvertiserComponent implements OnInit {

  constructor(private realEstateService: RealEstateService, private router: Router, private datepipe: DatePipe, private _snackBar: MatSnackBar) { }
  properties: Estate[] = [];
  isSold: number[] = [];
  ngOnInit(): void {
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.realEstateService.getEstateWithUsername(user.firstname, user.surname).subscribe((estates: Estate[]) => {
      this.properties = estates;
      for (let i = 0; i < this.properties.length; i++) {
        this.isSold[i] = this.properties[i].sold;
      }
    })
  }

  sold(e: Estate) {
    this.realEstateService.sold(e.name, e.adFirstName, e.adSurname).subscribe((resp) => {
      this.ngOnInit();
    })
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(str: string) {
    this._snackBar.open(str, 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  edit(e: Estate) {
    let currentDate = new Date()
    let date = new Date(e.lastModified);
    let greska = 12;
    var minutes = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 - greska * 60);
    if (e.lastModified == "-1" || minutes > 60) {
      //this.realEstateService.edit(e.name, e.adFirstName, e.adSurname, this.datepipe.transform(currentDate, 'yyyy-MM-dd hh:mm:ssZZZZZ')).subscribe((resp) => {
      sessionStorage.setItem('estateEdit', JSON.stringify(e));
      this.router.navigate(['estateEdit']);

      //})
    } else {
      this.openSnackBar("You have edited this realEstate in last hour.");
    }
  }
}
