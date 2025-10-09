import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterEvent, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbarcomponent',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './navbarcomponent.component.html',
  styleUrl: './navbarcomponent.component.css'
})
export class NavbarcomponentComponent {
  http=inject(HttpClient);
  router=inject(Router);
  name : string ='';
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  ngOnInit()
{
  const email=localStorage.getItem("email");
  if(!email)
  {
    alert("User not Login")
    this.router.navigate(['/login']);
    return;
  }
  
  this.http.get<any>(`${this.baseUrl}/api/users/${email}`).subscribe({
    next: (data)=>
    {
      console.log(data.fname);
      this.name=data.fname;
    }
  });
}
  logOut()
  { 
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  menuOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

closeMenu() {
  this.menuOpen = false;
}


}
