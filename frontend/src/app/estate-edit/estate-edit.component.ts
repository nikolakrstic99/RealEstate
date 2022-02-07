import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AssistantService } from '../assistant.service';
import { Agency } from '../models/agency';
import { Bus } from '../models/bus';
import { City } from '../models/city';
import { Estate } from '../models/estate';
import { Location } from '../models/location';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';
import { UserService } from '../user.service';
import * as L from 'leaflet';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-estate-edit',
  templateUrl: './estate-edit.component.html',
  styleUrls: ['./estate-edit.component.css'],
})
export class EstateEditComponent implements OnInit {
  constructor(
    private assistantService: AssistantService,
    private userService: UserService,
    private realEstateService: RealEstateService,
    private router: Router,
    private datepipe: DatePipe,
    private _snackBar: MatSnackBar
  ) { }
  estate: Estate;
  @ViewChild('f') form?: NgForm;
  cities: City[] = [];
  municipalities: Municipality[] = [];
  locationes: Location[] = [];
  streets: string[] = [];

  selectedBusses: number[] = []; //ranije selektovani busevi
  busses: number[] = []; //svi busevi
  newSelectedBusses: number[] = []; //novo selektovani busevi

  user: User;
  agency: Agency;
  type: string;
  name: string;
  city: string;
  municipality: string;
  location: string;
  street: string;
  area: number;
  numOfRooms: number;
  year: number;
  state: string;
  heating: string;
  floor: number;
  totalFloors: number;
  parking: string;
  monthly: number;
  price: number;
  about: string;
  sold: number = 0;
  lastModified: string;
  lat: number;
  lng: number;

  _id: string;
  types: string[] = ['Apartment', 'House', 'Cottage', 'Local', 'Warehouse'];

  map;

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

    this.map = L.map("map").setView([this.estate.lat, this.estate.lng], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var markerGroup = L.layerGroup().addTo(this.map);
    var marker = L.marker([this.estate.lat, this.estate.lng], this.markerIcon).addTo(markerGroup);

    this.map.on("click", e => {
      markerGroup.clearLayers();
      L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(markerGroup);
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
    });
  }
  selectedTypeIndex: number;
  ngOnInit(): void {
    this.estate = JSON.parse(sessionStorage.getItem('estateEdit'));
    this.check();
    this.mapInit();
    this._id = JSON.parse(sessionStorage.getItem('estateEdit'))._id;
    //sessionStorage.removeItem('estateEdit');
    this.type = this.estate.type;
    
    this.name = this.estate.name;
    this.city = this.estate.city;
    this.municipality = this.estate.municipality;
    this.location = this.estate.location;
    this.street = this.estate.street;

    //BUUUUS

    this.area = this.estate.area;
    this.numOfRooms = this.estate.rooms;
    this.year = this.estate.constructionYear;
    this.state = this.estate.state;
    this.heating = this.estate.heating;
    this.floor = this.estate.floor;
    this.totalFloors = this.estate.totalFloors;
    this.parking = this.estate.parking;
    this.monthly = this.estate.monthly;
    this.price = this.estate.price;
    this.about = this.estate.about;
    this.sold = this.estate.sold;
    this.lat = this.estate.lat;
    this.lng = this.estate.lng;
    this.lastModified = this.datepipe.transform(
      new Date(),
      'yyyy-MM-dd hh:mm:ssZZZZZ'
    );

    this.assistantService.allCities().subscribe((data: City[]) => {
      this.cities = data;

      this.assistantService
        .allMunicipalities(this.form.value.city)
        .subscribe((data2: Municipality[]) => {
          this.municipalities = data2;

          this.assistantService
            .allLocationes(this.form.value.city, this.form.value.municipality)
            .subscribe((data3: Location[]) => {
              this.locationes = data3;

              this.assistantService
                .getLocation(
                  this.form.value.city,
                  this.form.value.municipality,
                  this.form.value.location
                )
                .subscribe((data4: Location) => {
                  this.streets = data4.streets;
                });
            });

          this.assistantService
            .getBusses(this.form.value.city)
            .subscribe((data2: Bus) => {
              this.busses = data2.busses;
            });
        });
    });
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user.agency != '') {
      this.userService.getAgency(this.user.agency).subscribe((a: Agency) => {
        this.agency = a;
      });
    } else {
    }
    for (let i = 0; i < this.estate.busses.length; i++) {
      this.newSelectedBusses[i] = this.estate.busses[i];
    }
  }

  isSelected(num: number) {
    for (let i = 0; i < this.selectedBusses.length; i++) {
      if (this.selectedBusses[i] == num) {
        return true;
      }
    }
    return false;
  }

  cityClick() {
    this.municipality = this.street = this.location = null;
    this.locationes = this.streets = [];
    this.assistantService
      .allMunicipalities(this.form.value.city)
      .subscribe((data: Municipality[]) => {
        this.municipalities = data;
        this.assistantService
          .getBusses(this.form.value.city)
          .subscribe((data2: Bus) => {
            this.busses = data2.busses;
          });
      });
  }

  municipalityClick() {
    this.location = this.street = null;
    this.streets = [];
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

  initCharacteristic = [
    { name: 'terrace', has: false },
    { name: 'basement', has: false },
    { name: 'internet', has: false },
    { name: 'loggia', has: false },
    { name: 'garage', has: false },
    { name: 'intercom', has: false },
    { name: 'french balcony', has: false },
    { name: 'garden', has: false },
    { name: 'telephone', has: false },
    { name: 'elevator', has: false },
    { name: 'climate', has: false }
  ];
  boolCharacteristics: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false];

  check() {
    var characteristics = this.estate.characteristics;
    for (let i = 0; i < characteristics.length; i++) {
      for (let j = 0; j < this.initCharacteristic.length; j++) {
        if (characteristics[i] == this.initCharacteristic[j].name)
          this.initCharacteristic[j].has = true;
      }
    }

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  openSnackBar(str:string) {
    this._snackBar.open(str, 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  characteristics: string[] = [];
  onSubmit() {
    this.initCharacteristic.forEach(element => {
      if (element.has)
        this.characteristics.push(element.name);
    });

    var agencyName = null;
    var agencyPib = null;
    var agencyCity = null;
    var agencyAddress = null;
    var agencyPhone = null;
    if (this.agency != null) {
      agencyName = this.agency.name;
      agencyPib = this.agency.pib;
      agencyCity = this.agency.city;
      agencyAddress = this.agency.address;
      agencyPhone = this.agency.phone;
    }
    this.realEstateService
      .editRealEstate(
        this._id,
        this.type,
        this.name,
        this.city,
        this.municipality,
        this.location,
        this.street,
        this.area,
        this.numOfRooms,
        this.year,
        this.state,
        this.heating,
        this.floor,
        this.totalFloors,
        this.parking,
        this.monthly,
        this.price,
        this.about,
        this.characteristics,
        this.form.value.busses,
        agencyName,
        agencyPib,
        agencyCity,
        agencyAddress,
        agencyPhone,
        this.user.firstname,
        this.user.surname,
        this.user.phone,
        this.sold,
        this.lastModified,
        this.lat,
        this.lng
      )
      .subscribe((resp) => {
        if ((resp['message'] = 'Real estate edited')) 
          this.openSnackBar('Real estate edited');
        else
          this.openSnackBar('Real estate not edited');       
      });
  }
}
