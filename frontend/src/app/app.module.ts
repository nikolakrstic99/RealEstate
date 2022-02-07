import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './alert/alert.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { AdComponent } from './ad/ad.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdvertiserComponent } from './advertiser/advertiser.component';
import { NewRequestsComponent } from './new-requests/new-requests.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddAgencyComponent } from './add-agency/add-agency.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { AdvertiserEditComponent } from './advertiser-edit/advertiser-edit.component';
import { EstateEditComponent } from './estate-edit/estate-edit.component';
import { DatePipe } from '@angular/common'
import { FooterComponent } from './footer/footer.component';
import { PropertyComponent } from './property/property.component';
import { PropertyMinimizedComponent } from './property-minimized/property-minimized.component';
import { CustomerSearchResultComponent } from './customer-search-result/customer-search-result.component';
import { RemoveFavoritesComponent } from './remove-favorites/remove-favorites.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PropertySearchResultComponent } from './property-search-result/property-search-result.component';
import { UploadJsonComponent } from './upload-json/upload-json.component';
import { GraphicsComponent } from './graphics/graphics.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'search', component: CustomerSearchComponent },
  { path: 'newPassword', component: NewPasswordComponent },
  { path: 'newRequests', component: NewRequestsComponent },
  { path: 'allUsers', component: AllUsersComponent },
  { path: 'userEdit', component: UserEditComponent },
  { path: 'user', component: UserComponent },           //1
  { path: 'admin', component: AdminComponent },         //3
  { path: 'advertiser', component: AdvertiserComponent },//2
  { path: 'addAgency', component: AddAgencyComponent },
  { path: 'addLocation', component: AddLocationComponent },
  { path: 'addRealEstate', component: AddRealEstateComponent },
  { path: 'advertiserEdit', component: AdvertiserEditComponent },
  { path: 'estateEdit', component: EstateEditComponent },
  { path: 'propertyMinimized', component: PropertyMinimizedComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'customerSearchResult', component:CustomerSearchResultComponent},
  { path: 'removeFavorites', component:RemoveFavoritesComponent},
  { path: 'advancedSearch', component:AdvancedSearchComponent},
  { path: 'importJson', component:UploadJsonComponent},
  { path: 'uploadImages', component:UploadImagesComponent},
  { path: 'stats', component:GraphicsComponent},
  { path: '**', redirectTo:'/'}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    AlertComponent,
    FileUploadComponent,
    NewPasswordComponent,
    CustomerSearchComponent,
    AdComponent,
    UserComponent,
    AdminComponent,
    AdvertiserComponent,
    NewRequestsComponent,
    AllUsersComponent,
    UserEditComponent,
    AddAgencyComponent,
    AddLocationComponent,
    AddRealEstateComponent,
    AdvertiserEditComponent,
    EstateEditComponent,
    FooterComponent,
    PropertyComponent,
    PropertyMinimizedComponent,
    CustomerSearchResultComponent,
    RemoveFavoritesComponent,
    AdvancedSearchComponent,
    PropertySearchResultComponent,
    UploadJsonComponent,
    GraphicsComponent,
    UploadImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    RecaptchaModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
