import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssistantService } from '../assistant.service';
import { Estate } from '../models/estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css'],
})
export class AdvancedSearchComponent implements OnInit {
  minAreaFrom: number;
  minAreaTo: number;
  maxAreaTo: number;
  maxAreaFrom: number;
  areaFrom: number;
  areaTo: number;

  minRoomsFrom: number = 1;
  minRoomsTo: number = 1;
  maxRoomsTo: number = +5;
  maxRoomsFrom: number = 5;
  roomsFrom: number = 1;
  roomsTo: number = 5;

  minYearFrom: number;
  minYearTo: number;
  maxYearTo: number;
  maxYearFrom: number;
  yearFrom: number;
  yearTo: number;

  minFloorFrom: number;
  minFloorTo: number;
  floorFrom: number;
  floorTo: number;
  maxFloorFrom: number;
  maxFloorTo: number;

  minCostFrom: number;
  minCostTo: number;
  costFrom: number;
  costTo: number;
  maxCostFrom: number;
  maxCostTo: number;

  constructor(private realEstateService: RealEstateService, private assistantService: AssistantService, private router: Router) { }

  minPriceFrom: number;
  maxPriceFrom: number;
  minPriceTo: number;
  maxPriceTo: number;
  priceFrom: number;
  priceTo: number;
  ngOnInit(): void {
    this.realEstateService.getPrice(-1).subscribe((e: Estate) => {
      this.priceTo = this.maxPriceTo = this.maxPriceFrom = e.price;
    });
    this.realEstateService.getPrice(1).subscribe((e: Estate) => {
      this.priceFrom = this.minPriceFrom = this.minPriceTo = e.price;
    });
    this.realEstateService.getArea(-1).subscribe((e: Estate) => {
      this.areaTo = this.maxAreaTo = this.maxAreaFrom = e.area;
    });
    this.realEstateService.getArea(1).subscribe((e: Estate) => {
      this.areaFrom = this.minAreaFrom = this.minAreaTo = e.area;
    });
    this.realEstateService.getYear(-1).subscribe((e: Estate) => {
      this.yearTo = this.maxYearTo = this.maxYearFrom = e.constructionYear;
    });
    this.realEstateService.getYear(1).subscribe((e: Estate) => {
      this.yearFrom = this.minYearFrom = this.minYearTo = e.constructionYear;
    });
    this.realEstateService.getMonthlyCost(-1).subscribe((e: Estate) => {
      this.costTo = this.maxCostTo = this.maxCostFrom = e.monthly;
    });
    this.realEstateService.getMonthlyCost(1).subscribe((e: Estate) => {
      this.costFrom = this.minCostTo = this.minCostFrom = e.monthly;
    });
    this.realEstateService.getFloor(-1).subscribe((e: Estate) => {
      this.floorTo = this.maxFloorTo = this.maxFloorFrom = e.floor;
    });
    this.realEstateService.getFloor(1).subscribe((e: Estate) => {
      this.floorFrom = this.minFloorTo = this.minFloorFrom = e.floor;
    });

  }

  type: string[] = ["Agency", "Owner"];
  state: string[] = ["Originally", "Renovated", "LUX"];
  heating: string[] = ["Central heating", "Electric heating", "Term accumulate", "Gas", "Floor heating", "Thermal pump"];
  characteristic: string[] = ['terrace', 'basement', 'internet', 'loggia', 'garage', 'intercom', 'french balcony', 'garden', 'telephone', 'elevator', 'climate'];
  checkboxType: boolean[] = [false, false];
  checkboxState: boolean[] = [false, false, false];
  checkboxHeating: boolean[] = [false, false, false, false, false, false];
  checkboxCharacteristics: boolean[] = [false, false, false, false, false, false, false, false, false, false, false];
  checkType(num: number) {
    this.checkboxType[num] = !this.checkboxType[num];
  }

  checkState(num: number) {
    this.checkboxState[num] = !this.checkboxState[num];
  }

  checkHeating(num: number) {
    this.checkboxHeating[num] = !this.checkboxHeating[num];
  }

  checkCharacteristics(num: number) {
    this.checkboxCharacteristics[num] = !this.checkboxCharacteristics[num];
  }

  costLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return (value / 1000).toFixed(2) + 'k';
    }

    return value;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  minPriceChange() {
    this.minPriceTo = this.priceFrom;
  }

  maxPriceChange() {
    this.maxPriceFrom = this.priceTo;
  }

  minAreaChange() {
    this.minAreaTo = this.areaFrom;
  }

  maxAreaChange() {
    this.maxAreaFrom = this.areaTo;
  }

  minRoomsChange() {
    this.minRoomsTo = this.roomsFrom;
  }

  maxRoomsChange() {
    this.maxRoomsFrom = this.roomsTo;
  }

  minYearChange() {
    this.minYearTo = this.yearFrom;
  }

  maxYearChange() {
    this.maxYearFrom = this.yearTo;
  }

  minFloorChange() {
    this.minFloorTo = this.floorFrom;
  }

  maxFloorChange() {
    this.maxFloorFrom = this.floorTo;
  }

  minCostChange() {
    this.minCostTo = this.costFrom;
  }

  maxCostChange() {
    this.maxCostFrom = this.costTo;
  }

  makeIds() {
    var ids: number[] = [];
    this.filteredEstates.forEach(element => {
      ids.push(element.id);
    });
    return ids;
  }

  filteredEstates: Estate[] = [];
  filter() {
    var cities: string[] = [];
    var municipalities: string[] = [];
    var locations: string[] = [];
    console.log(this.checkboxCharacteristics);

    this.assistantService.getAllUnsold().subscribe((allEstates: Estate[]) => {
      this.filteredEstates = allEstates;
      this.filteredEstates = this.filteredEstates.filter(obj => obj.price <= +this.priceTo && obj.price >= +this.priceFrom);
      this.filteredEstates = this.filteredEstates.filter(obj => obj.area <= +this.areaTo && obj.area >= +this.areaFrom);
      this.filteredEstates = this.filteredEstates.filter(obj => obj.rooms <= +this.roomsTo && obj.rooms >= +this.roomsFrom);
      this.filteredEstates = this.filteredEstates.filter(obj => obj.constructionYear <= +this.yearTo && obj.constructionYear >= +this.yearFrom);
      this.filteredEstates = this.filteredEstates.filter(obj => obj.floor <= +this.floorTo && obj.floor >= +this.floorFrom);
      this.filteredEstates = this.filteredEstates.filter(obj => obj.monthly <= +this.costTo && obj.monthly >= +this.costFrom);

      if (this.checkboxType[0] && this.checkboxType[1]) {

      } else {
        if (this.checkboxType[0])
          this.filteredEstates = this.filteredEstates.filter(obj => obj.adLicense != "");
        else if (this.checkboxType[1])
          this.filteredEstates = this.filteredEstates.filter(obj => obj.adLicense == "");
      }

      var states: string[] = [];
      this.checkboxState.forEach((element, index) => {
        if (element) {
          states.push(this.state[index]);
        }
      });
      if (states.length > 0)
        this.filteredEstates = this.filteredEstates.filter(obj => states.includes(obj.state));


      var heatings: string[] = [];
      this.checkboxHeating.forEach((element, index) => {
        if (element) {
          heatings.push(this.heating[index]);
        }
      });
      if (heatings.length > 0)
        this.filteredEstates = this.filteredEstates.filter(obj => heatings.includes(obj.heating));


      var characteristics: string[] = [];
      this.checkboxCharacteristics.forEach((element, index) => {
        if (element)
          characteristics.push(this.characteristic[index]);
      })
      characteristics.forEach(element => {
        this.filteredEstates = this.filteredEstates.filter(obj => obj.characteristics.includes(element));
      });

      this.router.navigate(['/customerSearchResult', { estates: JSON.stringify(this.makeIds()) }]);
    })
  }
}
