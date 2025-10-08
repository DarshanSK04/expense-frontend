import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';


@Component({
  selector: 'app-addexpense',
  standalone: true,
  imports: [FormsModule, RouterModule, RouterOutlet,CommonModule,NavbarcomponentComponent],
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddExpenseComponent {
  expenseObj: Expense = new Expense();
  http = inject(HttpClient);
  router = inject(Router);

  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  
    

  onSubmit() {

    if (
      !this.expenseObj.description ||
      !this.expenseObj.category ||
      !this.expenseObj.paymentMethod ||
      !this.expenseObj.transactionDate ||
      this.expenseObj.amount <= 0
    ) {
      // Sirf red line hi nahi — backend call bhi roko
      return;
    }
    const email = localStorage.getItem('email');  // Assuming login me email store kiya tha
    if (!email) {
      alert("User not logged in!");
      return;
    }

    console.log("Sending Expense:", this.expenseObj);

    this.http.post(`${this.baseUrl}/api/expenses/${email}/add`, this.expenseObj)
      .subscribe({
        next: (res: any) => {
          alert("Expense added successfully!");
          this.router.navigate(['/dash-board']);  
        },
        error: (err) => {
          console.error("Error adding expense:", err);
          alert(err.error?.message || "Failed to add expense.");
        }
      });
  }

 
}

export class Expense {
  description: string = '';
  category: string = '';
  
  amount: number = 0;
  paymentMethod: string = '';  
  transactionDate: string = '';  
}