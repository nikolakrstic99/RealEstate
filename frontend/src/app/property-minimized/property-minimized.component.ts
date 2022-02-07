import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estate } from '../models/estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-property-minimized',
  templateUrl: './property-minimized.component.html',
  styleUrls: ['./property-minimized.component.css']
})
export class PropertyMinimizedComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private realEstateService: RealEstateService) { }
  @Input() estateId = 0;
  estateId2: number = 0;
  estate: Estate = new Estate();
  randNum:number = 0;
  ngOnInit(): void {
    this.estateId2 = this.estateId;
    this.realEstateService.findRealEstateById(this.estateId2).subscribe((data: Estate) => {
      this.estate = data;
      if(this.estate.images && this.estate.images.length>0){
        this.randNum=Math.floor(Math.random() * (this.estate.images.length - 1));
      }
    })
  }

  numberWithCommas(n:number) {
    return n;
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getRandomImage() {
    if (this.estate.images && this.estate.images.length>0) {
      return this.estate.images[this.randNum];
    } else {
      return "https://www.freeiconspng.com/uploads/no-image-icon-13.png";      
    }
  }
}
