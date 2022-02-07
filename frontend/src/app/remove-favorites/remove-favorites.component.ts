import { Component, OnInit } from '@angular/core';
import { AssistantService } from '../assistant.service';
import { RealEstateService } from '../real-estate.service';
import { UserService } from '../user.service';
import { User } from '../models/user';
@Component({
  selector: 'app-remove-favorites',
  templateUrl: './remove-favorites.component.html',
  styleUrls: ['./remove-favorites.component.css'],
})
export class RemoveFavoritesComponent implements OnInit {
  constructor(
    private assistantService: AssistantService,
    private realEstateService: RealEstateService,
    private userService: UserService
  ) {}
  favorites: number[] = [];
  user: User;
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.favorites = this.user.favorites;
  }

  remove(id: number) {
    var newFavorites:number[]=this.user.favorites;
    newFavorites = newFavorites.filter(obj => obj !== id);
    this.user.favorites=newFavorites;
    sessionStorage.removeItem("user");
    sessionStorage.setItem("user",JSON.stringify(this.user));
    this.ngOnInit();
  }
}
