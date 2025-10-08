import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterOutlet],
  templateUrl: './passwordreset.component.html',
  styleUrl: './passwordreset.component.css'
})
export class PasswordresetComponent {

  http=inject(HttpClient);
  router=inject(Router);

  loginObj: PasswordResetEmailCapture;
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';

  
  
    constructor() {
      this.loginObj = new PasswordResetEmailCapture();
    }

    onLoginClick()
    {
      console.log('This is the loginObject: ',this.loginObj);
      this.http.post(`${this.baseUrl}/checkuserwithemail`,this.loginObj).subscribe((res:any)=>
      {
        console.log('Printing the res: ',res);
        if(res)
        {
          console.log('User email to change the password: ',res.email);
          localStorage.setItem('otpMail',this.loginObj.email);
          console.log('user email printing: ',this.loginObj.email);

          this.http.get(`${this.baseUrl}/api/sendOTP/send/${this.loginObj.email}`).subscribe((otpRes:any)=>
           {
            console.log('OTP send or Not: ',otpRes);
            alert('OTP sent to your email')
            this.router.navigate(['/otpvalidation'])

          })
          
          
        }
        else{
          alert('User Not Found');
          return;
        }
      })
    }

}
export class PasswordResetEmailCapture
{
  email: string='';
}
