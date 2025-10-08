import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarcomponentComponent } from '../navbarcomponent/navbarcomponent.component';

@Component({
  selector: 'app-viewofflineexpense',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule,NavbarcomponentComponent],
  templateUrl: './viewofflineexpense.component.html',
  styleUrl: './viewofflineexpense.component.css'
})
export class ViewofflineexpenseComponent {

  router=inject(Router);
  http=inject(HttpClient);
  totalAmount: number=0;
  expenses: any[] =[];
  private baseUrl = 'https://registerapp-1-2fcd.onrender.com';


  ngOnInit()
  {
    const email=localStorage.getItem('email');
    const id=localStorage.getItem('userId');
    if(!email)
    {
      alert("User not logged-in");
      this.router.navigate(['/login']);
      return;
    }
    this.http.get<any[]>(`${this.baseUrl}/api/expenses/offlineExpenses/${id}`, {})
      .subscribe((data) => {
        this.expenses = data;

        
        this.totalAmount = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
      });
  }

  deleteExpense(id: number) {
    this.http.delete(`${this.baseUrl}/api/expenses/deleteExpense
      /${id}`)
      .subscribe(() => {
        
        this.expenses = this.expenses.filter(exp => exp.id !== id);

        
        this.totalAmount = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);

        alert("Deleted Successfully!");
        
      });

  }
  editExpense(id:number)
  {
    localStorage.setItem('id',id.toString());
    this.router.navigate(['/editexpense']);
  }


}
