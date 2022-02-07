import { state } from '@angular/animations';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/estate';
import { UserService } from '../user.service';

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.css']
})
export class UploadJsonComponent implements OnInit {

  constructor(private s: UserService, private router: Router) { }
  estate: Estate;
  str: string
  ngOnInit(): void {
    this.dangerMessage = "";
  }
  selectedFile: File = null;
  onFileChanged(event) {


    this.selectedFile = event.target.files[0]
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      //console.log(JSON.stringify(fileReader.result))
      let s = JSON.stringify(fileReader.result);
      this.str = s
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }

  }
  type: string;
  name: string
  city: string
  municipality: string
  location: string
  street: string
  area: number
  rooms: number
  constructionYear: number
  state: string
  heating: string
  floor: number
  totalFloors: number
  parking: string
  monthly: number
  about: string
  price: number
  lat: number;
  lng: number;
  characteristic: string[] = []
  busses: number[] = [];
  images: string[] = [];
  agencyName: string;
  agencyPIB: string;
  agencyCity: string;
  agencyAddress: string;
  agencyPhone: string;
  adFirstName: string;
  adSurname: string;
  adPhone: string;
  adLicense: string;

  dangerMessage: string;
  onUpload() {
    var u = JSON.parse(this.str);
    var niz2: string[] = [];
    niz2 = u.split(/\n/);
    u = u.replaceAll("{", "").replaceAll("}", "").replaceAll("\n", "");
    var niz: string[] = [];

    niz = u.split(",");

    this.type = niz[0].split(":")[2].split('"')[1];
    this.name = niz[1].split(":")[1].split('"')[1];
    this.city = niz[2].split(":")[1].split('"')[1];
    this.municipality = niz[3].split(":")[1].split('"')[1];
    this.location = niz[4].split(":")[1].split('"')[1];
    this.street = niz[5].split(":")[1].split('"')[1];
    this.area = parseInt(niz[6].split(":")[1].replace(/\s/g, ''));
    this.rooms = parseInt(niz[7].split(":")[1].replace(/\s/g, ''));
    this.constructionYear = parseInt(niz[8].split(":")[1].replace(/\s/g, ''));
    this.state = niz[9].split(":")[1].split('"')[1];
    this.heating = niz[10].split(":")[1].split('"')[1];
    this.floor = parseInt(niz[11].split(":")[1].replace(/\s/g, ''));
    this.totalFloors = parseInt(niz[12].split(":")[1].replace(/\s/g, ''));
    this.parking = niz[13].split(":")[1].split('"')[1];
    this.monthly = parseInt(niz[14].split(":")[1].replace(/\s/g, ''));
    this.price = parseInt(niz[15].split(":")[1].replace(/\s/g, ''));
    this.lat = parseFloat(niz[16].split(":")[1].replace(/\s/g, ''));
    this.lng = parseFloat(niz[17].split(":")[1].replace(/\s/g, ''));
    this.about = niz2[20].split(":")[1].split('"')[1];
    
    if (!this.price || this.type == "" || this.name == "" || !this.area || !this.lat || !this.lng) {
      this.dangerMessage = "Bad data!";
      return;
    }
    var cnt = 22;
    while (!niz2[cnt].includes("]")) {
      this.characteristic.push(niz2[cnt].split('"')[1]);
      cnt++;
    }
    cnt++;//]
    cnt++;//busses
    while (!niz2[cnt].includes("]")) {

      this.busses.push(parseInt(niz2[cnt].replace(/\s/g, '').split(",")[0]));
      cnt++;
    }
    //console.log(this.busses);
    cnt++;//]
    cnt++;//advertiser
    cnt++;//{
    this.agencyName = niz2[cnt++].split(":")[1].split('"')[1];
    this.agencyPIB = niz2[cnt++].split(":")[1].split('"')[1];
    this.agencyCity = niz2[cnt++].split(":")[1].split('"')[1];
    this.agencyAddress = niz2[cnt++].split(":")[1].split('"')[1];
    this.agencyPhone = niz2[cnt++].split(":")[1].split('"')[1];
    if (this.agencyName == "")
      this.agencyName = null;
    if (this.agencyPIB == "")
      this.agencyPIB = null;
    if (this.agencyCity == "")
      this.agencyCity = null;
    if (this.agencyAddress == "")
      this.agencyAddress = null;
    if (this.agencyPhone == "")
      this.agencyPhone = null;

    cnt++;//}
    cnt++;//{
    this.adFirstName = niz2[cnt++].split(":")[1].split('"')[1];
    this.adSurname = niz2[cnt++].split(":")[1].split('"')[1];
    this.adPhone = niz2[cnt++].split(":")[1].split('"')[1];
    this.adLicense = niz2[cnt++].split(":")[1].split('"')[1];

    const data = {
      type: this.type,
      name: this.name,
      city: this.city,
      municipality: this.municipality,
      location: this.location,
      street: this.street,
      area: this.area,
      rooms: this.rooms,
      constructionYear: this.constructionYear,
      state: this.state,
      heating: this.heating,
      floor: this.floor,
      totalFloors: this.totalFloors,
      parking: this.parking,
      monthly: this.monthly,
      about: this.about,
      price: this.price,
      characteristics: this.characteristic,
      busses: this.busses,
      images: [],
      agencyName: this.agencyName,
      agencyPIB: this.agencyPIB,
      agencyCity: this.agencyCity,
      agencyAddress: this.agencyAddress,
      agencyPhone: this.agencyPhone,
      adFirstName: this.adFirstName,
      adSurname: this.adSurname,
      adPhone: this.adPhone,
      adLicense: this.adLicense,
      sold: 0,
      lastModified: -1,
      lat: this.lat,
      lng: this.lng
    }
    sessionStorage.setItem("newEstate", JSON.stringify(data));
    this.router.navigate(['uploadImages']);
  }

}