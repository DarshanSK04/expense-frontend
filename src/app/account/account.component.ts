import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-account',
  imports: [
    
    FormsModule,        
    
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],

})
export class AccountComponent implements OnInit {
  user: any = {};
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';
  baseUrl = 'https://registerapp-1-2fcd.onrender.com'; // apna backend URL yaha

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const email = localStorage.getItem('email');
    if (email) {
      this.http.get(`${this.baseUrl}/api/user/${email}`).subscribe((res: any) => {
        this.user = res;
      });
    }
  }

  changePassword() {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    this.http.post(`${this.baseUrl}/changePassword`,{
      email: this.user.email,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    } )
  .subscribe({
    next: (res: any) => {
      if (res && res.message === 'Password updated successfully ✅') {
        alert('Password changed successfully!');
      } else if (res && res.message === 'Old password incorrect ❌') {
        alert('Old password is incorrect ❌');
      } else {
        alert('Unexpected response. Please try again.');
      }
    },
    error: (err) => {
      console.error(err);
      alert('Server error. Please try again later!');
    }
  });
  } 
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  confirmDelete() {
    const pass = prompt("Enter your password to confirm deletion:");
    if (pass) {
      if (confirm("⚠️ Are you sure you want to delete your account? This cannot be undone!")) {
        this.http.post(`${this.baseUrl}/api/user/delete`, {
          email: this.user.email,
          password: pass
        }).subscribe({
          next: () => {
            alert("Account deleted successfully!");
            localStorage.clear();
            this.router.navigate(['/login']);
          },
          error: () => alert("Password incorrect or server error ❌")
        });
      }
    }
  }
}

