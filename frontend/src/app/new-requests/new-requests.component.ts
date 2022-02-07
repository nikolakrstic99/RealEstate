import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.css']
})
export class NewRequestsComponent implements OnInit {

  constructor(private userService: UserService) { }
  requests: User[] = []
  ngOnInit(): void {
    this.userService.allRequests().subscribe((data: User[]) => {
      this.requests = data;
    })
  }

  accept(r: User) {
    const data = {
      firstname: r.firstname,
      surname: r.surname,
      username: r.username,
      password: r.password,
      email: r.email,
      phone: r.phone,
      agency: r.agency,
      license: r.license,
      birthday: r.birthday,
      type: r.type,
      imageFile: r.imageFile
    }
    this.userService.acceptRequest(data).subscribe((resp) => {
      this.ngOnInit();
    });
  }

  decline(r: User) {
    const data = {
      firstname: r.firstname,
      surname: r.surname,
      username: r.username,
      password: r.password,
      email: r.email,
      phone: r.phone,
      agency: r.agency,
      license: r.license,
      birthday: r.birthday,
      type: r.type,
      imageFile: r.imageFile
    }
    this.userService.declineRequest(data).subscribe((resp) => {
      this.ngOnInit();
    });
  }

}
