import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estate } from '../models/estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-property-search-result',
  templateUrl: './property-search-result.component.html',
  styleUrls: ['./property-search-result.component.css']
})
export class PropertySearchResultComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private realEstateService: RealEstateService) { }
  @Input() estateId = 0;
  estateId2: number = 0;
  estate: Estate = new Estate();
  avgPrice: number;
  ngOnInit(): void {
    this.estateId2 = this.estateId;
    this.realEstateService.findRealEstateById(this.estateId2).subscribe((data: Estate) => {
      this.estate = data;
      if (this.estate.images.length == 0) {
        this.estate.images.push("https://www.freeiconspng.com/uploads/no-image-icon-13.png")
      }
      this.estate.images.forEach((e) => {
        this.activeSlide.push(false);
      });
      this.activeSlide[0] = true;
      this.averagePrice();
    })

  }

  numberWithCommas(n) {
    return n;
    //return n.toLocaleString('en-US', { maximumFractionDigits: 2 }).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    });
  }
}
