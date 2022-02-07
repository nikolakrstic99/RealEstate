import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AssistantService } from '../assistant.service';
import { City } from '../models/city';
import { Municipality } from '../models/municipality';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  constructor(private assistantService: AssistantService,  private _snackBar: MatSnackBar) { }
  @ViewChild('f') form?: NgForm;

  cities: City[] = [];
  municipalities: Municipality[] = [];
  
  ngOnInit(): void {
    this.assistantService.allCities().subscribe((data: City[]) => {
      this.cities = data;
    })
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(str:string) {
    this._snackBar.open(str, 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSubmit() {
    this.assistantService.addLocation(this.form.value.city, this.form.value.municipality, this.form.value.location, this.streets).subscribe((resp) => {
      if (resp['message'] == "Location added") {
        this.openSnackBar("Location added");
      }
      else
        this.openSnackBar("Location didn't added");
      
    })
  }

  cityClick() {
    this.assistantService.allMunicipalities(this.form.value.city).subscribe((data: Municipality[]) => {
      this.municipalities = data;
    })
  }
  streets: Array<string> = [];
  newStreet() {
    this.streets.push('');
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
