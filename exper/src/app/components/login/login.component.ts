import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LoginModel } from "src/app/shared/models/login.model";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent { 
    loginForm: FormGroup;
    showPassword: boolean = false;


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
          'email': new FormControl(null, Validators.email),
          'password': new FormControl(null, Validators.required),
        });
      }
    

    login() {
        console.log('login');

        const loginPayload = new LoginModel(this.loginForm.value.email, this.loginForm.value.password);
        this.userService.login(loginPayload).subscribe(token => {
          this.userService.updateToken(token);
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.log(err);
          this.openSnackBar('Invalid email or password', '');
        });

    }

    redirectToSignUp() {
      this.router.navigate(['/register']);

    }

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
}

