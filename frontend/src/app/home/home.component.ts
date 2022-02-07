import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Estate } from '../models/estate';
import { RealEstateService } from '../real-estate.service';

declare var H: any;


//const axios = require('axios');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private realEstate:RealEstateService){}
  lastFive:Estate[]=[]

  ngOnInit(): void {
   this.realEstate.getLastFive().subscribe((data:Estate[])=>{
     this.lastFive=data;
   })

   
  }
}
