import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as d3 from 'd3';
import { AssistantService } from '../assistant.service';
import { City } from '../models/city';
import { Estate } from '../models/estate';
import { Location } from '../models/location';
import { Municipality } from '../models/municipality';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {


  private data = [
    { "month": "January", "num": 0 },
    { "month": "February", "num": 0 },
    { "month": "Marth", "num": 0 },
    { "month": "April", "num": 0 },
    { "month": "May", "num": 0 },
    { "month": "June", "num": 0 },
    { "month": "Jule", "num": 0 },
    { "month": "Avgust", "num": 0 },
    { "month": "September", "num": 0 },
    { "month": "October", "num": 0 },
    { "month": "November", "num": 0 },
    { "month": "December", "num": 0 },
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  @ViewChild('f') form?: NgForm;
  cities: City[] = [];
  municipalities: Municipality[] = [];
  locationes: Location[] = [];
  constructor(private assistantService: AssistantService) { }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.month))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 10])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.month))
      .attr("y", d => y(d.num))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.num))
      .attr("fill", "#d04a35");
  }

  ngOnInit(): void {
    this.assistantService.allCities().subscribe((data: City[]) => {
      this.cities = data;
    });
    this.createSvg();
    this.drawBars(this.data);
  }

  cityClick() {
    this.assistantService
      .allMunicipalities(this.form.value.city)
      .subscribe((data: Municipality[]) => {
        this.municipalities = data;

      });
  }

  municipalityClick() {
    this.assistantService
      .allLocationes(this.form.value.city, this.form.value.municipality)
      .subscribe((data: Location[]) => {
        this.locationes = data;
      });
  }

  clearData() {
    this.data.forEach(element => {
      element.num = 0;
    });
  }

  locationClick() {
    this.clearData();
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.assistantService.getSoldByLocation(this.form.value.city, this.form.value.municipality, this.form.value.location,user.agency).subscribe((data2: Estate[]) => {
      for (let i = 0; i < data2.length; i++) {
        this.data[data2[i].sold - 1].num++;
      }
      d3.select("figure#bar").html('');
      this.cities = this.municipalities = this.locationes = [];
      this.form.reset();
      this.ngOnInit();
    })
  }

  onSubmit() {

  }


}
