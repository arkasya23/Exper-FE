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
import { GroupComponent } from './components/dashboard/group/group.component';
import { DialogAddGroupExpense } from './dialogs/add-group-expense/add-group-expense.component';
import { PersonalExpensesComponent } from './components/dashboard/personal-expenses/personal-expenses.component';
import { DialogAddPersonalComponent } from './dialogs/add-personal-expense/add-personal-expense.component';
import { DialogRemoveComponent } from './dialogs/remove/remove.component';
import { DialogUpdatePersonalExpenseComponent } from './dialogs/update-personal-expense/update-personal-expense.component';
import { DialogUpdateGroupExpenseComponent } from './dialogs/update-group-expense/update-group-expense.component';

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
    DialogAddMembers,
    MembersComponent,
    GroupComponent,
    DialogAddGroupExpense,
    PersonalExpensesComponent,
    DialogAddPersonalComponent,
    DialogRemoveComponent,
    DialogUpdatePersonalExpenseComponent,
    DialogUpdateGroupExpenseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    FormsModule,
  ],
  providers: [UserService, TripService, NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
