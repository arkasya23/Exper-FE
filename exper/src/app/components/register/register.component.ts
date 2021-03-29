
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiProdService } from "src/app/shared/services/api.prod.service";
import { RegisterModel } from "src/app/shared/models/register.model";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private http: HttpClient, private apiService: ApiProdService){

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
    this.apiService.register(registerPayload).subscribe(token => {
      this.apiService.updateToken(token);
    },
    err => {
      console.log(err);
    });
  }

  invalidPassword(control: FormControl): {[s: string]: boolean} {
    const validPasswordExpr = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
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