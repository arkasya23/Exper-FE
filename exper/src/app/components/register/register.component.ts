
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/shared/services/user.service";
import { RegisterModel } from "src/app/shared/models/register.model";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar){
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, Validators.email),
      'password': new FormControl(null,[Validators.required, this.invalidPassword]),
      'confirmPassword': new FormControl(null, Validators.required),

    }, { validators: this.checkPasswords });
  }

  register() {
    const registerPayload = new RegisterModel(this.signupForm.value.email, this.signupForm.value.password);
    this.userService.register(registerPayload).subscribe(token => {
      this.userService.updateToken(token);
      this.router.navigate(['/dashboard']);
    },
    err => {
      console.log(err);
      this.openSnackBar('The account could not be created', '');
    });
  }

  invalidPassword(control: FormControl): {[s: string]: boolean} {
    const validPasswordExpr = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    const valid = validPasswordExpr.test(control.value);
  
    if(valid === false) {
      return {'invalidPassword': true}
    }

    return null;
  }

  checkPasswords(group: FormGroup) { 
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }     
  }
}