import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';
import { UserService } from '../user.service';
import * as L from 'leaflet';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

declare var ol: any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  constructor(
    private router: Router,
    private realEstateService: RealEstateService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  estateId: number;
  estate: Estate = new Estate();
  allOthersEstates: Estate[] = [];
  greenPrice: boolean;
  user: User = null;
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(str:string) {
    this._snackBar.open(str, 'Okay', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  map: any;
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };
  otherIcon = {
    icon: L.icon({
      iconSize: [35, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "http://simpleicon.com/wp-content/uploads/map-marker-1.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };
  mapInit() {
    this.map = L.map("map").setView([this.estate.lat, this.estate.lng], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    var markerGroup = L.layerGroup().addTo(this.map);
    L.marker([this.estate.lat, this.estate.lng], this.markerIcon).addTo(markerGroup);

    this.allOthersEstates.forEach(element => {

      var marker = L.marker([element.lat, element.lng], this.otherIcon).addTo(markerGroup);
      marker.on("click", e => {
        this.map.remove();
        this.estateId = element.id;
        this.router.navigate(["property"], { queryParams: { estateId: element.id } });
        this.init();
      });
    });

  }

  numberWithCommas(n: Number) {
    return n;
    var str: String;
    str = n.toString();
    return "" + str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  avgPrice: number;
  averagePrice() {
    this.realEstateService.getAll().subscribe((data: Estate[]) => {
      if (this.estate.city)
        data = data.filter(obj => obj.city === this.estate.city)
      if (this.estate.municipality)
        data = data.filter(obj => obj.municipality === this.estate.municipality)
      if (this.estate.location)
        data = data.filter(obj => obj.location === this.estate.location);

      this.avgPrice = 0;
      for (let i = 0; i < data.length; i++) {
        this.avgPrice += data[i].price / data[i].area;
      }
      this.avgPrice /= data.length;
      this.avgPrice = Number(this.avgPrice.toFixed(2));
      if (this.estate.price <= this.avgPrice * this.estate.area) {
        this.greenPrice = true;
      } else {
        this.greenPrice = false;
      }
    });
  }

  init() {
    this.realEstateService
      .findRealEstateById(this.estateId)
      .subscribe((data: Estate) => {
        this.estate = data;
        this.realEstateService.allOthersEstates(this.estateId).subscribe((data: Estate[]) => {
          this.allOthersEstates = data;
          this.mapInit();
        })

        this.check();
        if (this.estate.images.length == 0) {
          this.estate.images.push("https://www.freeiconspng.com/uploads/no-image-icon-13.png")
        }
        this.activeSlide = [];
        this.estate.images.forEach((e) => {
          this.activeSlide.push(false);
        });
        this.activeSlide[0] = true;

        this.averagePrice();
        console.log(this.activeSlide);
      });
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.estateId = +urlParams.get('estateId');
    this.init();
  }

  activeSlide: boolean[] = [];
  activeIndex = 0;
  displayPhone = false;

  imageClick() {
    this.activeSlide[this.activeIndex] = false;
    this.activeIndex++;
    this.activeIndex %= this.activeSlide.length;
    this.activeSlide[this.activeIndex] = true;
  }

  phoneClick() {
    this.displayPhone = true;
  }
  addToFavorites() {
    var returnFlag = false;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user.favorites);
    if (this.user.favorites == null || this.user.favorites.length < 5) {
      if (this.user.favorites != null) {
        this.user.favorites.forEach((element) => {
          if (element == this.estateId) {
            this.openSnackBar('You have already added this real estate to your favorites');
            returnFlag = true;
          }
        });
      }
      if (returnFlag) {
        return;
      }
      this.userService
        .addToFavorites(this.user.username, this.estateId)
        .subscribe((resp: Response) => {
          this.userService
            .getUser(this.user.username)
            .subscribe((newUser: User[]) => {
              console.log('dosao');
              sessionStorage.removeItem('user');
              sessionStorage.setItem('user', JSON.stringify(newUser[0]));
            });
        });
    } else {
      this.openSnackBar('You already reached maximum of favorites real estates(5)');
    }
  }

  boolCharacteristics: boolean[] = [];
  check() {
    this.estate.characteristics.forEach((str) => {
      this.initCharacteristic.forEach((element, index) => {
        if (element == str) {
          this.boolCharacteristics[index] = true;
        }
      });
    });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  onDestroy() {
    this.map = L.map("map").remove();
  }
}
