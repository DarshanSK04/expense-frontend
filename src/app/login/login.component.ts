import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterOutlet,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;


  constructor() {
    this.loginObj = new Login();
  }

 
  http = inject(HttpClient);
  router = inject(Router);
  userId:number=0;
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  onLoginClick() {
    console.log("BUtton Clicked");
    console.log("Fetching Data", this.loginObj);
  
    this.http.post(`${this.baseUrl}/loginUser`, this.loginObj).subscribe({
      next: (res: any) => {
        console.log("API Response", res);
        if (res) {
          alert("Login Success ✅");
          localStorage.setItem('email', this.loginObj.email);
          localStorage.setItem('userId', res.id);
          this.router.navigate(['/dash-board']);
        }
      },
      error: (err) => {
        console.error("Login failed:", err);
  
        if (err.status === 401) {
          alert("❌ Invalid email or password!");
        } else {
          alert("🚨 Server error! Please try again later.");
        }
      }
    });
  }
  
}


export class Login {
 
  email: string = '';
  password: string = '';
  
}
