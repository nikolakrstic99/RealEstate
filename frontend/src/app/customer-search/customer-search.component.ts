import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssistantService } from '../assistant.service';
import { City } from '../models/city';
import { Municipality } from '../models/municipality';
import { Location } from '../models/location';
import { Estate } from '../models/estate';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

  constructor(private assistantService: AssistantService,
    private router: Router, private _snackBar: MatSnackBar) { }
  cities: City[] = [];
  @ViewChild('f') form?: NgForm;
  municipalities: Municipality[] = [];
  locationes: Location[] = [];
  streets: string[] = [];
  type: string = null;
  price: string = null;
  meters: string = null;
  rooms: string = null;
  city: string = null;
  municipality: string = null;
  location: string = null;
  selectedLocationes = [];
  ngOnInit(): void {
    this.assistantService.allCities().subscribe((data: City[]) => {
      this.cities = data;
    })
  }

  cityClick() {
    this.assistantService.allMunicipalities(this.form.value.city).subscribe((data: Municipality[]) => {
      this.municipalities = data;
    })
  }

  municipalityClick() {
    this.assistantService.allLocationes(this.form.value.city, this.form.value.municipality).subscribe((data: Location[]) => {
      this.locationes = data;
    })
  }

  locationClick() {
    this.assistantService.getLocation(this.form.value.city, this.form.value.municipality, this.form.value.location).subscribe((data: Location) => {
      this.streets = data.streets;
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

  addLocation() {
    if(!this.city)
      this.openSnackBar("Please select at least city");
    else if(!this.municipality)
      this.openSnackBar("You successfully added new location in your search param: " + this.city);
    else if(!this.location)
      this.openSnackBar("You successfully added new location in your search param: " + this.city + "-" + this.municipality);
    else 
      this.openSnackBar("You successfully added new location in your search params: " + this.city + "-" + this.municipality + "-" + this.location);
    
      this.selectedLocationes.push({ "city": this.city, "municipality": this.municipality, "location": this.location });
    console.log(this.selectedLocationes);
    this.locationes = this.municipalities = [];
    this.city = this.municipality = this.location = null;
  }

  makeIds(){
    var ids:number[] = [];
    this.filteredEstates.forEach(element => {
      ids.push(element.id);
    });
    return ids;
  }

  filteredEstates: Estate[] = [];
  // filter(){
  //   this.router.navigate(['/customerSearchResult', { estates: JSON.stringify(this.filteredEstates) }]);
  // }
  filter() {
    
    var cities: string[] = [];
    var municipalities: string[] = [];
    var locations: string[] = [];
    this.assistantService.getAllUnsold().subscribe((data: Estate[]) => {
      this.filteredEstates = data;
      if (this.type)
        this.filteredEstates = this.filteredEstates.filter(obj => obj.type === this.type);
      if (this.price)
        this.filteredEstates = this.filteredEstates.filter(obj => obj.price <= +this.price);
      if (this.meters)
        this.filteredEstates = this.filteredEstates.filter(obj => obj.area >= +this.meters);
      if (this.rooms)
        this.filteredEstates = this.filteredEstates.filter(obj => obj.rooms >= +this.rooms);

      if (this.selectedLocationes.length > 0) {
        this.selectedLocationes.forEach(element => {
          if (element["city"]) {
            cities.push(element["city"]);
          }
          if (element["municipality"]) {
            municipalities.push(element["municipality"]);
          }
          if (element["location"]) {
            locations.push(element["location"]);
          }
        });
      }
      
      if (cities.length > 0){
        this.filteredEstates = this.filteredEstates.filter(obj => cities.includes(obj.city));
      }
      if (municipalities.length > 0)
        this.filteredEstates = this.filteredEstates.filter(obj => municipalities.includes(obj.municipality));
      if (locations.length > 0)
        this.filteredEstates = this.filteredEstates.filter(obj => locations.includes(obj.location));

      
      this.router.navigate(['/customerSearchResult', { estates: JSON.stringify(this.makeIds()) }]);
    })
  }

  
}
