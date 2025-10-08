import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';

@Component({
  selector: 'app-viewexpense',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule,NavbarcomponentComponent],
  templateUrl: './viewexpense.component.html',
  styleUrls: ['./viewexpense.component.css']
})
export class ViewExpenseComponent implements OnInit {
  expenses: any[] = [];
  totalAmount: number = 0;
  name :string="";
  http = inject(HttpClient);
  router = inject(Router);
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      alert("User not logged in!");
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any[]>(`${this.baseUrl}/api/expenses/viewExpenses/${email}`, {})
      .subscribe((data) => {
        this.expenses = data;
        
        

        // ✅ Calculate total amount
        this.totalAmount = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      });
      this.http.get<any>(`${this.baseUrl}/api/users/${email}`).subscribe({
        next: (data)=>
        {
          console.log(data.fname);
          this.name=data.fname;
        }
      });
  }

  deleteExpense(id: number) {
    console.log('Expense Id: ',id);
    this.http.delete(`${this.baseUrl}/api/expenses/deleteExpense/${id}`)
      .subscribe(() => {
        // ✅ Remove deleted expense from local array
        this.expenses = this.expenses.filter(exp => exp.id !== id);

        // ✅ Recalculate total
        this.totalAmount = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);

        alert("Deleted Successfully!");

      });
  }
  editExpense(id:number)
  {
    localStorage.setItem('id',id.toString());
    console.log("Expesne ID to Update",id);
    this.router.navigate(['/editexpense']);
  }
  
}
