import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Estate } from '../models/estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-customer-search-result',
  templateUrl: './customer-search-result.component.html',
  styleUrls: ['./customer-search-result.component.css']
})
export class CustomerSearchResultComponent implements OnInit {


  constructor(private route: ActivatedRoute, private realEstateService: RealEstateService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input()
  estates: Estate[] = [];
  length: number;
  resultPerPage: number = 10;
  showEstate: Estate[] = [];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      var ids: number[] = [];
      ids = JSON.parse(params['estates']) as number[];
      ids.forEach(element => {
        this.realEstateService.findRealEstateById(element).subscribe((data: Estate) => {
          this.estates.push(data);
          
          this.length = this.estates.length;
          this.showEstate = this.estates.slice(0, this.resultPerPage);
        })
      });
      console.log(this.estates);
      console.log(this.showEstate);
    });
  }

  confirmPageChange(pageEvent: PageEvent) {
    this.showEstate = [];
    console.log(this.estates);
    console.log(pageEvent.pageIndex);
    console.log(this.resultPerPage);
    this.showEstate = this.estates.slice(pageEvent.pageIndex * this.resultPerPage, pageEvent.pageIndex * this.resultPerPage + this.resultPerPage);
    console.log(this.showEstate);
  }

}
