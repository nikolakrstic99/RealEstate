import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(private userService: UserService,private router:Router) { }

  users: User[] = []
  ngOnInit(): void {
    this.userService.allUsers().subscribe((data: User[]) => {
      this.users = data;
    })
  }

  delete(r: User) {
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
      type: r.type
    }
    this.userService.deleteUser(data).subscribe((resp) => {
      this.ngOnInit();
      //window.location.reload();
    });
  }

  edit(u: User) {
    sessionStorage.setItem('editUser',JSON.stringify(u));
    this.router.navigate(['userEdit']);
  }

}
