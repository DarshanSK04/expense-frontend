import { HttpClient } from '@angular/common/http';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-otpvalidation',
  standalone: true,
  imports: [FormsModule,RouterOutlet,RouterModule],
  templateUrl: './otpvalidation.component.html',
  styleUrl: './otpvalidation.component.css'
})
export class OtpvalidationComponent {

http=inject(HttpClient);
router=inject(Router);

otpObj: OTPVerification;
private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


constructor()
{
  this.otpObj=new OTPVerification();

}
onLoginClick()
{
  this.http.get(`${this.baseUrl}/api/sendOTP/verify/${this.otpObj.otp}`).subscribe((res:any)=>
    {
    
      if(res)
      {
        alert('OTP Sucess');
        this.router.navigate(['/updatepassword']);
      }
      else{
        alert('Enter the correct OTP');
      }

    });
}
}


export class OTPVerification{
  otp: number=0;

}
