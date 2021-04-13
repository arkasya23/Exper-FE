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
import { DialogAddTrip } from './dialogs/add-trip/add-trip.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MembersComponent } from './components/dashboard/members/members.component';
import { DialogAddMembers } from './dialogs/add-members/add-members.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    TripComponent,
    DialogAddTrip,
    HeaderComponent,
    MembersComponent,
    DialogAddMembers
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    FormsModule
  ],
  providers: [UserService, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
