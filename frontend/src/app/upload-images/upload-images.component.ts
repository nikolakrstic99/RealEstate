import { Component, OnInit } from '@angular/core';
import { Estate } from '../models/estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  constructor(private realEstateService: RealEstateService) { }
  data;
  lastId;
  ngOnInit(): void {
    this.data = JSON.parse(sessionStorage.getItem("newEstate"));
    sessionStorage.removeItem("newEstate");
    console.log(this.data);
    this.realEstateService.getLastRealEstate().subscribe((lastEstate: Estate) => {
      this.lastId = lastEstate.id;
    })
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {

      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          //console.log(event.target.result);
          this.images.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  images: string[] = [];

  add() {

    this.realEstateService.addRealEstate(this.lastId + 1, this.data.type, this.data.name, this.data.city, this.data.municipality, this.data.location, this.data.street, this.data.area, this.data.rooms, this.data.constructionYear, this.data.state, this.data.heating, this.data.floor, this.data.totalFloors, this.data.parking, this.data.monthly, this.data.price, this.data.about, this.data.characteristics, this.data.busses, this.data.agencyName, this.data.agencyPIB, this.data.agencyCity, this.data.agencyAddress, this.data.agencyPhone, this.data.adFirstName, this.data.adSurname, this.data.adPhone, this.data.adLicense, this.images, this.data.lat, this.data.lng).subscribe((resp) => {
      if ((resp['message'] = 'Real estate added')) {
        alert('Real estate added');
      } else {
        alert('Real estate not added');
      }
    });
  }
}
