import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {jwtDecode} from "jwt-decode";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Button,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    CardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup;

  constructor(private fb : FormBuilder,
              private http : HttpClient,
              private authService : AuthService,
              private router : Router
  ) {
  }
  ngOnInit() {
    this.loginForm=this.fb.group({
      email : this.fb.control(""),
      password : this.fb.control(""),
    });
  }

  handleLogin() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next : (resp:any) => {
          this.authService.token=resp.body['access-token'];
          let decodejwt: any =jwtDecode(this.authService.token);
          console.log("token : "+ this.authService.token);
          console.log("decodejwt sub : "+ decodejwt.sub);
          console.log("decodejwt scope : "+ decodejwt.scope);
          this.authService.isAuthenticated=true;
          this.authService.profile=decodejwt;
          let hasRole = this.authService.hasRole("ADMIN");

          console.log("hasRole : "+ hasRole);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      })
  }
}

