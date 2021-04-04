import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent { 
    loginForm: FormGroup;


    constructor(
        private http: HttpClient,
        private userService: UserService,
        private router: Router,
        private _snackBar: MatSnackBar){
      }
    
      openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
        });
      }
    
      ngOnInit(): void {
        this.loginForm = new FormGroup({
          'email': new FormControl(null, Validators.required),
          'password': new FormControl(null, Validators.required),
        });
      }
    

    login() {
        console.log('login');
    }

    redirectToSignUp() {
      this.router.navigate(['/register']);

    }
}

