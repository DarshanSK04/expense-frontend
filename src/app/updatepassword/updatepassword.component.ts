import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-updatepassword',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterOutlet,CommonModule],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {

  http=inject(HttpClient);
  router=inject(Router);
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  updateObj: UpdatingPassword;
  constructor()

  {
    this.updateObj=new UpdatingPassword();

  }

  email=localStorage.getItem('otpMail');

  onLoginClick()
  {
    if(this.updateObj.password !== this.updateObj.confirmpassword)
      {
        alert("Password and Confirm Password Not Matching");
        return;
      }
      console.log(this.updateObj);
      this.http.put(`${this.baseUrl}/updateuserpassword/${this.email}`,this.updateObj).subscribe((res:any)=>
      {
        if(res)
        {
          alert('Password Updated Successfully');
          this.router.navigate(['/login']);
        }

        
      })
    

  }


}

export class UpdatingPassword{

  password: string="";
  confirmpassword:string="";
}
