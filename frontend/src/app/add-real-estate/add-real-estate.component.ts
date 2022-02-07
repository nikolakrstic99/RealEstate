import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssistantService } from '../assistant.service';
import { Agency } from '../models/agency';
import { Bus } from '../models/bus';
import { City } from '../models/city';
import { Location } from '../models/location';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
import { Estate } from '../models/estate';
import * as L from 'leaflet';
import * as d3 from 'd3';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
declare var ol: any;



@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.css'],
})
export class AddRealEstateComponent implements OnInit {
  constructor(
    private assistantService: AssistantService,
    private realEstateService: RealEstateService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }
  @ViewChild('f') form?: NgForm;
  cities: City[] = [];
  municipalities: Municipality[] = [];
  locationes: Location[] = [];
  streets: string[] = [];
  busses: number[] = [];
  user: User;
  agency: Agency;
  toppings = new FormControl();
  lastId: number;
  initCharacteristic: string[] = [
    'terrace',
    'basement',
    'internet',
    'loggia',
    'garage',
    'intercom',
    'french balcony',
    'garden',
    'telephone',
    'elevator',
    'climate',
  ];
  lat: number;
  lng: number;
  map;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(str:string) {
    this._snackBar.open(str, 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };

  mapInit() {
    this.map = L.map("map").remove();
    this.map = L.map("map").setView([44.82, 20.45], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var markerGroup = L.layerGroup().addTo(this.map);


    this.map.on("click", e => {
      console.log(e.latlng); // get the coordinates

      var marker = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon);
      markerGroup.clearLayers();
      L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(markerGroup); // add the marker onclick
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
    });
  }

  ngOnInit(): void {

    this.mapInit();

    this.assistantService.allCities().subscribe((data: City[]) => {
      this.cities = data;
    });
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user.agency != '') {
      this.userService.getAgency(this.user.agency).subscribe((a: Agency) => {
        this.agency = a;
      });
    } else {
    }

    this.realEstateService.getLastRealEstate().subscribe((data: Estate) => {
      this.lastId = data.id;
    });
  }

  name: string = null;
  pib: string = null;
  city: string = null;
  address: string = null;
  phone: string = null;
  onSubmit() {
    this.boolCharacteristics.forEach((element, index) => {
      if (element == true)
        this.characteristics.push(this.initCharacteristic[index]);
    });
    if (this.agency != null) {
      this.name = this.agency.name;
      this.pib = this.agency.pib;
      this.city = this.agency.city;
      this.address = this.agency.address;
      this.phone = this.agency.phone;
    }
    this.lastId++;
    this.realEstateService
      .addRealEstate(
        this.lastId,
        this.form.value.type,
        this.form.value.name,
        this.form.value.city,
        this.form.value.municipality,
        this.form.value.location,
        this.form.value.street,
        this.form.value.area,
        this.form.value.numOfRooms,
        this.form.value.year,
        this.form.value.state,
        this.form.value.heating,
        this.form.value.floor,
        this.form.value.totalFloors,
        this.form.value.parking,
        this.form.value.monthly,
        this.form.value.price,
        this.form.value.about,
        this.characteristics,
        this.form.value.busses,
        this.name,
        this.pib,
        this.city,
        this.address,
        this.phone,
        this.user.firstname,
        this.user.surname,
        this.user.phone,
        this.user.license,
        this.images,
        this.lat,
        this.lng
      )
      .subscribe((resp) => {
        if ((resp['message'] = 'Real estate added')) 
          this.openSnackBar('Real estate added');
        else 
          this.openSnackBar('Real estate not added');
      });
  }

  cityClick() {
    this.assistantService
      .allMunicipalities(this.form.value.city)
      .subscribe((data: Municipality[]) => {
        this.municipalities = data;
        this.assistantService
          .getBusses(this.form.value.city)
          .subscribe((data2: Bus) => {
            for (let i = 0; i < data2.busses.length; i++) {
              this.busses[i] = data2.busses[i];
            }
          });
      });
  }

  municipalityClick() {
    this.assistantService
      .allLocationes(this.form.value.city, this.form.value.municipality)
      .subscribe((data: Location[]) => {
        this.locationes = data;
      });
  }

  locationClick() {
    this.assistantService
      .getLocation(
        this.form.value.city,
        this.form.value.municipality,
        this.form.value.location
      )
      .subscribe((data: Location) => {
        this.streets = data.streets;
      });
  }

  boolCharacteristics: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false]
  characteristics: Array<string> = [];
  check(num: number) {
    this.boolCharacteristics[num] = !this.boolCharacteristics[num];
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  imagesOk: boolean = false;
  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.imagesOk = true;
      if (event.target.files.length < 3 || event.target.files.length > 6) {
        this.imagesOk = false;
        this.openSnackBar('Plese select 3-6 images');
        return;
      }
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  images: string[] = [];
  onDestroy(){
    this.map = L.map("map").remove();
  }
}
