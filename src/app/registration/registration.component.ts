
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, RouterOutlet,RouterModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerObj: Register;


  constructor() {
    this.registerObj = new Register();
  }

 
  http = inject(HttpClient);
  router = inject(Router);
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  onClick() {
    console.log("BUtton Clicked");
    console.log("sending Data", this.registerObj);

    if(this.registerObj.confirm !== this.registerObj.password)
    {
      alert("Password and Confirm Password Not Matching");
      return;
    }
  
    this.http.post(`${this.baseUrl}/adduser`, this.registerObj)
      .subscribe({
        next: (res: any) => {
          console.log("API Response", res);
          if (res) {
            alert("Registration Success");
            console.log("Navigating to the login page");
            this.router.navigate(['/login']); 
          } else {
            alert("Something went wrong!");
          }
        },
        error: (err) => {
          console.error("API Error:", err);
          const errorMessage = err.error?.message || err.error || "Something went wrong!";
          alert(errorMessage);
        }
      });
  }
}


export class Register {
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  
  confirm: string = '';
  phone: string = '';
}