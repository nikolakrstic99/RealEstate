import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  constructor(private userService: UserService) { }
  @ViewChild('f') form: NgForm;

  message = "";
  ngOnInit(): void {
  }

  onSubmit() {
    var name = this.form.value.name;
    var address = this.form.value.address;
    var city = this.form.value.city;
    var phone = this.form.value.phone;
    var pib = this.form.value.pib;
    this.userService.addAgency(name, address, city, phone, pib).subscribe((resp) => {
      if(resp['message']=="Agency added"){
        this.message = "Agency " + this.form.value.name + " successfully added";
      }else{
        this.message = "Agency isn't added";
      }
    });
  }

}
