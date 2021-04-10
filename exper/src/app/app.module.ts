import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSharedModule } from './shared/material-shared.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './shared/services/user.service';
import { TripComponent } from './components/dashboard/trip/trip.component';
import { TripService } from './shared/services/trip.service';
import { AddTripComponent } from './dialogs/add-trip/add-trip.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TripComponent,
    AddTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialSharedModule
  ],
  providers: [UserService, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
